import * as firebase from 'firebase';
import Config from 'react-native-config';

class FirebaseClass {
  // init our firebase ref

  // call to init
  static initFirebase() {

    const configFirebaseRef = {
      apiKey: 'AIzaSyB2Me7N3f7xvNoqb_dIr07ZKrpSY1_tsKI',
      authDomain: 'bisonjs-88cf1.firebaseapp.com',
      databaseURL: 'https://bisonjs-88cf1.firebaseio.com',
      storageBucket: '',
      messagingSenderId: '377086728677'
    };

    firebase.initializeApp(configFirebaseRef);
    console.log('firebase successfully initialized');
  }

  // triggers a new authorization
  static authFirebase() {

    // create a new user
    firebase.auth().signInAnonymously().catch(function(error) {
      // todo: trigger clientside popup
      console.log(error);
    });


  }

  static getUserUID() {

    return firebase.User().uid;
  }

}


module.exports = FirebaseClass;
