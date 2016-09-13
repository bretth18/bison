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
import YakView from './Components/YakView';
import YakViewLayout from './Containers/YakViewLayout';
import Settings from './Components/Settings';
import Feedback from './Components/Feedback';

class BisonApp extends Component {

      _renderScene(route, navigator){
        // every scene has these probs
        var globalNavigatorProps = { navigator };

        switch (route.ident) {
          case "MainLayout":
                return (
                  <MainLayout {...globalNavigatorProps} />
                );

          case "Yaks":
                return(
                  <Yaks {...globalNavigatorProps} />
                );

          case "YakView":
                return (
                  <YakView {...globalNavigatorProps}
                            item={route.item} />
                );
          case "YakViewLayout":
                return(
                  <YakViewLayout {...globalNavigatorProps}  />
                );
          case "Settings":
                return(
                  <Settings {...globalNavigatorProps} />
                );
          case "Feedback":
                return(
                  <Feedback {...globalNavigatorProps} />
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
