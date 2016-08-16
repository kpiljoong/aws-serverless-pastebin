ole.log('Loading GetPaste function');

var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});
var TABLE_NAME = "ServerlessPastebin";

exports.handler = function(event, context) {
    var id = event.id;

    dynamodb.getItem({
        "TableName": TABLE_NAME,
        "Key" : {
            "pid": {"S": id }
        }
    }, function(err, data) {
        if (err) {
            context.fail('error','getting item from dynamodb failed: ' + err);
        } else {
            context.succeed(data.Item.content.S);
        }
    });
};
