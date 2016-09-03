import React, {
  View,
  Text,
  Component,
  ListView,
  AlertIOS,
  Alert,
  AsyncStorage } from 'react-native';
import { Container, Header, Content, Title, Button, Icon } from 'native-base';
import { Card } from 'react-native-material-design';
import ListComment from './ListComment';
import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');

class YakView extends Component {
  constructor(props) {
    super(props);
    // sets our components state listener
    this.state = {
      dataSource: new ListView.DataSource({
        // bizzare ass expression for handling rows
        rowHasChanged: (row1, row2) => row1 !== row2,

      }),
      // this is the initial score value
      score: this.props.item.score,
      // changes need to reflect parent state
      loaded: false,
    };
    var childKey = this.props.item._key.toString();
    console.log('CHILDKEY', childKey);
    this.commentRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey);
  }
  componentWillMount() {
    // get our account shit from async
    AsyncStorage.getItem('authData').then((authDataJson) => {
      userData = JSON.parse(authDataJson);
      this.props.user = userData.uid;
      this.setState({
        user: userData,
        loaded: true
      });
      console.log(this.state.user.uid); // hell yeah boi
    });
  }
  componentDidMount() {
    this.listenForComments(this.commentRef);
  }
  listenForComments(commentRef){
    console.log('REFS', commentRef);

    // push comment children
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
      user: this.state.user.uid,
    }, onComplete());
  }
  _returnToYaks() {
    this.props.navigator.resetTo({
      ident: 'MainLayout'
    });
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
    // doesnt work
    // AsyncStorage.setItem('hasVoted', userHasVoted, function(error){
    //   if (error){
    //     console.log('failed to set hasVoted in AsyncStorage');
    //     Alert.alert('shits fucked');
    //   } else {
    //     console.log('async hasVoted set');
    //   }
    // });
        // get score
        var childKey = this.props.item._key.toString();
        console.log('CHILDKEY', childKey);
        var scoreRef = new Firebase('https://bisonyak.firebaseio.com/items/' + childKey + '/score');
        // transaction to increment by one
        if (param === 1){
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
        }

        else if (param === 2){
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
        } else {
          console.log('THIS SHOULD NOT BE REACHED');
          Alert.alert('failed to vote on post, call an engineer');
        }

  }
  // function to delete current post
  deletePost() {

    var deletePostObject = {
      alertTitle: 'Hey!',
      alertMessage: 'Post Removed'
    };
    // check post author

    if (this.props.item.user === this.state.user.uid){
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
  render(){
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
                <Text>{this.state.score}pts</Text>
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
                  style={styles.listview}
                  initialListSize={0}
                  />
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
