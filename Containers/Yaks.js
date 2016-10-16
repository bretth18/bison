 import {
  View,
  Text,
  ListView,
  TextInput,
  AsyncStorage,
  Alert,
  NetInfo } from 'react-native';

import React, { Component } from 'react';

import Modal from 'react-native-simple-modal';
import {Container, Header, Content, Footer, Title, Icon, Button} from 'native-base';
import GeoFire from 'geofire';

import StatusBar from '../Components/StatusBar';
import ActionButton from '../Components/ActionButton';
import ListItem from '../Components/ListItem';

import FirebaseClass from '../Classes/FirebaseClass';

const styles = require('../Styles/Styles.js');
import NativeTheme from '../Themes/myTheme';


import * as firebase from 'firebase';


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
      position: null,
    };
    // init firebase

    // NOTE: firebaseApp is our new constructor reference
    this.itemsRef = firebase.database().ref('yaks');
    // initialize geofire
    this.geoFire = new GeoFire(this.itemsRef);
  }
  // before component mounts get our authData from storage
  componentWillMount() {
    AsyncStorage.getItem('userObject').then((userObject) => {
      // if data authdata exists then we set state w/user object
      if (userObject !== null){
        let oldUserObject = JSON.parse(userObject);
        this.setState({
          user: oldUserObject,
          loaded: true
        });
        // alert auth
        console.log('USER?:',this.state.user);

      } else {
        // create new auth data
        console.log('FAILED TO RETRIEVE AUTHDATA');
        FirebaseClass.authFirebase();

        // check authorization status
        /* TODO: can be placed in firebase class, return user object outside
        of async call */
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log('user is logged in:', user);

            var userObjectString = JSON.stringify(user);
            // set state with auth so we can place in local storage
            AsyncStorage.setItem('userObject', userObjectString, (error) =>{
              if (error){
                console.log('failed to set userObject, trace creation', error);
              } else {
                console.log('set userObject, trace creation');
                // set our state with newly created userObject
                let userObject = JSON.parse(userObjectString);
                this.setState({
                  user: userObject,
                  loaded: true
                });
              }
            });
          } else {
            console.log('user is not logged in, auth error');
            Alert.alert('Looks like our servers are having difficulty logging in.');
          }
        });
      }
    });
    //test
    this.listenForlocation();
  }

  // function that tests device connection
  listenForConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      // set state based on connection status
      if (isConnected === 'online'){
        this.setState({
          connection: true
        });
      } else {
        this.setState({
          connection: false
        });
      }
    });
  }
  // onMount listener for device location
  listenForlocation() {
    // get device location data
    navigator.geolocation.getCurrentPosition((position) => {
        var initialPosition = JSON.stringify(position);
        // console.log(initialPosition);
        this.setState({
          position: initialPosition
        });
    },
    (error) => Alert.alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({
        position: lastPosition
      });
    });
  }

  //
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get our children as an array
      // NOTE: in next firebase update 'child.x()', changes to an object 'child.x'
      var items = [];
          snap.forEach((child) => {
            items.push({
              title: child.val().title,
              time: child.val().time,
              comment: child.val().comment,
              score: child.val().score,
              _key: child.key,
              user: this.state.user
          });
        });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount(){
    this.listenForItems(this.itemsRef);
  }

  /* NAVIGATORS */
  goToSettings(){
    this.props.navigator.push({
      ident: 'Settings',
    });
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
    this.geoFire.set(childKey, locationData).then(function() {
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
      var currentUser = this.state.user;


      // pushes new itemData, gives us a var to play with
      this.itemsRef.push({ title: text, time: Date(), score: 0, user: currentUser});
      // console.log('newkey', newKey);
      // TODO: figure out how to append geoFire to child instead of overwriting
      var location = JSON.parse(this.state.position);
      console.log('LOCATION', location);

      var locationArray = [location.coords.latitude, location.coords.longitude];
      // give our new reference location data
      // this.appendLocation(locationArray,newKey);
      // this kills mr. modal
      this.setState({
        modalOpen: false
      });
  }
}

  _renderItem(item){
    return(
      <ListItem item={item} userId={this.state.user} onPress={this.onPressYak.bind(this, item)} />
    );
  }
  render(){
    return (
      <View style={styles.container} >

        <Header theme={NativeTheme}>
            <Title style={{alignSelf: 'flex-start', paddingLeft: 10}}>bison.</Title>
            <Button transparent style={{alignSelf: 'flex-end', paddingLeft: 260}}
                onPress={this.goToSettings.bind(this)}>
                  <Icon style={{alignSelf: 'flex-end', paddingLeft: 260}} name="ios-settings"/>
            </Button>
        </Header>

        <StatusBar title="Feed" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Submit Post" onPress={() => this.setState({modalOpen: true})} />

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

          <Footer theme={NativeTheme}>
            <Title>made with <Icon  style={{fontSize: 20}} name="md-heart"/> in SF</Title>
          </Footer>

      </View>
    );
  }
}


module.exports = Yaks;
