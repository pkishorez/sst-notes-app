import { dynamodb } from "./util/dynamodb";
import { handler } from "./util/handler";

export const main = handler(async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamodb.query(params);

  return result.Items;
});
