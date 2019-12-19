require('dotenv/config');

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
});

const ses = new AWS.SES();

const params = {
  "Template": {
    "TemplateName": "MyTemplate",
    "SubjectPart": "Greetings, {{name}}!",
    "HtmlPart": "<h1>Hello {{name}},</h1><p>Your favorite animal is {{favoriteanimal}}.</p>",
    "TextPart": "Dear {{name}},\r\nYour favorite animal is {{favoriteanimal}}."
  }
}

ses.createTemplate(params, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
});
