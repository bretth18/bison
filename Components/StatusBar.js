import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
} from 'react-native';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;


class StatusBar extends Component{
  render(){
    return(
      <View>
        <View style={styles.statusbar} />
        <View style={styles.navbar} >
          <Text style={styles.navbarTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}


module.exports = StatusBar;
