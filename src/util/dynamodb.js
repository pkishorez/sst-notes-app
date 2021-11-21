import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export const dynamodb = {
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  get: (params) => client.get(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
