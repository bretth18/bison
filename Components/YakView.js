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

import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

var refs = Firebase;


class YakView extends Component {
  constructor(props){
    super(props);

    // sets our components state listener
    var itemKey = this.props.item._key;
    // firebase ref

  }
  submitComment(){
    refs.push.appendToChild({
      comment: null,
      id: null,
      time: null,
    });
  }
  _returnToYaks(){
    console.log('fart');
    this.props.navigator.push({
      ident: 'MainLayout'
    });
  }
  _addComment(){

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
            console.log('shit on my plate');
            // this.props.item.push({ comment: text, time: Date() }, onComplete);
          },
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      'plain-text'
    );
  }
  render(){
    // console.log(item);
    console.log(this.props.item);
    return(
      <Container>
          <Header>
              <Title>bison.</Title>
          </Header>
          <Content>
            <View style={styles.container}>
                <Text>{this.props.item.title}</Text>
                <Text>{this.props.item.time}</Text>
                <Text>{this.props.item.comment}</Text>

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
