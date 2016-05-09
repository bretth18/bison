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
  TextInput } from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, Card, CardItem } from 'native-base';
import ListComment from './ListComment';
import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;


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
      })
    };
    var childKey = this.props.item._key.toString();
    console.log('CHILDKEY', childKey);
    this.commentRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey);
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
  componentDidMount(){
    this.listenForComments(this.commentRef);
  }
  // pushes data to firebase based on our current key
  submitComment(object){
    // var childKey = this.props.item._key.toString();
    // console.log('CHILDKEY', childKey);
    // var refs = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey);
    this.commentRef.push({
      comment: object.comment,
      id: object.id,
      time: object.time,
    });
  }
  _returnToYaks(){
    console.log('fart');
    this.props.navigator.push({
      ident: 'MainLayout'
    });
  }
  // function to generate random UID for comments
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

  _renderComment(comment){
    // list comment needs a prop being passed to it baby, give me a prop
    return(
      <ListComment comment={comment} />
    );
  }
  render(){
    // console.log(item);
    // console.log(this.props.item);

    return(
      <Container>
          <Header>
              <Title>bison.</Title>
          </Header>
          <Content>
            <View style={styles.container}>
                <Text>{this.props.item.title}</Text>
                <Text>{this.props.item.time}</Text>
                <Text>{this.props.item.comment.key}</Text>

                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderComment.bind(this)}
                  style={styles.listview}/>

                <Button info  onPress={this._addComment.bind(this)}>
                    Add Comment
                </Button>

            </View>

         </Content>
      </Container>
    );
  }
}


module.exports = YakView;
