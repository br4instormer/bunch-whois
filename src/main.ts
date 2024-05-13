import App from "./app";
import gracefulShutdown from "./gshutdown";
import argv from "./argv";

async function bootstrap(app: App): Promise<App> {
  // @ts-expect-error argvs somewhat not typizing after export
  const concurent: number = argv.concurent;
  // @ts-expect-error argvs somewhat not typizing after export
  const source: string = argv.source;
  // @ts-expect-error argvs somewhat not typizing after export
  const output: string = argv.output;

  gracefulShutdown(() => {
    console.warn("Application interrupting");
    console.warn("Prepairing to quit");

    app.stop().then(() => {
      console.warn("Quit");

      process.exit(0);
    });
  });

  await app.init({ concurent, source, output });
  await app.start();
  await app.finalize();

  return app;
}

export const boot = bootstrap(new App());
