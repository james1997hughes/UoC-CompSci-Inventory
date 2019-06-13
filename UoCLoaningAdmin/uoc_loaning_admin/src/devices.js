import React from 'react';
import './App.css';
import update from 'immutability-helper';


class Devices extends React.Component{
  constructor(props){
    super(props);
    this.getItem = this.getItem.bind(this);
    this.state = {loading: false, data: [], checkOutModalVisible: false, checkOutId: '', checkOutStudentNumber: '', deleteModalVisible: false, deleteId: '', editItemLoaded: null, editModalVisible: false, editId: '', editData: {deviceType: 'test', serialNumber: '', mid: '', category: '', comments: '', loaned: false}, addData: {id: '', deviceType: '', serialNumber: '', mid: '', category: '', comments: ''}, studentPic: ''};
  }
  componentDidMount() {
    this.updateTable();
  }
  updateTable(){
    this.dismissModal();
    this.setState({ loading: true });
    fetch('http://10.74.1.60:5000/api/item')
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data, loading: false });
    });
  }

  getItem(i){
    this.setItemIdState(i);
    fetch(`http://10.74.1.60:5000/api/item/${i}`)
      .then(response => response.json())
      .then(data => {
        this.updateItemToEdit(data);
    });
  }
  setItemIdState(i){
    this.setState({editId: i});
  }
  updateItemToEdit(data){
    this.updateLoanedStatus(data.loaned);
    this.updateDeviceType(data.deviceType);
    this.updateSerialNumber(data.serialNumber);
    this.updateMID(data.mid);
    this.updateCategory(data.category);
    this.updateComments(data.comments);
    this.displayEditModal();
  }
  updateLoanedStatus(loan){
    this.setState({
      editData: update(this.state.editData, {loaned: {$set: loan}})
    })
  }
  displayEditModal(){
    this.setState({editModalVisible: true});
  }
  updateItem(){
      var data = `'{\n\t\"DeviceType\":\"${this.state.editData.deviceType}\",\n\t\"Category\":\"${this.state.editData.category}\",\n\t\"MID\":\"${this.state.editData.mid}\",\n\t\"SerialNumber\":\"${this.state.editData.serialNumber}\",\n\t\"Loaned\":\"${this.state.editData.loaned}\",\n\t\"Comments\":\"${this.state.editData.comments}\"\n}'`;
      fetch(`http://10.74.1.60:5000/api/item/${this.state.editId}`, {
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
  updateDeviceType(type){
    this.setState({
      editData: update(this.state.editData, {deviceType: {$set: type}})
    })
  }
  updateSerialNumber(serial){
    this.setState({
      editData: update(this.state.editData, {serialNumber: {$set: serial}})
    })
  }
  updateMID(mid){
    this.setState({
      editData: update(this.state.editData, {mid: {$set: mid}})
    })
  }
  updateCategory(cat){
    this.setState({
      editData: update(this.state.editData, {category: {$set: cat}})
    })
  }
  updateComments(comments){
    this.setState({
      editData: update(this.state.editData, {comments: {$set: comments}})
    })
  }
  displayDeleteModal(d){
    this.setState({deleteModalVisible:true, deleteId: d});
  }
  deleteItem(d){
    fetch(`http://10.74.1.60:5000/api/item/${d}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok){
      this.updateTable();
    }
    });
  }
  updateCheckOutSN(SN){
    this.setState({checkOutStudentNumber: SN});
  }
  displayCheckOutModal(i){
    this.setState({checkOutModalVisible: true, checkOutId: i});
  }
  displayAddModal(){
    this.setState({addModalVisible: true});
  }
  checkOut(i){
    var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var data = `'{\n\t\"Loaned\":\"true\",\n\t\"StudentNo\":\"${this.state.checkOutStudentNumber}\",\n\t"SignOutDate\":\"${today}\"\n}'`;
    fetch(`http://10.74.1.60:5000/api/item/${this.state.checkOutId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: data,
    }).then(response => {
      if (response.ok){
      this.updateTable();
      this.dismissModal();
    }
    });
  }
  dismissModal(){
    this.setState({checkOutModalVisible: false, deleteModalVisible: false, editModalVisible: false, addModalVisible: false, pictureModalVisible: false})
  }
  addItem(){
    var data = `'{\n\t\"Id\":\"${this.state.addData.id}\",\n\t\"DeviceType\":\"${this.state.addData.deviceType}\",\n\t\"Category\":\"${this.state.addData.category}\",\n\t\"MID\":\"${this.state.addData.mid}\",\n\t\"SerialNumber\":\"${this.state.addData.serialNumber}\",\n\t\"Comments\":\"${this.state.addData.comments}\"\n}'`;
    fetch(`http://10.74.1.60:5000/api/item/`, {
      method: 'POST',
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
  getPicture(){
    var pictemp = this.getStudentPicture(this.state.checkOutStudentNumber);
    this.setState({studentPic: pictemp});
  }
  getStudentPicture(STUDENTID){
        /*
          ==MESSAGE TO BIG PAUL==
          This didn't get done due to time.
          Need to make an initial post request to log in, then once you have the login credential, make another request for the picture
          The code below sort of works, it will authorize and fetch most of the picture, but

          Change the username and password variables to another account
          Currently using James Marszelak's
        */
        let imageRetrieved;
        let username = '1706376';
        let password = 'Famas1167';
        var data = `curl=Z2Fv2Z2FprofileZ2Fprofile.phpZ3FoperationZ3DphotoZ26otheruserZ3D${STUDENTID}&flags=0&forcedownlevel=0&formdir=9&username=${username}&password=${password}&SubmitCreds=Sign+In`;
        fetch(`https://apps.chester.ac.uk/CookieAuth.dll?Logon`, {
          method: 'POST',
          redirect: 'follow',
          credentials: 'include',
          headers: {
            'Content-Type': `application/x-www-form-urlencoded`,
            'Referer': `https://apps.chester.ac.uk/CookieAuth.dll?GetLogon?curl=Z2Fv2Z2FprofileZ2Fprofile.phpZ3FoperationZ3DphotoZ26otheruserZ3D1719922&reason=0&formdir=9`,
          },
          keepalive: true,
          body: data,
        }).then(
          fetch(`https://apps.chester.ac.uk/v2/profile/profile.php?operation=photo&otheruser=${STUDENTID}`, {
            keepalive: true,
            credentials: 'include',
            headers: {
              'Content-Type': `application/x-www-form-urlencoded`,
              'Referer': `https://apps.chester.ac.uk/CookieAuth.dll?GetLogon?curl=Z2Fv2Z2FprofileZ2Fprofile.phpZ3FoperationZ3DphotoZ26otheruserZ3D1719922&reason=0&formdir=9`,
            },

          })
          .then(response => response.blob())
          .then(image =>{
            imageRetrieved = URL.createObjectURL(image);
            console.log(imageRetrieved);
            return imageRetrieved;
          })
        );

  }
  confirmCheckOut(){
    this.dismissModal();
    this.getPicture(this.state.checkOutStudentNumber);
    this.setState({pictureModalVisible: true});
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
            {this.state.checkOutModalVisible
              ?
              <div className="modal-container">
                <div className="modal-inner">
                  <h3>Please enter student number to register loan:</h3><a href='#' className="dismiss-btn" onClick={() => this.dismissModal()}>X</a>
                  <input type="text" id="studentnumber" name="studentnumber" onChange={e => this.updateCheckOutSN(e.target.value)}/>
                  <button className="submit-btn" onClick={() => this.confirmCheckOut()}>Check Out</button>
                </div>
              </div>
              :
              <div></div>
            }
            {this.state.pictureModalVisible
              ?
              <div className="modal-container">
                <div className="modal-inner">
                  <h3>Confirm loan for user {this.state.checkOutStudentNumber} with picture {this.state.studentPic}</h3><a href='#' className="dismiss-btn" onClick={() => this.dismissModal()}>X</a>
                  <img src={this.studentPic} className="student-picture"/>
                  <button className="submit-btn" onClick={() => this.checkOut(this.state.checkOutId)}>Check Out</button>
                </div>
              </div>
              :
              <div></div>
            }

            {this.state.editModalVisible
              ?
              <div className="modal-container">
                <div className="modal-inner">
                  <h3>Edit loan as required:</h3> <a href='#' className="dismiss-btn" onClick={() => this.dismissModal()}>X</a>
                  <label className="input-label">Device Type</label><input type="text" id="devType" value={this.state.editData.deviceType} name="devType" onChange={(e) => this.updateDeviceType(e.target.value)}/>
                  <label className="input-label">Category</label><input type="text" id="categoryInput" value={this.state.editData.category} name="categoryInput" onChange={(e) => this.updateCategory(e.target.value)}/>
                  <label className="input-label">MID</label><input type="text" id="midInput" value={this.state.editData.mid} name="midInput" onChange={(e) => this.updateMID(e.target.value)}/>
                  <label className="input-label">Serial Number</label><input type="text" id="serialInput" value={this.state.editData.serialNumber} name="serialInput" onChange={(e) => this.updateSerialNumber(e.target.value)}/>
                  <label className="input-label">Comments</label><input type="text" id="commentsInput" value={this.state.editData.comments} name="commentsInput" onChange={(e) => this.updateComments(e.target.value)}/>
                  <button className="submit-btn" onClick={() => this.updateItem(this.state.editId)}>Confirm</button>
                </div>
              </div>
              :
              <div></div>
            }
            {this.state.deleteModalVisible
              ?
              <div className="modal-container">
                <div className="modal-inner">
                  <h3>Are you sure you want to delete item {this.state.deleteId}? </h3> <a href='#' className="dismiss-btn" onClick={() => this.dismissModal()}>X</a>
                  <button className="submit-btn" onClick={() => this.deleteItem(this.state.deleteId)}>Yes</button>
                </div>
              </div>
              :
              <div></div>
            }
            {this.state.addModalVisible
              ?
              <div className="modal-container">
                <div className="modal-inner">
                  <h3>Enter new device information</h3> <a href='#' className="dismiss-btn" onClick={() => this.dismissModal()}>X</a>
                  <label className="input-label">Device ID</label><input type="text" id="devId" value={this.state.addData.id} name="devId" onChange={(e) => this.setState({addData: update(this.state.addData, {id: {$set: e.target.value}})})}/>
                  <label className="input-label">Device Type</label><input type="text" id="devType" value={this.state.addData.deviceType} name="devType" onChange={(e) => this.setState({addData: update(this.state.addData, {deviceType: {$set: e.target.value}})})}/>
                  <label className="input-label">Category</label><input type="text" id="categoryInput" value={this.state.addData.category} name="categoryInput" onChange={(e) => this.setState({addData: update(this.state.addData, {category: {$set: e.target.value}})})}/>
                  <label className="input-label">MID</label><input type="text" id="midInput" value={this.state.addData.mid} name="midInput" onChange={(e) => this.setState({addData: update(this.state.addData, {mid: {$set: e.target.value}})})}/>
                  <label className="input-label">Serial Number</label><input type="text" id="serialInput" value={this.state.addData.serialNumber} name="serialInput" onChange={(e) => this.setState({addData: update(this.state.addData, {serialNumber: {$set: e.target.value}})})}/>
                  <label className="input-label">Comments</label><input type="text" id="commentsInput" value={this.state.addData.comments} name="commentsInput" onChange={(e) => this.setState({addData: update(this.state.addData, {comments: {$set: e.target.value}})})}/>
                  <button className="submit-btn" onClick={() => this.addItem()}>Add Item</button>
                </div>
              </div>
              :
              <div></div>
            }
            <a href='#' class="addLink" onClick={() => this.displayAddModal()}><h1>+Add New Item</h1></a>
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
                <tr className={item.loaned ? "loaned-onTime" : ""}>
                  <td>{item.category}</td>
                  <td>{item.id}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.mid}</td>
                  <td>{item.comments}</td>
                  <td><a href='#'><i class="material-icons" onClick={() => this.displayDeleteModal(item.id)}>delete</i></a><a href='#'><i class="material-icons" onClick={() => this.getItem(item.id)}>edit</i></a>{
                    item.loaned
                    ? <div></div>
                    : <i class="material-icons" onClick={() => this.displayCheckOutModal(item.id)}>open_in_new</i>
                  }
                  </td>
                </tr>)}
                </tbody>
            </table>
            </div>

          );}
        }}
export default Devices;
