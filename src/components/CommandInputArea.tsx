'use client'

import React, { useContext, useState } from 'react'
import CommandSelector from './CommandSelector'
import { CommandType } from '@/lib/types/command'
import InputsHistoryContext from '@/contexts/InputsHistoryContext'

export default function CommandArea() {
  const [cmdString, setCmdString] = useState('')
  const { history, addNewInput } = useContext(InputsHistoryContext)

  const editableRef = React.createRef<HTMLInputElement>()

  const saveCaretPosition = () => {
    const context = editableRef.current
    const selection = window.getSelection();
    if (!context || !selection) return

    const range = selection.getRangeAt(0);
    range.setStart(context, 0);
    const len = range.toString().length;

    return () => {
      const pos = getTextNodeAtPosition(context, len);
      selection.removeAllRanges();
      var range = new Range();
      range.setStart(pos.node, pos.position);
      selection.addRange(range);
    }
  }

  const getTextNodeAtPosition = (root: HTMLInputElement, index: number) => {
    const NODE_TYPE = NodeFilter.SHOW_TEXT;
    const treeWalker = document.createTreeWalker(root, NODE_TYPE, function next(elem) {
      if (elem && elem.textContent && index > elem.textContent.length) {
        index -= elem?.textContent ? elem.textContent.length : 0;
        return NodeFilter.FILTER_REJECT
      }
      return NodeFilter.FILTER_ACCEPT;
    });

    const c = treeWalker.nextNode();

    return {
      node: c ? c : root,
      position: index
    };
  }

  const processInputContent = () => {
    const restore = saveCaretPosition()
    const input = editableRef.current?.innerText

    const newHTML = processCmdsAndMentionsStrings(input || '')
    if (editableRef.current) {
      editableRef.current.innerHTML = newHTML
    }

    restore && restore()
  }

  const processCmdsAndMentionsStrings = (content: string) => {
    if (content) {
      let newInnerHtml = content.replace(/(\/\w*)/g, '<b class="text-pink-600">$&</b>')
      newInnerHtml = newInnerHtml.replace(/(@\w*)/g, '<b class="text-teal-500">$&</b>')
      return newInnerHtml
    }

    return ''
  }

  const handleCmdOrMentionInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && editableRef.current) {
      e.preventDefault()
      const html = processCmdsAndMentionsStrings(editableRef.current.innerText)
      addNewInput(html)
      editableRef.current.innerHTML = ''
      editableRef.current.focus()
      setCmdString('')
      return
    }

    processInputContent()
    inputtingCmd()
  }

  const inputtingCmd = () => {
    const input = editableRef.current?.innerText || ''
    const cmdStrings = input.match(/^(\/\w*)/g)
    if (cmdStrings) {
      const cmd = cmdStrings[0]
      setCmdString(cmd)
    } else {
      setCmdString('')
    }
  }

  const handleCmdSelect = (cmd: CommandType) => {
    const input = editableRef.current
    if (input) {
      input.innerHTML = `/${cmd.name}`
      setCmdString(`/${cmd.name}`)
      input.focus()
      processInputContent()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-200">
      <div className="w-full">
        <CommandSelector cmdString={cmdString} onCommandSelect={
          handleCmdSelect
        } />
        <div
          ref={editableRef}
          id="command"
          onKeyUp={
            (e) => {
              handleCmdOrMentionInput(e as React.KeyboardEvent<HTMLDivElement>)
            }
          }
          contentEditable={true}
          className="w-full h-64 p-2 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-200 focus:outline-none"
        >
        </div>
        <div className="text-gray-500 text-sm p-1">
          Please input a command or mention someone;
          You can type <b>/</b> to see available commands;
          Use <b>@</b> to mention someone;
          Press &apos;Enter&apos; to send the message
        </div>
      </div>
    </div>
  )
}
