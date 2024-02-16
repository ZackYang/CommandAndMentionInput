import { createContext, Dispatch, SetStateAction, useState } from "react";

function CreateInputsHistoryContext() {
  const inputsHistoryContext = createContext<{ history: string[], addNewInput: (html: string) => void }>(
    {
      history: [],
      addNewInput: (html) => { }
    }
  );
  return inputsHistoryContext
}

const InputsHistoryContext = CreateInputsHistoryContext()
export default InputsHistoryContext