// DATABASE class


import * as firebase from 'firebase';

class DatabaseClass {

  getRecentAlert(){
    var alertRef = firebase.database().ref('alerts');
    if (alertRef.child != null) {
      return alertRef.child;
    } else {
      return null;
    }
  }

  getAlertRef(){
    var alertRef = firebase.database().ref('alerts');
    return alertRef;
  }




}


module.exports = DatabaseClass;
