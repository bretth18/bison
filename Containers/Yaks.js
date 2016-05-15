import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
  ListView,
  AlertIOS,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert} from 'react-native';
import Modal from 'react-native-simple-modal';
import { Button } from 'native-base';
import StatusBar from '../Components/StatusBar';
import ActionButton from '../Components/ActionButton';
import ListItem from '../Components/ListItem';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;


import Firebase from 'firebase';

class Yaks extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      modalOpen: false,
    };
    this.itemsRef = new Firebase('https://bisonyak.firebaseio.com/items');
    // testing auth case
    this.itemsRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        // store authData on device
        AsyncStorage.setItem('authData', JSON.stringify(authData));
        // test
        this.authData = authData;
      }
    });
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get our children as an array
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
  }
  onPressYak(item){
    this.props.navigator.push({
      ident: 'YakView',
      item: item
    });
  }
  // this submits our yak
  _addItem(text){
    var currentTime = new Date();
    console.log(currentTime);
    console.log('TESTING AUTHDATA: ', this.authData);

    // validation
    // TODO: Toast user somehow
    var withoutSpace = text.replace(/ /g,'');
    var textLength = withoutSpace.length;
    if (textLength > 140){
      console.log('too long', textLength);
      this.tooLongAlert();
    }
    else if (text === undefined){
      console.log('no text provided');
      // alert user
    }else {
      this.itemsRef.push({ title: text, time: Date(), score: 0,});
  }
  // this kills the modal
  this.setState({
    modalOpen: false
  });
}

  tooLongAlert(){
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }
  _renderItem(item){
    return(
      <ListItem item={item} onPress={this.onPressYak.bind(this, item)} />
    );
  }
  render(){
    //this._addItem.bind(this)
    return (
      <View style={styles.container} >
        <TextInput/>
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
