// main file
import  {
   AppRegistry,
   StyleSheet,
   Navigator, } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './App/Store/Store';


import {Container, Header, Content, Footer, Title} from 'native-base';

import Yak from './App/Components/Yak';
import NavigatorContainer from './App/Containers/NavigatorContainer';


class BisonApp extends Component {
  render() {
    return (
      <Provider store={store} >
        <NavigatorContainer />
      </Provider>
    );
  }



      //
      // _renderScene(route, navigator){
      //   // every scene has these props
      //   var globalNavigatorProps = { navigator };
      //
      //   switch (route.ident) {
      //     case "Yaks":
      //           return(
      //             <Yaks {...globalNavigatorProps} />
      //           );
      //
      //     case "YakView":
      //           return (
      //             <YakView {...globalNavigatorProps}
      //                       item={route.item} />
      //           );
      //     case "YakViewLayout":
      //           return(
      //             <YakViewLayout {...globalNavigatorProps}  />
      //           );
      //     case "Settings":
      //           return(
      //             <Settings {...globalNavigatorProps} />
      //           );
      //     case "Feedback":
      //           return(
      //             <Feedback {...globalNavigatorProps} />
      //           );
      //     case "NoConnectView":
      //           return(
      //             <NoConnectView {...globalNavigatorProps} />
      //           );
      //     default:
      //           return (
      //             <Text>{`CRITICAL ERROR! ${route}`}</Text>
      //           )
      //   }
      //
      // }
      //  render() {
      //    // initialize our firebase reference
      //    FirebaseClass.initFirebase();
      //
      //      return (
      //        <Navigator
      //          initialRoute={{ident:"Yaks"}}
      //          ref="appnavigator"
      //          style={styles.navigatorStyles}
      //          renderScene={this._renderScene}
      //         />
      //      );
      //  }
   }

AppRegistry.registerComponent('BisonApp', () => BisonApp);
