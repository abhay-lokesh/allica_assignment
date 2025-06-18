import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchResponse } from "~/types/http.type";
import { arrayCheck, nullCheck } from "./common";

export const fetchData = <T>(url: string): Promise<FetchResponse<T>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const api = await fetch(url);
      if (api.status === 200) {
        const response = await api.json();
        resolve({ response, status: "SUCCESS" });
      }
    } catch (error) {
      reject({ response: null, message: error });
    }
  });
};

export const reactQueriesExtractor = <DataType>(
  arr: UseQueryResult[],
  extractorFn?: Function
): Array<DataType> => {
  let res: DataType[] = [];
  if (arrayCheck(arr)) {
    arr.forEach((item) => {
      const value: DataType = reactQueryExtractor(item, extractorFn);
      if (!nullCheck(value)) {
        res.push(value);
      }
    });
  }
  return res;
};

export const reactQueryExtractor = <DataType>(
  result: UseQueryResult,
  extractorFn?: Function
): DataType => {
  let res = null;
  if (
    !nullCheck(result) &&
    result?.status === "success" &&
    !nullCheck(result?.data)
  ) {
    res = extractorFn
      ? extractorFn((result?.data as FetchResponse<DataType>)?.response)
      : result;
  }
  return res;
};

export const apiDataExtractor = <DataType>(res, extractorFn): DataType => {
  let val = null;
  if (res?.status === "SUCCESS") {
    val = extractorFn ? extractorFn(res?.response) : res?.response;
  }
  return val;
};
