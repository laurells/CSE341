// The validateRequest function takes in the request body and a document template (docTemplate) for validation.
const validateRequest = (body, docTemplate) => {
  let result = {};

  // Iterate over each key in the document template
  for (let key in docTemplate) {
    // Check if the key exists in the request body
    if (key in body) {
      try {
        console.log(`Parsing ${key}: ${body[key]}`);

        // If the expected data type is Date, parse the value and convert it to a Date object
        if (docTemplate[key] === Date) {
          const parsed = Date.parse(body[key]);
          if (isNaN(parsed)) {
            throw new Error(parsed);
          } else {
            body[key] = new Date(body[key]);
          }
        }
        // If the expected data type is a custom function, call the function to perform additional validation
        else if (typeof docTemplate[key] === 'function') {
          docTemplate[key](body[key]);
        }
        
        // Store the validated value in the result object
        result[key] = body[key];
      } catch (e) {
        console.log(`Error validating field ${key}: ${e.message}`);
        // Return an error if the data type is incorrect
        return [false, `Incorrect data type: ${body[key]} was expecting: ${String(docTemplate[key]).split(" ")[1]} Error ${e}`];
      }
    }
    // If the key is required but missing in the request body, return an error
    else if (docTemplate[key].required) {
      return [false, `Missing required field ${key}`];
    }
    // If the key is 'birthday' and is not present in the request body, return an error
    else if (key === 'birthday' && !body[key]) {
      return [false, `Missing required field ${key}`];
    }
  }

  console.log("Request body validated successfully");
  return [true, result];
};

module.exports = { validateRequest };