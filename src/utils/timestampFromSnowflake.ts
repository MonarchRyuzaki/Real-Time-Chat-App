import { EPOCH, TIMESTAMP_SHIFT } from "./snowflake";

export function getTimestampFromSnowflake(snowflake: string): Date {
  if (!snowflake || typeof snowflake !== "string") {
    throw new Error("Invalid snowflake provided");
  }

  // Convert the snowflake to a number
  const snowflakeNumber = BigInt(snowflake);

  // The first 42 bits represent the timestamp in milliseconds since epoch
  const timestamp = (snowflakeNumber >> BigInt(TIMESTAMP_SHIFT)) + BigInt(EPOCH);

  // Return the date object
  return new Date(Number(timestamp));
}
