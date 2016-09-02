var AWS = require('aws-sdk');
var CfnLambda = require('cfn-lambda');

var cognito = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});

var Create = function(params, reply) {
  cognito.setIdentityPoolRoles(params, function(err, data) {
    if (err) {
      reply(err);
    } else  {
      reply(null, params.IdentityPoolId + "/roles");
    }
  });
};

var Update = function(physicalId, params, oldParams, reply) {
  cognito.setIdentityPoolRoles(params, function(err, data) {
    if (err) {
      console.error(err);
      reply(err);
    } else {
      reply(null, physicalId);
    }
  });
};

var Delete = function(physicalId, params, reply) {
  var p = {
    IdentityPoolId: params.IdentityPoolId,
    Roles: {}
  };
  cognito.setIdentityPoolRoles(p, function(err, data) {
    if (err) console.error(err)
    reply(err, physicalId);
  });
};

exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
