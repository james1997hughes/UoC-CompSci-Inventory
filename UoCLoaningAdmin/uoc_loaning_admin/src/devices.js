import React from 'react';
import './App.css';

class Devices extends React.Component{
  constructor(props){
    super(props);
    this.state = {loading: false, data: []};
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch('http://10.74.1.60:5000/api/item')
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data, loading: false });
      console.log("loaded");
    });
  }
  deleteItem(){

  }
  checkOut(i){
    var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var data = `'{\n\t\"Loaned\":\"true\",\n\t\"StudentNo\":\"1710904\",\n\t"SignOutDate\":\"${today}\"\n}'`;
    fetch(`http://10.74.1.60:5000/api/item/${i}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: data,
    }).then(response => {
      if (response.ok){
      this.updateTable();
    }
    });
  }
  render(){
if (this.state.loading === true){
    return(
      <div class="loading-container">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
        <h3>Fetching item data...</h3>
      </div>
    );
}else{
      return(

            <div class="DevicesTable">
            <a href='#' class="addLink"><h1>TEST</h1></a>
              <table>
                <tr>
                  <th>Device Name</th>
                  <th>ID</th>
                  <th>Serial Number</th>
                  <th>MID Number</th>
                  <th>Comments</th>
                  <th>Item Options</th>
                </tr>
                <tbody>
                {this.state.data.map(item =>
                <tr>
                  <td>{item.category}</td>
                  <td>{item.id}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.mid}</td>
                  <td>{item.comments}</td>
                  <td><a href='#'><i class="material-icons">delete</i></a><a href='#'><i class="material-icons">edit</i></a><a href='#'><i class="material-icons" onClick={() => this.checkOut(item.id)}>open_in_new</i></a></td>
                </tr>)}
                </tbody>
            </table>
            </div>
          );}
        }}
export default Devices;
