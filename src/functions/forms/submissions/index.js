import 'dotenv/config';
const formId = '6477fb486fff6b00089301b2';
const accessToken = process.env.NETLIFY_API_KEY;

exports.handler = async function (event, context) {
  let result;
  await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${accessToken}`)
    .then(response => response.json())
    .then(submissions => {
      // Process the submissions
      result = submissions
    })
    .catch(error => {
      console.error('Error:', error);
      result = error;
    });
  return result;
};
