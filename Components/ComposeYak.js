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
  TextInput,
  Modal,
} from 'react-native';
const styles = require('../Styles/Styles.js');
const constants = styles.constants;


import { Container, Content, InputGroup, Input, Icon } from 'native-base';

// TODO: this shit, it can be used cross platform instead of iosPrompt
class ComposeYak extends Component {
    _submitYak(){

    }
    render() {
        return (
              <Modal animated={true}>
                <View>
                  <TextInput maxLength={350} onSubmitEditing={this._submitYak} />
                </View>

              </Modal>

        );
    }
}

module.exports = ComposeYak;
