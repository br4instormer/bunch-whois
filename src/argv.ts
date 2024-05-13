import yargs from "yargs";

export default yargs
  .usage("npm start -- -s './source.txt' -o './output.csv'")
  .options({
    concurent: {
      alias: "c",
      default: 5,
      description: "Number of concurent requests at same time",
      type: "number",
    },
    source: {
      alias: "s",
      default: "source.txt",
      description: "Set source file with domains",
      type: "string",
    },
    output: {
      alias: "o",
      default: "output.csv",
      description: "Set output file",
      type: "string",
    },
  })
  .version(false)
  .help("help").argv;
