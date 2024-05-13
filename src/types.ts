export interface InitOptions {
  concurent: number;
  source: string;
  output: string;
}

export enum Status {
  UNGERISTERED = "Free",
  REGISTERED = "Registered",
}

export interface WhoisStatus {
  domain: string;
  status: Status;
}

export interface WorkerSignature {
  domain: string;
}
