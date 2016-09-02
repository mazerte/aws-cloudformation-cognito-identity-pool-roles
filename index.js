var CfnLambda = require('cfn-lambda');
var AWS = require('aws-sdk');

var IdentityPoolRoles = require('./lib/identity-pool-roles');

function CognitoIdentityPoolRolesHandler(event, context) {
  var CognitoIdentityPoolRoles = CfnLambda({
    Create: IdentityPoolRoles.Create,
    Update: IdentityPoolRoles.Update,
    Delete: IdentityPoolRoles.Delete,
    SchemaPath: [__dirname, 'src', 'schema.json']
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);

  return CognitoIdentityPoolRoles(event, context);
}

function currentRegion(context) {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
}

exports.handler = CognitoIdentityPoolRolesHandler;
