import React, {
  View,
  Text,
  Component,
  Alert,
  TouchableHighlight} from 'react-native';
import moment from 'moment';
const styles = require('../Styles/Styles.js');

class ListComment extends Component {
  // handle time precision
  handleTime(){
    if (this.props.comment.time === undefined){
      return console.log('time empty');
    }
    else if (this.props.comment.time !== undefined){
      return moment(this.props.comment.time).format('dddd, MMMM Do YYYY, h:mm:ss a');
    } else {
      console.log('neither cases pass');
      Alert.alert('fuck please call a developer');
    }
  }
  // function that generates random icon based on UID
  generateIcon(){
    var userId = this.props.comment.user.uid;

    
  }
  render(){
    return(
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.comment.comment}</Text>
          <Text style={styles.liText}>{this.props.comment.id}</Text>
          <Text style={styles.liText}>{this.handleTime()}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


module.exports = ListComment;
