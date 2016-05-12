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
  Alert,
  TextInput } from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon } from 'native-base';
import { Card } from 'react-native-material-design';
import ListComment from './ListComment';
import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;


// TODO: componentWillReceiveProps for item score

class YakView extends Component {
  constructor(props){
    super(props);
    // sets our components state listener
    // firebase ref
    // console.log(this.props.item._key);
    this.state = {
      dataSource: new ListView.DataSource({
        // bizzare ass expression for handling rows
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      scoreChange: this.props.item.score
    };
    var childKey = this.props.item._key.toString();
    console.log('CHILDKEY', childKey);
    this.commentRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      // if score is changed update the state
      scoreChange: nextProps.item.score > this.props.item.score ||
      nextProps.item.score < this.props.item.score
    });
  }
  listenForComments(commentRef){
    console.log('REFS', commentRef);

    // TODO: temporary please fix
    // var refs = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey);
    commentRef.on('value', (snap) => {
      var comments = [];
      snap.forEach((child) => {
        comments.push({
          comment: child.val().comment,
          id: child.val().id,
          time: child.val().time
        });
      });
      // update component state with comments
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(comments)
      });
    });
  }
  listenForScore(){

    // using event listener

  }
  componentDidMount(){
    this.listenForComments(this.commentRef);
    // need to add an event listener for score update
    this.listenForScore(this.props.item.score);
  }
  // pushes data to firebase based on our current key
  submitComment(object){
    this.commentRef.push({
      comment: object.comment,
      id: object.id,
      time: object.time,
    });
  }
  _returnToYaks(){
    console.log('fart');
    this.props.navigator.resetTo({
      ident: 'MainLayout'
    });
  }
  // function to generate random UID for comments, we can use this to later gen icons?
  generateUid(){
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  _addComment(){
    // callback function
    var onComplete = function(error){
      if (error){
        console.log('failed', error);
      } else {
        console.log('synchro success');
      }
    };

    // console.log(this.props.item);
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
            // console.log(this.generateUid());
            // this.props.item.push({ comment: text, time: Date() }, onComplete);
          },
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      'plain-text'
    );
  }
  // function handles voting
  votePost(param){
    // get score
    var childKey = this.props.item._key.toString();
    console.log('CHILDKEY', childKey);
    var scoreRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey + '/score');
    // transaction to increment by one
    if (param === 1){
      scoreRef.transaction(function(score){
        console.log(score);
        return score + 1;
      });
    }
    else if (param === 2){
      scoreRef.transaction(function(score){
        console.log(score);
        return score - 1;
      });
    } else {
      console.log('THIS SHOULD NOT BE REACHED');
    }
  }
  // function to delete current post
  deletePost(){
    // TODO: user perms need to be added for this function
    // callback function
    var onComplete = function(error){
      if (error){
        console.log('ERROR REMOVING POST', error);
        // ios alert please
      } else {
        console.log('POST REMOVED');
        // route back
        // this._returnToYaks(); WHAT THE HELL MAN?
      }
    };
    var deletePostObject = {
      alertTitle: 'Hey!',
      alertMessage: 'Post Removed'
    };
    // remove firebase reference
    // TODO: this is really dirty and should be fixed
    this.commentRef.remove(onComplete);
    this.callAlert(deletePostObject);
    this._returnToYaks();

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
  render(){
    // console.log(item);
    // console.log(this.props.item);
    console.log('COMPONENT STATE',this.state);
    console.log('NEXT PROPS', this.state.nextProps);
    return(
      <Container>
          <Header>
            <Button transparent onPress={this._returnToYaks.bind(this)}>
                <Icon name="ios-arrow-left" />
            </Button>
              <Title>bison.</Title>
            <Button transparent onPress={this.deletePost.bind(this)}>
                <Icon name="ios-trash"/>
            </Button>
          </Header>

          <Content>

            <View style={styles.container}>
              <Card>
                <Card.Body>

                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.time}</Text>

                <Text>{this.state.scoreChange}pts</Text>
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
                  dataSource={this.state.dataSource}
                  renderRow={this._renderComment.bind(this)}
                  style={styles.listview}/>
              </View>

                <Button info block  onPress={this._addComment.bind(this)}>
                    Add Comment
                </Button>

            </View>
         </Content>
      </Container>
    );
  }
}


module.exports = YakView;
