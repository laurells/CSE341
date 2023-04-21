displayName = (req, res) => {
    const data =
      'What is your name?';
    res.status(200).send(data);
  };
  
  module.exports = {
    displayName,
  };