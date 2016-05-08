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

class ListItem extends Component {
  render(){
    return(
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
          <Text style={styles.liText}>{this.props.item.time}</Text>
          <Text style={styles.liText}>{this.props.item.score}pts</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


module.exports = ListItem;
