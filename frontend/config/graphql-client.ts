// graphql-client.ts
import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:3000";

export const graphqlClient = new GraphQLClient(endpoint);
