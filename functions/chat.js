// functions/chat.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { message } = JSON.parse(event.body);
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are ShadowOps GPT, an expert in OSP fiber construction, project management, and Smartsheet workflows.' },
          { role: 'user', content: message }
        ]
      })
    });

    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: 'OpenAI error' }) };
    }

    const { choices } = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: choices[0].message.content })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
