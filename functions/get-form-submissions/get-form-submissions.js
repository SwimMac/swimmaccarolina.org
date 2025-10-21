const formId = '6477fb486fff6b00089301b2';
const accessToken = process.env.NETLIFY_API_KEY;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const response = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${accessToken}`);
    if (!response.ok) {
      throw new Error(`Unsuccessful request: ${response.statusText}`);
    }

    const result = await response.json();

    if (Array.isArray(result)) {
      const parseDate = (submission) => {
        if (!submission) {
          return 0;
        }

        const { data = {}, human_fields = {} } = submission;
        const dateValue =
          data.last_edit_date ||
          data.last_edit ||
          data.lastEdited ||
          data.last_updated ||
          data.lastUpdated ||
          human_fields['Last Edit Date'] ||
          human_fields['Last Edit'] ||
          human_fields['Last Updated'] ||
          human_fields['Last updated'] ||
          human_fields['Last edit'] ||
          human_fields['Updated'] ||
          human_fields['Updated At'] ||
          submission.updated_at ||
          submission.created_at;

        const timestamp = Date.parse(dateValue);

        return Number.isNaN(timestamp) ? 0 : timestamp;
      };

      result.sort((a, b) => parseDate(b) - parseDate(a));
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
