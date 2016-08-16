console.log('Loading PutPaste function');

var crypto = require('crypto');
var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});
var TABLE_NAME = "ServerlessPastebin";

exports.handler = function(event, context) {
    var content = event.content;
    var key = exports.randomValue(10);
    console.log('key', key);

    var item = {
        "pid": {"S": key},
        "content": {"S": content}
    };
    dynamodb.putItem({
        "TableName": TABLE_NAME,
        "Item" : item
    }, function(err, data) {
        if (err) {
            context.fail('error','putting item into dynamodb failed: ' + err);
        } else {
            context.succeed(key);
        }
    });
};

var charsNumbers = '0123456789';
var charsLower = 'abcdefghijklmnopqrstuvwxyz';
var charsUpper = charsLower.toUpperCase();
var chars = charsNumbers + charsLower + charsUpper;

exports.randomValue = function(length) {
  length = length || 32;

  var string = '';

  while (string.length < length) {
    var bf = crypto.randomBytes(length);
    for (var i = 0; i < bf.length; i++) {
      var index = bf.readUInt8(i) % chars.length;
      string += chars.charAt(index);
    }
  }
  return string;
}
