import { createWriteStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { Row } from "@fast-csv/format";
import { QueueObject, queue } from "async";
import { WhoisSearchResult, domain as whois } from "whoiser";
import { InitOptions, Status, WhoisStatus, WorkerSignature } from "./types";
import CSVFile from "./csv";

interface RowItem extends WhoisStatus {}

export default class App {
  private q: QueueObject<WorkerSignature>;
  private concurent: number;
  private domains: string[] = [];
  private csvFile: CSVFile<Row, RowItem>;

  private domainRegistered(data: WhoisSearchResult): boolean {
    for (const key of Object.getOwnPropertyNames(data)) {
      const whoisData = data[key];

      if (!whoisData) {
        continue;
      }

      if (
        !Array.isArray(whoisData) &&
        typeof whoisData === "object" &&
        Object.hasOwn(whoisData, "Domain Status")
      ) {
        const status = whoisData["Domain Status"];

        if (Array.isArray(status)) {
          return status.length > 0;
        }
      }
    }

    return false;
  }

  private async worker({ domain }: WorkerSignature): Promise<void> {
    const data = await whois(domain);
    const registered = this.domainRegistered(data);
    const status: Status = registered ? Status.REGISTERED : Status.UNGERISTERED;

    this.csvFile.append([{ domain, status }]);
  }

  public async init(options: InitOptions): Promise<this> {
    const { concurent, source, output } = options;
    const stream = createWriteStream(output, { encoding: "utf8", flags: "a+" });
    const headers = ["domain", "status"];

    this.csvFile = new CSVFile(stream, headers);
    this.concurent = concurent;
    this.domains = (await readFile(source, { encoding: "utf8" }))
      .split("\n")
      .filter((s) => !!s.trim());
    this.q = queue<WorkerSignature, Error>(
      this.worker.bind(this),
      this.concurent,
    );

    return this;
  }

  public async start(): Promise<this> {
    const { domains, q } = this;

    if (!domains?.length) {
      throw new Error("No domains passed");
    }

    domains.forEach((domain) =>
      q.push({
        domain,
      }),
    );

    if (!q.idle()) {
      await q.drain();
    }

    return this;
  }

  public async stop(): Promise<this> {
    if (!this.q.idle()) {
      this.q.kill();
    }

    this.csvFile.end();

    return this;
  }

  public async finalize(): Promise<this> {
    return this.stop();
  }
}
