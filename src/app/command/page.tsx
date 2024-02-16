'use client';

import CommandArea from "@/components/CommandInputArea";
import InputHistoryPanel from "@/components/InputHistoryPanel";
import InputsHistoryContext from "@/contexts/InputsHistoryContext";
import { useState } from "react";

export default function Page() {
  const [history, setHistory] = useState<string[]>([])

  const addNewInput = (html: string) => {
    setHistory([...history, html])
  }

  return (
    <InputsHistoryContext.Provider value={
      {
        history: history,
        addNewInput: addNewInput
      }
    }>
      <InputHistoryPanel></InputHistoryPanel>
      <CommandArea />
    </InputsHistoryContext.Provider>
  )
}