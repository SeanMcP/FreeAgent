import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import user from '../data/user';

// Import components
import ProfileEdit from '../components/ProfileEdit';
import TeamSettings from '../components/TeamSettings';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Edit profile</h2>
        <ProfileEdit />
        <TeamSettings />
      </div>
    );
  }
}

export default Settings;
