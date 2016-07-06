import React, {
  View,
  Text,
  Component,
  Image } from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon } from 'native-base';
import { Card } from 'react-native-material-design';
import SettingsList from 'react-native-settings-list';

const styles = require('../Styles/Styles.js');

//const for icon
const bisonIcon = require('../ios/BisonApp/Images.xcassets/AppIcon.appiconset/Icon-40@2x.png');

class Settings extends Component {
  constructor(props){
    super(props);
  }
  // function to handle navigation back
  _returnToYaks(){
    this.props.navigator.resetTo({
      ident: 'MainLayout'
    });
  }
  // function to handle nav to feedback page
  _navToFeedback(){
    this.props.navigator.resetTo({
      ident: 'Feedback'
    });
  }

  render(){
    return(
      <Container>
          <Header>
            <Button transparent onPress={this._returnToYaks.bind(this)}>
                <Icon name="ios-arrow-left" />
            </Button>
              <Title>bison.</Title>
          </Header>
          <Content>
            <View style={styles.container}>
              <Card>
                <Card.Body>
                  <Image source={bisonIcon}/>
                  <Text>Bison</Text>
                  <Text>made by @bretth18</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text style={{fontWeight: 'bold'}}>StackWorld 2016 Demo</Text>
                  <Text style={{fontStyle: 'italic'}}>
                    Demo application built
                    by @bretth18/healthLab.io.
                    Powered by React-Native</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text style={{fontWeight: 'bold'}}>Version</Text>
                  <Text style={{fontStyle: 'italic'}}>pre-release0.0.1</Text>

                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text style={{fontWeight: 'bold'}}>Questions?</Text>
                  <Text>support@bisonapp.co</Text>
                </Card.Body>
              </Card>

            </View>
         </Content>
          <Footer>
              <Title>made with <Icon name="ios-heart"/> in SF</Title>
          </Footer>
      </Container>
    );
  }

}



module.exports = Settings;
