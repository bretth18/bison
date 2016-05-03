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
const styles = require('../Styles/Styles.js');
const constants = styles.constants;



class YakView extends Component {
  render(){
    return(
      <View>
        <Text>{this.props.item.title}</Text>
        <Text>{this.props.item.time}</Text>
        <View style={styles.li}>
          <Text>{this.props.item.comment}</Text>
          <Text>{this.props.item.comment.time}</Text>
          <Text>{this.props.item.comment.score}</Text>
        </View>
      </View>
    );
  }
}







module.exports = YakView;
