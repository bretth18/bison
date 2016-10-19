// main file
import {
   AppRegistry,
   StyleSheet,
   Navigator } from 'react-native';

import React, { Component } from 'react';

import {Container, Header, Content, Footer, Title} from 'native-base';
import Yaks from './Yaks';
import ComposeYak from '../Components/ComposeYak';
import YakView from '../Components/YakView';

class YakViewLayout extends Component {
       render() {
           return (
               <Container>
                   <Header>
                       <Title>bison.</Title>
                   </Header>
                   <Content>
                     <YakView navigator={this.props.navigator} item={this.props.item} />
                  </Content>

               </Container>
           );
       }
   }
module.exports = YakViewLayout;
