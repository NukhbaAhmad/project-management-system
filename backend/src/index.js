import { connectDb, closeDb, exitProcesses } from "#utils";
import { envConfig } from "#config";
import app from "./app.js";

const startServer = (port, isFallback = false) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server: Connected port: ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      if (!isFallback) {
        console.log(
          `⚠️  Port ${port} is in use, trying fallback port ${envConfig.port.fallback_port}...`
        );
        startServer(envConfig.port.fallback_port, true);
      } else {
        console.error(
          `❌ Both ports are in use! Port ${port} is already occupied.`
        );
        process.exit(1);
      }
    } else {
      console.error("❌ Server error:", err);
      process.exit(1);
    }
  });

  exitProcesses(server, closeDb);
  return server;
};

const connectServers = async () => {
  try {
    await connectDb();
    console.log("✅ DB: Connected");
    startServer(envConfig.port.main_port);
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  }
};

connectServers();
