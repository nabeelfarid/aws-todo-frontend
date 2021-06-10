const awsmobile = {
  aws_appsync_region: "us-east-2", // (optional) - AWS AppSync region
  aws_appsync_graphqlEndpoint:
    "https://cs3a7p37dffy3csbh5bmhea4jq.appsync-api.us-east-2.amazonaws.com/graphql", // (optional) - AWS AppSync endpoint
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS", // (optional) - Primary AWS AppSync authentication type

  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_DII6X8Ply",
    userPoolWebClientId: "1p895kt0qtqa5rn2bk48l6r5q0",
  },
};

export default awsmobile;
