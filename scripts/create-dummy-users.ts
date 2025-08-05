import { logger } from "../src/utils/logger";

async function createDummyUsers() {
  try {
    console.log("🚀 Starting dummy user creation...");

    const password = "password"; // Meets minimum 6 character requirement
    const baseUrl = "http://localhost:3000/api/auth/register";

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    console.log("👥 Creating 100 dummy users...");

    // Create users sequentially to avoid overwhelming the server
    for (let i = 1; i <= 100; i++) {
      const username = `new_user${i}`;

      try {
        console.log(`⏳ Creating user ${i}/100: ${username}`);

        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = (await response.json()) as any;

        if (response.ok) {
          successCount++;
          console.log(`✅ Created ${username}`);
        } else if (response.status === 409) {
          // User already exists
          skipCount++;
          console.log(`⏭️  Skipped ${username} (already exists)`);
        } else {
          errorCount++;
          console.log(
            `❌ Failed to create ${username}: ${data.error || "Unknown error"}`
          );
        }
      } catch (error) {
        errorCount++;
        console.log(
          `❌ Network error creating ${username}:`,
          error instanceof Error ? error.message : "Unknown error"
        );
      }

      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log("\n📊 Summary:");
    console.log(`✅ Successfully created: ${successCount} users`);
    console.log(`⏭️  Skipped (already exist): ${skipCount} users`);
    console.log(`❌ Failed: ${errorCount} users`);
    console.log(
      `🎯 Total processed: ${successCount + skipCount + errorCount}/100`
    );
  } catch (error) {
    console.error("❌ Error creating dummy users:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createDummyUsers()
    .then(() => {
      console.log("🎉 Dummy user creation completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Script failed:", error);
      process.exit(1);
    });
}

export { createDummyUsers };
