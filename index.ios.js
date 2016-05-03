// main file
import React, {
   AppRegistry,
   Component,
   StyleSheet } from 'react-native';

import {Container, Header, Content, Footer, Title} from 'native-base';
import Yaks from './Containers/Yaks';
import ComposeYak from './Components/ComposeYak';

   export default class Awesomenativebase extends Component {
       render() {
           return (
               <Container>
                   <Header>
                       <Title>bison.</Title>
                   </Header>
                   <Content>
                     <Yaks />
                  </Content>

                   <Footer>
                       <Title>this is the footer</Title>
                   </Footer>
               </Container>
           );
       }
   }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('Awesomenativebase', () => Awesomenativebase);
