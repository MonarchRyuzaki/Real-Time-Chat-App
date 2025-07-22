import { Client } from "cassandra-driver";
import path from "path";

let cassandraClient: Client | null = null;

export async function initializeCassandraClient(): Promise<Client> {
  if (cassandraClient) {
    return cassandraClient;
  }

  const clientId = process.env.ASTRA_DB_CLIENT_ID;
  const clientSecret = process.env.ASTRA_DB_CLIENT_SECRET;
  const keyspace = process.env.ASTRA_DB_KEYSPACE;
  if (!clientId || !clientSecret || !keyspace) {
    throw new Error(
      "Missing required environment variables: ASTRA_DB_CLIENT_ID, ASTRA_DB_CLIENT_SECRET, and ASTRA_DB_KEYSPACE"
    );
  }

  cassandraClient = new Client({
    cloud: {
      secureConnectBundle: path.join(
        process.cwd(),
        "secure-connect-my-cassandra-db.zip"
      ),
    },
    credentials: {
      username: clientId,
      password: clientSecret,
    },
    keyspace: keyspace,
  });

  await cassandraClient.connect();
  return cassandraClient;
}

export function getCassandraClient(): Client {
  if (!cassandraClient) {
    throw new Error(
      "Cassandra client not initialized. Call initializeCassandraClient() first."
    );
  }
  return cassandraClient;
}

export async function closeCassandraClient(): Promise<void> {
  if (cassandraClient) {
    await cassandraClient.shutdown();
    cassandraClient = null;
  }
}