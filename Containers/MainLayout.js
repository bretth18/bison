/* DEPRECIATED:
   - class MainLayout has been re-implented inside of
    class Yak to make things more straight forward.
    File will be removed shortly.
*/

// main file
import {
   NetInfo,
   Navigator } from 'react-native';

import React, { Component } from 'react';


import {Container, Header, Content, Footer, Title, Icon, Button} from 'native-base';
import Yaks from './Yaks';
import NativeTheme from '../Themes/myTheme';

class MainLayout extends Component {
      // function to take us to settings page
      goToSettings(){
        this.props.navigator.push({
          ident: 'Settings',
        });
      }
      // function that checks device connection
      listenForConnection() {
        NetInfo.isConnected.fetch().then(isConnected => {
          // set state based on connection status
          if (isConnected === 'online'){
            this.setState({
              connection: true
            });
          } else {
            this.setState({
              connection: false
            });
          }
        });
      }

       render() {
           return (
               <Container theme={NativeTheme}>
                   <Header theme={NativeTheme}>

                       <Title>bison.</Title>
                         <Button transparent onPress={this.goToSettings.bind(this)}>
                             <Icon name="ios-settings"/>
                         </Button>
                   </Header>
                   <Content >
                     <Yaks navigator={this.props.navigator} />
                  </Content>

                   <Footer>
                       <Title>made with <Icon theme={NativeTheme} name="ios-heart"/> in SF</Title>
                   </Footer>
               </Container>
           );
       }
   }
module.exports = MainLayout;
