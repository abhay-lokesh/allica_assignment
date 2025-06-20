// @ts-nocheck
import type { Primitive } from "~/types/common.type";

export const urlDestructure = (url: string) => {
  const segments = new URL(url).pathname.split("/");
  const last = segments.pop() || segments.pop();
  return last;
};

export const nullCheck = (val: any) => [null, undefined].includes(val);

export const keySplitter = (key: string | string[]) => {
  if (!key) {
    return null;
  }
  if (arrayCheck(key as string[])) {
    return key;
  }
  return (key as string).split(".").reverse();
};

export const treeTraversal = (obj: any, keys: string | string[]) => {
  const keysArr = keySplitter(keys);
  if (!["string", "boolean", "number", "object"].includes(typeof obj)) {
    return null;
  }
  if (
    nullCheck(keysArr) ||
    !arrayCheck(keysArr as string[]) ||
    !obj ||
    (obj && Object.keys(obj).length === 0)
  ) {
    return null;
  }
  if (keysArr && keysArr.length === 1) {
    return obj[keysArr[0]];
  }
  let currentKey = (keysArr as string[])?.pop();
  const newKeysArr =
    keysArr && arrayCheck(keysArr as string[]) ? [...keysArr] : keysArr;
  return treeTraversal(
    (obj && currentKey && obj[currentKey]) || null,
    newKeysArr
  );
};

export const arrayCheck = (arr: (Primitive | Object)[]) =>
  Array.isArray(arr) && arr.length > 0;

export const extractValues = <SubData>(data, properties): SubData | null => {
  let res = null;
  if (!arrayCheck(properties)) {
    res = data;
  } else {
    properties.forEach((property) => {
      res = res ? { ...res } : {};
      res[property] = treeTraversal(data, property);
    });
  }
  return res;
};

export const weightFormatter = (value) => `${value} kg`;

export const heightFormatter = (value) => `${value} cm`;

export const creditsFormatter = (value: string | null) =>
  value
    ? `${new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
        value
      )} credits`
    : value;
export const isPositiveFinite = (value) => Number.isFinite(Number(value));
