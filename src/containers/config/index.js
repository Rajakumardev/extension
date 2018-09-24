import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import { Modal, notification, Icon } from 'antd';

import SettingsDisplay from '../settingsDisplay';

import ga from '../../analytics';

class Config extends Component {
  constructor(props) {
    super(props)
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }
  clickCoffee() {
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Click Coffee',
        label: `${localStorage.getItem('PACKAGE')} - User`
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Click Coffee',
        label: 'FREE - Guest'
      });
    }
  }
  handleVisibleChange() {
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    this.props.dispatch({ type: 'SETTINGS_TOGGLE' });
    if (this.props.settings.visible) {
      this.openNotificationWithIcon('success');
    } else {
      if (user) {
        ga.set({ userId: user.user.email });
        ga.event({
          category: 'Config',
          action: 'Click Config',
          label: `${localStorage.getItem('PACKAGE')} - User`
        });
      } else{
        ga.event({
          category: 'Config',
          action: 'Click Config',
          label: 'FREE - Guest'
        });
      }
    }
  }
  openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Success',
      description: 'Settings Saved',
    });
  };
  render() {
    return (
      <div>
        <span className="config__button" onClick={this.handleVisibleChange}>
          <Icon type="setting" style={{ fontSize: '200%' }} />
        </span>
        <Modal
          width="60vw"
          style={{ top: 20 }}
          visible={this.props.settings.visible}
          title="Settings"
          onOk={this.handleVisibleChange}
          onCancel={this.handleVisibleChange}
        >
          <SettingsDisplay />
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
