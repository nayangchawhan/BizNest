// src/utils/cosmosClient.js
import { CosmosClient } from "@azure/cosmos";

// Replace these with your own values
const endpoint = "https://biznestdb.documents.azure.com:443";
const key = "DnYYjRuqFkOunOLV4XcdmMhMuaxWI0AGTkOD4jvq0b7vdwAeK7E99BmfAL2i2tXKgrHvpQUGKrloACDbPBjTug==";
const client = new CosmosClient({ endpoint, key });

export const databaseId = "cosmicworks";
export const containerId = "users";

export default client;
