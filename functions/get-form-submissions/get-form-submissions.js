const formId = '6477fb486fff6b00089301b2';
const accessToken = process.env.NETLIFY_API_KEY;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    let result;
    const response = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${accessToken}`);
    if (response.ok) {
      result = await response.json();
    } else {
      throw new Error(`Unsuccessful request: ${response.statusText}`);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    console.error('Problem!', error);
    return { statusCode: 500, body: error.toString() };
  }
}

module.exports = { handler }
