// main file
import React, {
   AppRegistry,
   Component,
   StyleSheet,
   Navigator } from 'react-native';

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
                     <YakView navigator={this.props.navigator} />
                  </Content>

               </Container>
           );
       }
   }
module.exports = YakViewLayout;
