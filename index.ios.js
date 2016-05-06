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

class Awesomenativebase extends Component {

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

AppRegistry.registerComponent('Awesomenativebase', () => Awesomenativebase);
