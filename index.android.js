// main file

// kiss my ass android
import {
   AppRegistry,
   StyleSheet,
   Navigator } from 'react-native';

import React, { Component } from 'react';



import Yaks from './Containers/Yaks';
import MainLayout from './Containers/MainLayout';
import YakView from './Components/YakView';
import YakViewLayout from './Containers/YakViewLayout';
import Settings from './Components/Settings';

class BisonApp extends Component {

      _renderScene(route, navigator){
        // every scene has these probs
        var globalNavigatorProps = { navigator };

        switch (route.ident) {
          case 'MainLayout':
                return (
                  <MainLayout {...globalNavigatorProps} />
                );

          case 'Yaks':
                return(
                  <Yaks {...globalNavigatorProps} />
                );

          case 'YakView':
                return (
                  <YakView {...globalNavigatorProps}
                            item={route.item} />
                );
          case 'YakViewLayout':
                return(
                  <YakViewLayout {...globalNavigatorProps}  />
                );
          case 'Settings':
                return(
                  <Settings {...globalNavigatorProps} />
                );
          default:
                return (
                  <Text>{`CRITICAL ERROR! ${route}`}</Text>
                )
        }

      }
       render() {
           return (
             <Navigator
               initialRoute={{ident:"MainLayout"}}
               ref="appnavigator"
               style={styles.navigatorStyles}
               renderScene={this._renderScene}
              />
           );
       }
   }

const styles = React.StyleSheet.create({

  navigatorStyles: {

  }
});

AppRegistry.registerComponent('BisonApp', () => BisonApp);
