 import {
  View,
  Text,
  ListView,
  TextInput,
  AsyncStorage,
  Alert,
  NetInfo } from 'react-native';

import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-simple-modal';
import { Header, Footer, Title, Icon, Button} from 'native-base';
import GeoFire from 'geofire';

/* component imports */
import StatusBar from '../Components/StatusBar';
import ActionButton from '../Components/ActionButton';
import ListItem from '../Components/ListItem';
import Settings from './Settings';
import YakView from './YakView';

import NativeTheme from '../Themes/myTheme';
import database from '../Database/Database';
import auth from '../Database/Database';


/* constants */
const yaksRef = database.ref('yaks');
const connectedRef = database.ref('.info/connected');
const authRef = auth;
const styles = require('../Styles/Styles.js');


class Yak extends Component {
  constructor(props){
    super(props);
    this.state = {
      yakText: '',
      modalOpen: false,
      newYak: '',
    };
  }

  // before component mounts get our authData from storage
  componentWillMount() {

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    /* NOTE: this method may be more efficient */
    // yaksRef.on('child_added', (snapshot) => {
    //   this.props.addYak(snapshot.val());
    // });

    // yaksRef.on('value', (snap) => {
    //   // get our children as an array
    //     snap.forEach((child) => {
    //       let yakContent = {
    //         title: child.val().title,
    //         time: child.val().time,
    //         comment: child.val().comment,
    //         score: child.val().score,
    //         _key: child.key,
    //         user: this.state.user
    //     };
    //     this.props.addYak(yakContent);
    //   });
    // });

    yaksRef.on('child_removed', (snapshot) => {
      this.props.removeYak(snapshot.val().id);
    });

    if (NetInfo) {
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.props.checkConnection();
        } else {
          console.log('component will mount being hit');
          this.props.goOffline();
          // trigger offline actions
        }
      });
    } else {
      this.props.checkConnection();
    }

    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        this.props.goOnline();
      } else {
        console.log('connectedref componentDidMount being hit');
        this.props.goOffline();
      }
    });
    // AsyncStorage.getItem('userObject').then((userObject) => {
    //   // if data authdata exists then we set state w/user object
    //   if (userObject !== null){
    //     let oldUserObject = JSON.parse(userObject);
    //     this.setState({
    //       user: oldUserObject,
    //       loaded: true
    //     });
    //     // alert auth
    //     console.log('USER?:',this.state.user);
    //
    //   } else {
    //     // create new auth data
    //     console.log('FAILED TO RETRIEVE AUTHDATA');
    //     FirebaseClass.authFirebase();
    //
    //     // check authorization status
    //     /* TODO: can be placed in firebase class, return user object outside
    //     of async call */
    //     firebase.auth().onAuthStateChanged(function(user) {
    //       if (user) {
    //         console.log('user is logged in:', user);
    //
    //         var userObjectString = JSON.stringify(user);
    //         // set state with auth so we can place in local storage
    //         AsyncStorage.setItem('userObject', userObjectString, (error) =>{
    //           if (error){
    //             console.log('failed to set userObject, trace creation', error);
    //           } else {
    //             console.log('set userObject, trace creation');
    //             // set our state with newly created userObject
    //             let userObject = JSON.parse(userObjectString);
    //             this.setState({
    //               user: userObject,
    //               loaded: true
    //             });
    //           }
    //         });
    //       } else {
    //         console.log('user is not logged in, auth error');
    //         Alert.alert('Looks like our servers are having difficulty logging in.');
    //       }
    //     });
    //   }
    // });
    // //test
    // this.listenForlocation();
    // // this.listenForConnection();
  }

  componentDidMount() {
    this.listenForConnection();
    // this.props.onAddYak();
    // this.listenForItems();
    // this.listenForAlert();
    this.listenForDataSource();
  }

  listenForYak() {
    yaksRef.on('child_added', (snapshot) => {
      this.props.addYak(snapshot.val());
    });

    yaksRef.on('child_removed', (snapshot) => {
      this.props.removeYak(snapshot.val().id);
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  // function that tests device connection
  listenForConnection() {
    // if (NetInfo) {
    //   console.log('listening for connection after mount');
    //   NetInfo.isConnected.fetch().done(isConnected => {
    //     if (isConnected) {
    //       console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    //       this.props.checkConnection();
    //     } else {
    //       this.props.goOffline();
    //       // trigger offline actions
    //     }
    //   });
    // } else {
    //   this.props.checkConnection();
    // }

    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        this.props.goOnline();
      } else {
        console.log('this is being hit');
        this.props.goOffline();
      }
    });
  }
  // onMount listener for device location
  listenForlocation() {
    // get device location data
    //   navigator.geolocation.getCurrentPosition((position) => {
    //       var initialPosition = JSON.stringify(position);
    //       // console.log(initialPosition);
    //       // this.setState({
    //       //   position: initialPosition
    //       // });
    //   },
    //   (error) => Alert.alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    //   this.watchID = navigator.geolocation.watchPosition((position) => {
    //     // var lastPosition = JSON.stringify(position);
    //     // this.setState({
    //     //   position: lastPosition
    //     // });
    //   });
  }

  //
  listenForDataSource() {
    yaksRef.on('value', (snap) => {
      var yakDataSource = [];
          snap.forEach((child) => {
            yakDataSource.push({
              title: child.val().title,
              time: child.val().time,
              comment: child.val().comment,
              score: child.val().score,
              _key: child.key,
              user: this.state.user
          });
        });
        this.props.addYak(yakDataSource);
    });
  }

  /* NAVIGATORS */
  goToSettings(){
    // calls scene key
    Actions.Settings();
  }
  onPressYak(item){
    Actions.YakViewContainer(item);
  }


  // method appends current location data to child
  /* TO BE DEPRECIATED:
    data will be stored in location based parents, this
    is now unecessary
    */
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
    // console.log('TESTING AUTHDATA: ', this.state.user);

    // validation
    var withoutSpace = text.replace(/ /g,'');
    var textLength = withoutSpace.length;
    if (textLength > 140){
      console.log('too long', textLength);
      Alert.alert('Too long! Keep it under 140 characters');
      // keep modal open
      // this.setState({
      //   modalOpen: true
      // });
    }
    else if (text === undefined || text === null){
      console.log('no text provided');
      Alert.alert('Oh No! Add some text');
      // alert user
    } else {
      let currentUser = this.state.user;
      //TODO: FIX USER AUTH STUFF
      let yakContent = {
        title: text,
        time: Date(),
        score: 0,
        user: null,
      };

      yaksRef.push(yakContent);

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

  _renderAlert(){
    if (this.state.alert) {
      let alertText = this.state.alertText;
      return(
         <StatusBar title={alertText} />
      );
    } else {
      return null;
    }
  }

  render(){
    let yaks, readonlyMessage;
    if (this.props.connected) {
      yaks = this.props.yakList;
    }
    else if (this.props.connectionChecked){
      console.log('render is being hit');
      yaks = this.props.yakList;
      readonlyMessage = <Text>OFFLINE</Text>;

    } else {
      yaks = this.props.yakList;
      console.log('not connected');
      readonlyMessage = <Text>LOADING..</Text>;
      // notify offline
    }
    return (
      <View style={styles.container} >

        <Header theme={NativeTheme}>
            <Title style={{alignSelf: 'flex-start', paddingLeft: 10}}>bison.</Title>
            <Button transparent style={{alignSelf: 'flex-end', paddingLeft: 2}}
                onPress={this.goToSettings.bind(this)}>
                  <Icon style={{alignSelf: 'flex-end', paddingLeft: 260}} name="ios-settings"/>
            </Button>
        </Header>

        <StatusBar title="Feed" />
        {readonlyMessage}

        <ListView
          dataSource={this.dataSource.cloneWithRows(yaks)}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Submit Post" onPress={() => this.setState({modalOpen: true})} />

          <Modal
             offset={this.props.offset}
             open={this.state.modalOpen}
             modalDidOpen={() => console.log('modal did open')}
             modalDidClose={() => this.setState({modalOpen: false})}
             style={{alignItems: 'center'}}>
             <View style={styles.diverseContainer}>
                <Text style={styles.diverseText}>Submit new Yak</Text>
                  <TextInput
                    style={styles.diverseTextBox}
                    onChangeText={(yakText) => this.setState({yakText})}
                    value={this.state.yakText}
                    maxLength={300}
                  />
                <Button small block style={{marginTop:10}}
                  onPress={this._addItem.bind(this, this.state.yakText)}>
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


module.exports = Yak;
