import React, { Component } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';


export default class TopNav extends Component {
  render() {
    return (
    <NavBar>
      <NavTitle>
        {"bisonYak"}
      </NavTitle>
      <NavGroup>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText>
            {"Info"}
          </NavButtonText>
        </NavButton>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText>
            {"About"}
          </NavButtonText>
        </NavButton>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText>
            {"Black"}
          </NavButtonText>
        </NavButton>
      </NavGroup>
    </NavBar>
    );
  }
}










module.exports = TopNav;
