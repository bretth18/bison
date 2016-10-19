import  {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  ListView,
  AlertIOS,
  TextInput,
  TouchableOpacity,
  Alert} from 'react-native';

import React, { Component } from 'react';


import { Button } from 'native-base';
import Modal from 'react-native-simple-modal';
import Firebase from 'firebase';

// TODO: Finish component
class TextModal extends Component {
  constructor(props){
    super(props);

    // firebase ref
    this.itemsRef = new Firebase('data');
  }
  submitText(text){
    console.log('SUBMITTED', text);

    let withoutSpace = text.replace(/ /g, '');
    let textLength = withoutSpace.length;
    // validate text
    if (textLength > 140){
      console.log('text too long', textLength);
      this.tooLongAlert();
    } else {
      this.itemsRef.push({ title: text});
    }
  }
  tooLongAlert(){

  }
  render(){
    return(
      <Modal
        >
      </Modal>
    );
  }


}


module.exports = TextModal;
