export default class ApiCalls{
  async getItems(IDPassed){
    await fetch(`http://10.74.1.60:5000/api/item/bystudent/${IDPassed}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async checkoutItem(itemID){
    await fetch(`http://10.74.1.60:5000/api/item/bystudent/${IDPassed}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: Json.stringify({Loaned: true, SignOutDate: new Date(Date.now())}),
    }).then(function(response) {
    return response.ok();
  })

  }

}
