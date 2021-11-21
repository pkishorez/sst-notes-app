import { dynamodb } from "./util/dynamodb";
import { handler } from "./util/handler";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: "123",
      noteId: event.pathParameters.id,
    },
  };

  await dynamodb.delete(params);

  return { status: true };
});
