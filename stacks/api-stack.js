import * as sst from "@serverless-stack/resources";
import { HttpMethod } from "@aws-cdk/aws-apigatewayv2";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "api", {
      cors: {
        allowMethods: [HttpMethod.GET],
      },
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
      defaultAuthorizationType: "AWS_IAM",
      routes: {
        "POST /notes": "src/create.main",
        "GET /notes/{id}": "src/get.main",
        "GET /notes": "src/list.main",
        "PUT /notes/{id}": "src/update.main",
        "DELETE /notes/{id}": "src/delete.main",
        "POST /billing": "src/billing.main",
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
