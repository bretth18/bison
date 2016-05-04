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
           return (
             <Navigator
               initialRoute={{
                 id: 'MainLayout'
               }}
               renderScene={
                 this.navigatorRenderScene
               }
               />

           );
       }
       navigatorRenderScene(route, navigator){
         _navigator = navigator;
         switch (route.id) {
           case 'MainLayout':
                  return(<MainLayout navigator={navigator} title="MainLayout" />);

                  break;
           default:

         }
       }
   }


AppRegistry.registerComponent('Awesomenativebase', () => Awesomenativebase);
