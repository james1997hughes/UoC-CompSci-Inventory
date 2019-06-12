import React from 'react';
import './App.css';

class Loans extends React.Component{
  constructor(props){
    super(props);
    this.state = {loading: false, data: []};
  }
  componentDidMount() {
    this.updateTable();
  }
  updateTable(){
    this.setState({ loading: true });
    fetch('http://10.74.1.60:5000/api/item')
      .then(response => response.json())
      .then(data => this.setState({ data: data, loading: false }));
  }
  add2Weeks(e){
    var returnDate = new Date(e);
    returnDate.setDate(returnDate.getDate() + 14);
    return returnDate;
  }
  dateParse(e){
    var outDate = new Date(e);
  }
  checkIn(i){
    var data = `'{\n\t\"Loaned\":\"false\",\n\t\"StudentNo\":null,\n\t"SignOutDate\":null\n}'`
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
              <h3>Fetching loan data...</h3>
            </div>
          );
      }else{
      return(
            <div class="LoansTable">
              <table>
              <thead>
                <tr>
                  <th>Student Number</th>
                  <th>Date Loaned</th>
                  <th>Date due in</th>
                  <th>Device Name</th>
                  <th>ID</th>
                  <th>Serial Number</th>
                  <th>MID Number</th>
                  <th>Comments</th>
                  <th>Check in</th>
                </tr>
                </thead>
                <tbody>
                {this.state.data.slice(0,-1).map(item =>
                { console.log(this.state.data.slice(1,-1));
                  if (item.loaned == true){
                  console.log('Item loaned');
                  return(
                    <tr>
                    <td>{item.studentNo}</td>
                    <td>{item.signOutDate?(new Date(item.signOutDate)).toString().substring(0,item.signOutDate.length-9):''}</td>
                    <td>{item.signOutDate?this.add2Weeks(item.signOutDate).toString().substring(0,item.signOutDate.length-9):''}</td>
                    <td>{item.category}</td>
                    <td>{item.id}</td>
                    <td>{item.serialNumber}</td>
                    <td>{item.mid}</td>
                    <td>{item.comments}</td>
                    <td><a href='#' onClick={() => this.checkIn(item.id)}><i class="material-icons">input</i></a></td>
                  </tr>
                );
              }else{
                console.log('Not loaned');
              }
            }

              )}
              </tbody>
            </table>
            </div>
          );}
        }

      }
export default Loans;
