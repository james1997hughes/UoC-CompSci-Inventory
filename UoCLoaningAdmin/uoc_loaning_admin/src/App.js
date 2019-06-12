import React from 'react';
import './App.css';
import Devices from './devices.js';
import Loans from './Loans.js';
import Settings from './Settings.js';
import Konami from './konami.js'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {view: 'devices', data: null};
  }
  toggleView(e){
      this.setState({view: e});
  }
  render (){
    if (this.state.view === 'devices') {
    var easter_egg = new Konami(function() { new Audio('wii-music.mp3').play()});
    return (
    <div className="App">
    <div className="navigation-aside">
      <img className="nav-logo" src="res/logo.png"/>
      <a className="nav-button" id="devices-btn" href="#" onClick={() => this.toggleView('devices')} >
        <div className="button-container">
        <i class="material-icons" id="button-icons">important_devices</i>
          <p>Devices</p>
        </div>
      </a>
      <a className="nav-button" id="loans-btn" href="#"  onClick={() => this.toggleView('loans')}>
      <div className="button-container">
      <i class="material-icons" id="button-icons">mobile_screen_share</i>
        <p>Loaned Items</p>
      </div>
      </a>
      <a className="nav-button" id="settings-btn" href="#" onClick={() => this.toggleView('settings')}>
      <div className="button-container">
        <i class="material-icons" id="button-icons">settings</i>
        <p>Settings</p>
      </div>
      </a>
    </div>
    <div id="render-panel">
      {<Devices />}
    </div>
    </div>
  );
}else if(this.state.view === 'loans'){
  return(
  <div className="App">
  <div className="navigation-aside">
    <img className="nav-logo" src="res/logo.png"/>
    <a className="nav-button" id="devices-btn" href="#" onClick={() => this.toggleView('devices')} >
      <div className="button-container">
      <i class="material-icons" id="button-icons">important_devices</i>
        <p>Devices</p>
      </div>
    </a>
    <a className="nav-button" id="loans-btn" href="#"  onClick={() => this.toggleView('loans')}>
    <div className="button-container">
    <i class="material-icons" id="button-icons">mobile_screen_share</i>
      <p>Loaned Items</p>
    </div>
    </a>
    <a className="nav-button" id="settings-btn" href="#" onClick={() => this.toggleView('settings')}>
      <div className="button-container">
        <i class="material-icons" id="button-icons">settings</i>
        <p>Settings</p>
      </div>
    </a>
  </div>
  <div id="render-panel">
      {<Loans/>}
    </div>
  </div>
  );
} else if(this.state.view === 'settings'){
  return(
  <div className="App">
  <div className="navigation-aside">
    <img className="nav-logo" src="res/logo.png"/>
    <a className="nav-button" id="devices-btn" href="#" onClick={() => this.toggleView('devices')} >
      <div className="button-container">
      <i class="material-icons" id="button-icons">important_devices</i>
        <p>Devices</p>
      </div>
    </a>
    <a className="nav-button" id="loans-btn" href="#"  onClick={() => this.toggleView('loans')}>
    <div className="button-container">
    <i class="material-icons" id="button-icons">mobile_screen_share</i>
      <p>Loaned Items</p>
    </div>
    </a>
    <a className="nav-button" id="settings-btn" href="#" onClick={() => this.toggleView('settings')}>
      <div className="button-container">
        <i class="material-icons" id="button-icons">settings</i>
        <p>Settings</p>
      </div>
    </a>
  </div>
  <div id="render-panel">
      {<Settings/>}
    </div>
  </div>
  );
}
}
}




export default App;
