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
  // TODO: figure out how to handle both options with a switch case
  voteUpPost(){
    // get score
    var childKey = this.props.item._key.toString();
    console.log('CHILDKEY', childKey);
    var scoreRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey + '/score');
    // transaction to inrement by one
    scoreRef.transaction(function(score){
      console.log(score);
      return score + 1;
    });
  }
  voteDownPost(){
    //get score
    var childKey = this.props.item._key.toString();
    console.log('CHILDKEY', childKey);
    var scoreRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey + '/score');
    // transaction to decrease by one
    scoreRef.transaction(function(score){
      console.log(score);
      return score - 1;
    });
  }
  // function renders ListComment component in our ListView
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
            <Button transparent onPress={this._returnToYaks.bind(this)}>
                <Icon name="ios-arrow-left" />
            </Button>
              <Title>bison.</Title>
            <Button transparent>
                <Icon name="navicon"/>
            </Button>
          </Header>

          <Content>

            <View style={styles.container}>
              <Card cardBody={CardItem}>

                <Button transparent onPress={this.voteUpPost.bind(this)}>
                    <Icon name="ios-arrow-up"/>
                </Button>
                <Button transparent onPress={this.voteDownPost.bind(this)}>
                    <Icon name="ios-arrow-down"/>
                </Button>
                <Text>{this.props.item.title}</Text>

                <Text>{this.props.item.time}</Text>
                <Text>{this.props.item.score}pts</Text>

              </Card>

                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderComment.bind(this)}
                  style={styles.listview}/>

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
