// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({ region: 'ap-south-1', accessKeyId: 'AKIA3U7K56MHJA3C5X5G',
 secretAccessKey: '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' });

async function message(smsType, sendToNumber, messageText, sendID) {
    // Create SMS Attribute parameter you want to get
    var params = {
        Message: messageText,
        PhoneNumber: sendToNumber
    };
    // Create promise and SNS service object
    var sns = new AWS.SNS({apiVersion: 'latest'});
    const snsAttr = await sns.setSMSAttributes({ attributes: { DefaultSMSType: smsType }}).promise();

    // Handle promise's fulfilled/rejected states
    const smsRes = await sns.publish(params).promise();
    return Promise.resolve(smsRes);
}

module.exports = async (smsType, sendToNumber, sendMessage, sendID) => {
   const snsRes = await message(smsType, sendToNumber, sendMessage, sendID);
   return Promise.resolve(snsRes);
}
//https://www.sciencedirect.com/topics/computer-science/forward-lookup-zone#:~:text=There%20are%20two%20main%20categories,IP%20addresses%20to%20host%20names.





//Taqu2478123
