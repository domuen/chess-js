import { ColumnString } from "../types";

const letterArray: ColumnString[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

const mathLetter = (letter: ColumnString, operator: "+" | "-", amount: number = 1) => {
  const add = operator === "+";

  const index = letterArray.indexOf(letter);
  // return letterArray.splice(add ? (index + amount) : (index - amount), 1);
  return letterArray[add ? (index + amount) : (index - amount)];
}

export default mathLetter;
