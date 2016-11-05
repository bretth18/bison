// This is our redux wrapper for the main component.
// it injects the state and dispatch functions via props.
'use strict';

import { View } from 'react-native';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Yak from '../Components/Yak';
import * as YakActions from '../Actions/addYak';
// actions imports

class YakContainer extends Component {
  render() {
    return (
      <Yak {...this.props} />
    );
  }
}
function mapStateToProps(state) {
  return {
    yakList: state.yaks.yakList,
    connectionChecked: state.yaks.connectionChecked,
    connected: state.yaks.connected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(YakActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(YakContainer);
