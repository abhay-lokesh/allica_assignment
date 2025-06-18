export type Status = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";
export type FetchResponse<T> = {
  status: Status;
  response: T;
  message?: string;
};
