// main file
import React, {
   AppRegistry,
   Component,
   StyleSheet,
   Navigator } from 'react-native';

import {Container, Header, Content, Footer, Title, Icon, Button} from 'native-base';
import Yaks from './Yaks';
import ComposeYak from '../Components/ComposeYak';

class MainLayout extends Component {
      // function to take us to settings page
      goToSettings(){
        this.props.navigator.push({
          ident: 'Settings',
        });
      }
       render() {
           return (
               <Container>
                   <Header>
                       <Title>bison.</Title>
                         <Button transparent>
                             <Icon name="ios-settings"/>
                         </Button>
                   </Header>
                   <Content>
                     <Yaks navigator={this.props.navigator} />
                  </Content>

                   <Footer>
                       <Title>made with <Icon name="ios-heart"/> in SF</Title>
                   </Footer>
               </Container>
           );
       }
   }
module.exports = MainLayout;
