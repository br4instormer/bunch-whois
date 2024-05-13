import { WriteStream } from "node:fs";
import { CsvFormatterStream, Row, format } from "@fast-csv/format";

export default class<I extends Row, O extends Row> {
  private stream: CsvFormatterStream<Row, Row>;

  public constructor(
    writeStream: WriteStream,
    headers: boolean | string[] = false,
    delimiter: string = ";",
  ) {
    const stream = (this.stream = format<I, O>({
      headers,
      delimiter,
      quote: true,
      objectMode: true,
    }));

    stream.pipe(writeStream);
  }

  public async append(data: O[]): Promise<void> {
    data.forEach((row) => this.stream.write(row));
  }

  public end(): void {
    this.stream.end();
  }
}
