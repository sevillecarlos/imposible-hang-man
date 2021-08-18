import { API } from "./config";

export const getWord = async () => {
  try {
    const res = await fetch(API);
    const [data] = await res.json();
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error)
    return {
      definition: "Calendar  ",
      word: "Hemerology",
    };
  }
};
