// import {
//   Linking,
//   Platform,
//   ActionSheetIOS,
//   Dimensions,
//   View,
//   Text,
//   Navigator,
//   ListView,
//   AlertIOS,
//   TextInput,
// } from 'react-native';
//
// import React, { Component } from 'react';
//
// import ComposeYak from '../Components/ComposeYak';
// const StatusBar = require('../Components/StatusBar');
// const ActionButton = require('../Components/ActionButton');
// const ListItem = require('../Components/ListItem');
// const styles = require('../Styles/Styles.js');
// const constants = styles.constants;
//
//
// import Firebase from 'firebase';
//
// // CLASS REQUIRED DUE TO Submit Funtion Difference!
// class YaksAndroid extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       dataSource: new ListView.DataSource({
//         rowHasChanged: (row1, row2) => row1 !== row2,
//       })
//     };
//     this.itemsRef = new Firebase("https://bisonyak.firebaseio.com/items");
//   }
//   listenForItems(itemsRef) {
//     itemsRef.on('value', (snap) => {
//       // get our children as an array
//       var items = [];
//       snap.forEach((child) => {
//         items.push({
//           title: child.val().title,
//           time: child.val().time,
//           _key: child.key()
//       });
//     });
//
//     this.setState({
//       dataSource: this.state.dataSource.cloneWithRows(items)
//     });
//   });
//   }
//   componentDidMount(){
//     this.listenForItems(this.itemsRef);
//   }
//   // temporary
//   // _addItem() {
//   //   var currentTime = new Date();
//   //   console.log(currentTime);
//   //   AlertIOS.alert(
//   //     'Add new bisonyak',
//   //     null,
//   //     [
//   //       {
//   //         text: 'Add',
//   //         time: currentTime,
//   //         onPress: (text, currentTime) => {
//   //           this.itemsRef.push({ title: text, time: Date() });
//   //         }
//   //       },
//   //     ],
//   //     'plain-text'
//   //   );
//   // }
//
//   _addItem(){
//     Alert.alert(
//       'submit new bisonyak',
//       null,
//       [
//         {text: 'Add',
//          time: currentTime,
//           onPress: (text, currentTime) => {
//             this.itemsRef.push({ title: text, time: Date() });
//           },
//         },
//       ]
//     );
//   }
//   _renderItem(item){
//     return(
//       <ListItem item={item} onPress={() => {}} />
//     );
//   }
//   render(){
//     return (
//       <View style={styles.container} >
//         <TextInput/>
//         <StatusBar title="Yaks" />
//
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={this._renderItem.bind(this)}
//           style={styles.listview}/>
//         <ActionButton title="Submit Yak" onPress={this._addItem.bind(this)} />
//       </View>
//     );
//   }
// }
//
//
//
//
// module.exports = YaksAndroid;
