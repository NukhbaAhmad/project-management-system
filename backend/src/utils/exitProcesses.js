const exitProcesses = (server, closeDb) => {
  const exitHandler = async (exitCode) => {
    if (server && server.listening) {
      server.close(async () => {
        console.log("Terminating: Server closed.");
        await closeDb();
        process.exit(exitCode);
      });
    } else {
      await closeDb();
      process.exit(exitCode);
    }
  };

  const signalExit = (signal) => {
    console.log(`Signal received: ${signal}`);
    exitHandler(0);
  };

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    exitHandler(1);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    exitHandler(1);
  });

  process.on("SIGINT", () => signalExit("SIGINT"));
  process.on("SIGTERM", () => signalExit("SIGTERM"));
};

module.exports = exitProcesses;
