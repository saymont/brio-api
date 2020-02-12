// Caso um dia seja necessário enviar email

require('dotenv/config');

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-east-1'
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const params = {
  "Source": process.env.EMAIL_OUTLOOK,
  "Template": "MyTemplate",
  // "ConfigurationSetName": "ConfigSet",
  "Destination": {
    "ToAddresses": [process.env.EMAIL_GMAIL
    ]
  },
  "TemplateData": "{ \"name\":\"Alejandro\", \"favoriteanimal\": \"alligator\" }"
}

ses.sendTemplatedEmail(params, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
});
