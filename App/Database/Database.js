import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB2Me7N3f7xvNoqb_dIr07ZKrpSY1_tsKI',
  authDomain: 'bisonjs-88cf1.firebaseapp.com',
  databaseURL: 'https://bisonjs-88cf1.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '377086728677'
};


firebase.initializeApp(config);

const database = firebase.database();

export default database;
