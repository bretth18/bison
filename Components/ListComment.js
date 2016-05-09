import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
  TouchableHighlight} from 'react-native';
const styles = require('../Styles/Styles.js');
const constants = styles.constants;

class ListComment extends Component {
  render(){
    return(
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.comment.comment}</Text>
          <Text style={styles.liText}>{this.props.comment.id}</Text>
          <Text style={styles.liText}>{this.props.comment.time}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


module.exports = ListComment;
