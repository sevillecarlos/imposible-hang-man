import { API } from "./config";

export const getWord = async () => {
  const res = await fetch(API);
  const [data] = await res.json();
  return data;
};
