// main file
import React, {
   AppRegistry,
   Component,
   StyleSheet,
   Navigator, } from 'react-native';

import {Container, Header, Content, Footer, Title} from 'native-base';
import Yaks from './Containers/Yaks';
import ComposeYak from './Components/ComposeYak';
import MainLayout from './Containers/MainLayout';

class Awesomenativebase extends Component {
       render() {
         console.log(navigator);
           return (
             <Navigator
               ref="appNav"
               navigator = {navigator}
               initialRoute={{ id: 'MainLayout', component: MainLayout}}
               renderScene={(route, navigator) => {
                 console.log(route, navigator);

                 if (route.component) {
                   return React.createElement(route.component, { navigator });
                 }
               }}
              />
           );
       }
   }


AppRegistry.registerComponent('Awesomenativebase', () => Awesomenativebase);
