require('normalize.css/normalize.css');
require('styles/App.css');
import {connect} from 'react-redux';
import * as actionCreators from '../actions/yahtzee.js';
import {Link} from 'react-router';

import React from 'react';

class MenuComponent extends React.Component {
  render() {
    var links = [
      { icon: 'home', name: 'Games', to: '/list' },
      { icon: 'people', name: 'Friends', to: '/friends' },
      { icon: 'delete', name: 'Stats', to: '/stats' }
    ];
 
    return (
      <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="demo-drawer-header">
          <img src="images/user.jpg" className="demo-avatar" />
          <div className="demo-avatar-dropdown">
            <span>{this.props.username ? this.props.username : 'Not logged in!'}</span>
            <div className="mdl-layout-spacer"></div>
            <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons" role="presentation">arrow_drop_down</i>
              <span className="visuallyhidden">Accounts</span>
            </button>
            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
              <li className="mdl-menu__item">hello@example.com</li>
              <li className="mdl-menu__item">info@example.com</li>
              <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
            </ul>
          </div>
        </header>
        <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          {links.map(l => <Link key={l.to} className="mdl-navigation__link" to={l.to}><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">{l.icon}</i>{l.name}</Link>)}
        </nav>
      </div>
    );
  }
}


MenuComponent.defaultProps = {
};

MenuComponent.propTypes = {
  username: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    username: state.yahtzee.username
  };
}

export const MenuContainer = connect(mapStateToProps, actionCreators)(MenuComponent);
