const validateRequest = (body, docTemplate) => {
  let result = {};

  for (let key in docTemplate) {
    if (key in body) {
      try {
        console.log(`Parsing ${key}: ${body[key]}`);
        if (docTemplate[key] === Date) {
          const parsed = Date.parse(body[key]);
          if (isNaN(parsed)) {
            throw new Error(parsed);
          } else {
            body[key] = new Date(body[key]);
          }
        } else if (typeof docTemplate[key] === 'function') {
          docTemplate[key](body[key]);
        }
        result[key] = body[key];
      } catch (e) {
        console.log(`Error validating field ${key}: ${e.message}`);
        return [false, `Incorrect data type: ${body[key]} was expecting: ${String(docTemplate[key]).split(" ")[1]} Error ${e}`];
      }
    } else if (docTemplate[key].required) {
      return [false, `Missing required field ${key}`];
    } else if (key === 'birthday' && !body[key]) {
      return [false, `Missing required field ${key}`];
    }
  }

  console.log("Request body validated successfully");
  return [true, result];
};

// Example docTemplate function that returns an object
const docTemplate = () => ({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: Date
});

module.exports = { validateRequest };