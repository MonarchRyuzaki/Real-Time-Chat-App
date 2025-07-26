import { Client } from "cassandra-driver";
import path from "path";

let cassandraClient: Client | null = null;

export async function initializeCassandraClient(): Promise<Client> {
  try {
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

    try {
      const secureConnectPath = path.join(
        process.cwd(),
        "secure-connect-my-cassandra-db.zip"
      );

      cassandraClient = new Client({
        cloud: {
          secureConnectBundle: secureConnectPath,
        },
        credentials: {
          username: clientId,
          password: clientSecret,
        },
        keyspace: keyspace,
      });

      await cassandraClient.connect();
      console.log("✅ Cassandra client connected successfully");
      return cassandraClient;
    } catch (connectionError) {
      console.error("Failed to connect to Cassandra:", connectionError);
      cassandraClient = null;
      throw new Error(
        "Cassandra connection failed. Please check your credentials and secure connect bundle."
      );
    }
  } catch (error) {
    console.error("Error initializing Cassandra client:", error);
    throw error;
  }
}

export function getCassandraClient(): Client {
  try {
    if (!cassandraClient) {
      throw new Error(
        "Cassandra client not initialized. Call initializeCassandraClient() first."
      );
    }
    return cassandraClient;
  } catch (error) {
    console.error("Error getting Cassandra client:", error);
    throw error;
  }
}

export async function closeCassandraClient(): Promise<void> {
  try {
    if (cassandraClient) {
      await cassandraClient.shutdown();
      cassandraClient = null;
      console.log("📴 Cassandra client disconnected");
    }
  } catch (error) {
    console.error("Error closing Cassandra client:", error);
    cassandraClient = null;
    throw error;
  }
}
