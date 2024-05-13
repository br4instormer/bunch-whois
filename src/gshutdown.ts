export default function gracefulShutdown(
  listener: NodeJS.BeforeExitListener,
): void {
  process.on("SIGTERM", listener);
  process.on("SIGINT", listener);
}
