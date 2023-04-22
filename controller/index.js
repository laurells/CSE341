//defines a function which takes two parameters: "req" and "res", representing the request and response objects 
displayName = (req, res) => {
//create a constant variable called and assign the value of a string 
    const data =
      'What is your name?';
      //"res" object's "status" method is called with the argument "200" to set the HTTP status code of the response to 200, which indicates a successful response. 
      //The "send" method is called on the "res" object with the "data" variable as an argument to send the string as the response body.
    res.status(200).send(data);
  };
  //export the function name so that it can be accessed by the other parts of the application using "require"
  module.exports = {
    displayName,
  };