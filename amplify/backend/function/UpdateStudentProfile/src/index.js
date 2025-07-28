const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "FuturePathUsers";

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const userId = body.userId;
    const profile = body.profile;

    if (!userId) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ error: "Missing ID in request." }),
      };
    }

    const updateParams = {
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression: "set #profile = :profile",
      ExpressionAttributeNames: {
        "#profile": "profile",
      },
      ExpressionAttributeValues: {
        ":profile": profile,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const result = await docClient.update(updateParams).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Profile updated successfully",
        updated: true,
        result,
      }),
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ error: "Failed to update profile." }),
    };
  }
};

