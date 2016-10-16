
'use strict'; // wtf is this for
import React, { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import { getTheme } from 'react-native-material-kit';


const theme = getTheme();
const constants = {
  actionColor: '#24CE84'
};

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const baseUnit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

// We add an em() shortcut function
function em(value) {
  return unit * value;
}

// good shit here boi
var styleBaby = {
  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,
  UNIT: em(1),
  PADDING: em(1.25),

  // CARD
  CARD_WIDTH: x - em(1.25) * 2,
  CARD_HEIGHT: (x - em(1.25) * 2) * (3/5),
  CARD_PADDING_X: em(1.875),
  CARD_PADDING_Y: em(1.25),

  // FONT
  FONT_SIZE: em(1),
  FONT_SIZE_SMALLER: em(0.75),
  FONT_SIZE_SMALL: em(0.875),
  FONT_SIZE_TITLE: em(1.25),
};

var styles = StyleSheet.create({
  listCards:{
      flex: 1,
      borderWidth: 1,
      paddingLeft: 16,
      paddingTop: 14,
      paddingBottom: 16,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      borderColor: 'transparent',
      shadowColor: 'rgba(0, 0, 0, 0.12)',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 2,
      },
    },
      cardImageStyle: {
      flex: 1,
      height: 170,
      resizeMode: 'cover',
      },
      cardTitleStyle: {
      position: 'absolute',
      top: 120,
      left: 26,
      backgroundColor: 'transparent',
      padding: 16,
      fontSize: 24,
      color: '#000000',
      fontWeight: 'bold',
      },
      cardContentStyle: {
      padding: 15,
      color: 'rgba(0, 0, 0, 0.54)',
      },
      cardActionStyle: {
      borderStyle: 'solid',
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      borderTopWidth: 1,
      padding: 15,
      },
      cardMenuStyle: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: 'transparent',
      },
  diverseTextBox: {
    width: 275,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
  diverseContainer: {
    width: styleBaby.CARD_WIDTH,
    height: styleBaby.CARD_HEIGHT,
    padding: styleBaby.CARD_PADDING_X,
    paddingTop: styleBaby.CARD_PADDING_Y,
    paddingBottom: styleBaby.CARD_PADDING_Y,
  },
  diverseText: {
    fontSize: styleBaby.FONT_SIZE,
    lineHeight: styleBaby.FONT_SIZE * 1.5,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  liBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    borderColor: 'transparent',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500'
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 5,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: '#24CE84' ,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  button: {
    justifyContent: 'flex-end',
  },
});

module.exports = styles;
module.exports.constants = constants;
