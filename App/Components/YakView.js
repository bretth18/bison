import {
  View,
  Text,
  ListView,
  AlertIOS,
  Alert,
  AsyncStorage } from 'react-native';
import React, { Component } from 'react';

import { Container, Header, Content, Title, Button, Icon } from 'native-base';
import { Card } from 'react-native-material-design';
import { Actions } from 'react-native-router-flux';
import ListComment from './ListComment';
import ActionButton from './ActionButton';
import NativeTheme from '../Themes/myTheme';

import database from '../Database/Database';

const styles = require('../Styles/Styles.js');

class YakView extends Component {
  constructor(props) {
    super(props);
    console.log('yakview props', this.props);
    // sets our components state listener


    var childKey = this.props._key.toString();
    console.log('CHILDKEY', childKey);


    this.commentRef = database.ref('yaks/' + childKey);
  }
  componentWillMount() {

    this.dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    // looks for comments
    this.commentRef.on('value', (snap) => {
      snap.forEach((child) => {
        let yakComment = {
          comment: child.val().comment,
          id: child.val().id,
          time: child.val().time
        };
        this.props.addComment(yakComment);
      });
    });

    // get our account shit from async
    // AsyncStorage.getItem('userObject').then((userObject) => {
    //   let oldUserObject = JSON.parse(userObject);
    //   this.props.user = oldUserObject.uid;
    //   this.setState({
    //     user: oldUserObject,
    //     loaded: true
    //   });
    //
    //   if (this.props.item.user.uid === this.state.user.uid) {
    //     this.setState({
    //       renderDelete: true,
    //     });
    //   }
    // });
  }

  componentDidMount() {
    // this.listenForComments(this.commentRef);
  }

  listenForDelete() {
    const itemUserUID = this.props.user.uid;
    if (itemUserUID === this.state.user.uid) {
      this.setState({
        renderDelete: true,
      });
    } else {
      console.log('shits fucked with delete fam');
    }
  }

  listenForComments(commentRef){
    // push comment children
    // commentRef.on('value', (snap) => {
    //   var comments = [];
    //   snap.forEach((child) => {
    //     comments.push({
    //       comment: child.val().comment,
    //       id: child.val().id,
    //       time: child.val().time
    //     });
    //   });
    //   // update component state with comments
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(comments)
    //   });
    // });
  }
  // pushes data to firebase based on our current key

  submitComment(object) {
    console.log('USER:', this.state.user.uid);
    var onComplete = function(error) {
      if (error) {
        Alert.alert('Oh Snap! Failed to submit comment');
      } else {
          // shit worked bro
        console.log('comment submitted fam');
      }
    };

    this.commentRef.push({
      comment: object.comment,
      id: object.id,
      time: object.time,
      user: this.state.user.uid
    }, onComplete());
  }

  _returnToYaks() {
    Actions.YakContainer();
  }
  // function to generate random UID for comments, we can use this to later gen icons?
  generateUid() {
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  _addComment() {
    var item = this.props.item;
    console.log('item', item);
    // temporary way to add comment
    AlertIOS.prompt(
      'add comment',
      null,
      [
        {text: 'Add',
          onPress: (text) => {
            // create an object to pass
            var commentObject = {
              comment: text,
              id: this.generateUid(),
              time: Date(),
            };
            // send comment to firebase
            this.submitComment(commentObject);
          },
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      'plain-text'
    );
  }
  // function handles voting
  votePost(param){
    // object for async
    var userHasVoted = {
      voted: true,
    };
    // get score
    var childKey = this.props._key.toString();
    console.log('CHILDKEY', childKey);
    var scoreRef = database.ref('yaks/' + childKey +'/score');

    switch (param) {
      case 1:
        scoreRef.transaction(function(score, error){
          if (error){
            Alert.alert('Uh Oh! Failed to vote');
          } else {
            console.log(score);
            return score + 1;
          }
        });
        // set ui to reflect score changes
        this.setState({
          score: this.state.score + 1
        });
        // set bool
        userHasVoted = true;
        break;

     case 2:
       scoreRef.transaction(function(score, error){
         if (error){
           Alert.alert('Uh Oh! Failed to vote');
         } else {
           console.log(score);
           return score - 1;
         }
       });
       // set ui to reflect score change
       this.setState({
         score: this.state.score - 1
       });
       userHasVoted = true;
       break;
     default:
      console.log('error, failed to vote post', param);
      Alert.alert('Failed to submit vote');
    }
  }
  // function to delete current post
  deletePost() {

    var deletePostObject = {
      alertTitle: 'Hey!',
      alertMessage: 'Post Removed'
    };
    // check post author
    if (this.props.item.user.uid === this.state.user.uid){
      //remove post
      this.commentRef.remove((error) => {
        if(error){
          console.log('ERROR REMOVING POST', error);
          Alert.alert('oops, something went wrong while removing your post');
        } else {
          // alert user, return to previous screen
          console.log('POST REMOVED');
          this.callAlert(deletePostObject);
          this._returnToYaks();
        }
      });
    } else {
      console.log('failed to remove post-unauth');
      // TODO:need a better way of handling... Delete button should only show if user matches
      Alert.alert('UNAUTHORIZED!');
    }
  }
  callAlert(object){
    Alert.alert(
      object.alertTitle,
      object.alertMessage,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ]
    );
  }
  // function renders ListComment component in our ListView
  _renderComment(comment){
    return(
      <ListComment comment={comment} />
    );
  }

  _renderDelete(){
    if (this.state.renderDelete) {
      return(
        <Button transparent onPress={this.deletePost.bind(this)}>
            <Icon name="ios-trash"/>
        </Button>
      );
    } else {
      return null;
    }
  }

  render(){
    let comments = this.props.yakCommentList;
    console.log('comment list', comments);
    return(
      <View style={styles.container}>
          <Header theme={NativeTheme}>
            <Button transparent onPress={this._returnToYaks.bind(this)}>
                <Icon name="ios-arrow-back" />
            </Button>
              <Title>bison.</Title>
          </Header>

            <View style={styles.container}>
              <Card>
                <Card.Body>

                <Text>{this.props.title}</Text>

                <Text>{this.props.time}</Text>
                <Text>{this.props.score}pts</Text>
                  <Button
                    transparent style={{justifyContent: 'flex-end'}}
                    onPress={this.votePost.bind(this, 1)}>
                      <Icon name="ios-arrow-up" style={{color: 'black'}}/>
                  </Button>
                  <Button
                    transparent style={{justifyContent: 'flex-end'}}
                    onPress={this.votePost.bind(this, 2)}>
                      <Icon name="ios-arrow-down" style={{color: 'black'}}/>
                  </Button>

                </Card.Body>

            </Card>

              <View style={styles.container}>
                <ListView
                  dataSource={this.dataSource.cloneWithRows(comments)}
                  renderRow={this._renderComment.bind(this)}
                  style={styles.listview}
                  initialListSize={0}
                  />
              </View>

              <ActionButton title="Add Comment" onPress={this._addComment.bind(this)}
                style={{backgroundColor: '#18cfff'}}/>

            </View>
      </View>
    );
  }
}


module.exports = YakView;
