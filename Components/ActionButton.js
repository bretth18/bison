import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
  TouchableHighlight,
} from 'react-native';
const styles = require('../Styles/Styles.js');
const constants = styles.constants;

class ActionButton extends Component {
  render(){
    return (
      <View style={styles.action} >
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}



module.exports = ActionButton;
