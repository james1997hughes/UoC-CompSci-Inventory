import React from 'react';
import './App.css';

class Loans extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="settings-panel">
        <div className="credits">
          <h1>Created by Time Sponge Software</h1>
          <a href="https://jameshughes.dev" id="blatent-self-promotion"><h3>James Hughes</h3></a>
          <h3>David Sloane</h3>
          <h3>Alex Maden</h3>
          <h3>James Marszelak</h3>
        </div>
      </div>
    );
  }

}
export default Loans;
