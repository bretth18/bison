import * as firebase from 'firebase';
import Config from 'react-native-config';

class FirebaseClass {
  // init our firebase ref

  // call to init
  static initFirebase() {

    const configFirebaseRef = {
      apiKey: Config.API_KEY,
      authDomain: Config.AUTH_DOMAIN,
      databaseURL: Config.DATABASE_URL,
      storageBucket: '',
      messagingSenderId: '377086728677'
    };

    firebase.initializeApp(configFirebaseRef);
    console.log('firebase successfully initialized');
  }

  // triggers anonymous authorization, returns a firebase.Promise containing a firebase.User
  static authFirebase() {

    return firebase.auth().signInAnonymously().then(result => {
      var localUser = result.user;
      return localUser;
    }).catch(error => {
      console.log(error);
      // probably trigger a client error
    });
  }

  static getUserUID() {

    return firebase.User().uid;
  }

}


module.exports = FirebaseClass;
