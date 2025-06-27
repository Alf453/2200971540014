export async function logEvent(stack, level, pkg, message) {
  const allowedStacks = ["frontend", "backend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const allowedPackages = [
    "auth",
    "config",
    "middleware",
    "utils", // shared
    "api",
    "component",
    "hook",
    "page",
    "state",
    "style", // frontend only
    "cache",
    "controller",
    "cron job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service", // backend only
  ];

  // Validate inputs
  if (!allowedStacks.includes(stack)) {
    console.error("Invalid stack:", stack);
    return;
  }
  if (!allowedLevels.includes(level)) {
    console.error("Invalid level:", level);
    return;
  }
  if (!allowedPackages.includes(pkg)) {
    console.error("Invalid package:", pkg);
    return;
  }

  const logBody = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(
      "http://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logBody),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("Logging failed:", result);
    } else {
      console.log("[Log Middleware]", result.message, "LogID:", result.logID);
    }
  } catch (error) {
    console.error("Logging API Error:", error);
  }
}
