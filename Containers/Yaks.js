import React, {
  View,
  Text,
  Component,
  ListView,
  TextInput,
  AsyncStorage,
  Alert} from 'react-native';
import Modal from 'react-native-simple-modal';
import { Button } from 'native-base';
import GeoFire from 'geofire';

import StatusBar from '../Components/StatusBar';
import ActionButton from '../Components/ActionButton';
import ListItem from '../Components/ListItem';

const styles = require('../Styles/Styles.js');


import Firebase from 'firebase';

class Yaks extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      modalOpen: false,
      // auth data
      loaded: false,
      user: null,
    };
    this.itemsRef = new Firebase('https://bisonyak.firebaseio.com/items');
    // initialize geofire
    this.geoFire = new GeoFire(this.itemsRef);
  }
  // before component mounts get our authData from storage
  componentWillMount() {
    AsyncStorage.getItem('authData').then((authData) => {
      // if data authdata exists then we set state
      if (authData !== null){

        var userData = JSON.parse(authData);
        console.log('USERDATA',userData);
        this.setState({
          user: userData.uid,
          loaded: true
        });
        // alert auth
        console.log('USER?:',this.state.user);
        // Alert.alert('AUTHORIZED');

      } else {
        // create new auth data
        console.log('FAILED TO RETRIEVE AUTHDATA');
        this.itemsRef.authAnonymously(function(error, authData) {
          if (error) {
            console.log('Login Failed!', error);
          } else {
            console.log('Authenticated successfully with payload:', authData);
            // store authData on device
            AsyncStorage.setItem('authData', JSON.stringify(authData), function(error){
              if (error){
                console.log('failed to set authData, trace creation');
              } else {
                console.log('set authData, trace creation');
                // set our state with newly created authData
                var userData = JSON.parse(authData);
                this.setState({
                  user: userData.uid,
                  loaded: true
                });
              }
            });
            // test
            this.authData = authData;
          }
        });
      }
    });
  }
  // onMount listener for device location
  listenForlocation() {
    // get device location data
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        this.setState({initialPosition});
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({position: lastPosition});
    });
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get our children as an array
      // NOTICE: in next firebase update 'child.x()', changes to an object 'child.x'
      var items = [];
          snap.forEach((child) => {
            items.push({
              title: child.val().title,
              time: child.val().time,
              comment: child.val().comment,
              score: child.val().score,
              _key: child.key()
          });
        });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }
  componentDidMount(){
    this.listenForItems(this.itemsRef);
    this.listenForlocation();
    // event listener looking for Async data for authorization
    // this.listenForAuth();
    console.log('LOADED:',this.state.loaded);
  }
  onPressYak(item){
    this.props.navigator.push({
      ident: 'YakView',
      item: item
    });
  }
  // method appends current location data to child
  appendLocation(locationData, childKey){
    // append location to current childKey
    geoFire.set(childKey, locationData).then(function() {
        console.log('location data appended to child');
        Alert.alert('location added');
      }, function(error) {
        console.log('LOCATION_ERROR:', error);
        Alert.alert(error);
      });
  }
  // this submits our yak
  _addItem(text){
    console.log('TESTING AUTHDATA: ', this.state.user);

    // validation
    var withoutSpace = text.replace(/ /g,'');
    var textLength = withoutSpace.length;
    if (textLength > 140){
      console.log('too long', textLength);
      Alert.alert('Too long! Keep it under 140 characters');
      // keep modal open
      this.setState({
        modalOpen: true
      });
    }
    else if (text === undefined || text === null){
      console.log('no text provided');
      Alert.alert('Oh No! Add some text');
      // alert user
    } else {
      // pushes new itemData, gives us a var to play with
      var newKey = this.itemsRef.push({ title: text, time: Date(), score: 0, user: this.state.user});
      console.log('newkey', newKey.key());

      // put this bitch in an array
      // TODO: figure out what's wrong with lat/long 
      console.log('latitude', this.state.position.latitude);
      console.log('longitude', this.state.position.longitude);
      var locationArray = [this.state.position.latitude, this.state.position.longitude];
      // give our new reference location data
      this.geoFire.set(newKey.key(),locationArray).then(() => {
        console.log('newKey has been added to geoFire');
      }, function(error) {
        console.log('problem adding to geoFire', error);
        Alert.alert('problem adding location');
      });
      // this kills mr. modal
      this.setState({
        modalOpen: false
      });
  }
}

  _renderItem(item){
    return(
      <ListItem item={item} onPress={this.onPressYak.bind(this, item)} />
    );
  }
  render(){
    return (
      <View style={styles.container} >
        <StatusBar title="Yaks" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Submit Yak" onPress={() => this.setState({modalOpen: true})} />

          <Modal
             offset={this.state.offset}
             open={this.state.modalOpen}
             modalDidOpen={() => console.log('modal did open')}
             modalDidClose={() => this.setState({modalOpen: false})}
             style={{alignItems: 'center'}}>
             <View style={styles.diverseContainer}>
                <Text style={styles.diverseText}>Submit new Yak</Text>
                  <TextInput
                    style={styles.diverseTextBox}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    maxLength={300}
                  />
                <Button small block style={{marginTop:10}}
                  onPress={this._addItem.bind(this, this.state.text)}>
                  Submit </Button>
             </View>
          </Modal>

      </View>
    );
  }
}


module.exports = Yaks;
