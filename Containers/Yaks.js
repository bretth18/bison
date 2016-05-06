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
} from 'react-native';
import ComposeYak from '../Components/ComposeYak';
const StatusBar = require('../Components/StatusBar');
const ActionButton = require('../Components/ActionButton');
const ListItem = require('../Components/ListItem');
const styles = require('../Styles/Styles.js');
const constants = styles.constants;


import Firebase from 'firebase';

class Yaks extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = new Firebase("https://bisonyak.firebaseio.com/items");
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get our children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          time: child.val().time,
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
  // navigator
  // TODO: fix nav, props are not being passed to child component
  // from our Navigator component in index.ios.js
  onPressYak(){
    // console.log(this.props);
    console.log(this.props.navigator);
    this.props.navigator.push({
      ident: "YakViewLayout"
    });
  }
  _addItem(){
    var currentTime = new Date();
    console.log(currentTime);
    AlertIOS.prompt(
      'submit new bisonyak',
      null,
      [
        {text: 'Add',
         time: currentTime,
          onPress: (text, currentTime) => {
            this.itemsRef.push({ title: text, time: Date() });
          },
        },
      ],
      'plain-text'
    );
  }
  _renderItem(item){
    return(
      <ListItem item={item} onPress={this.onPressYak.bind(this)} />
    );
  }
  render(){
    return (
      <View style={styles.container} >
        <TextInput/>
        <StatusBar title="Yaks" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Submit Yak" onPress={this._addItem.bind(this)} />
      </View>
    );
  }
}


module.exports = Yaks;
