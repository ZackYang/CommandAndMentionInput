'use client'

import React, { useEffect, useState } from 'react'
import { commands } from '../lib/commands'
import { CommandType } from '@/lib/types/command'

export default function CommandSelector({
  cmdString,
  onCommandSelect
}: {
  cmdString: string,
  onCommandSelect?: (cmd: CommandType) => void
}) {
  const [filteredCommands, setFilteredCommands] = useState<CommandType[]>([])

  useEffect(() => {
    if (cmdString === '') {
      setFilteredCommands([])
      return
    }

    if (cmdString.match(/^\//)) {
      const cmdName = cmdString.slice(1)

      if (cmdName === '') {
        setFilteredCommands(commands)
        return
      }
      const filtered = commands.filter(cmd => cmd.name.includes(cmdName))
      setFilteredCommands(filtered)
    }
  }, [cmdString])

  if (cmdString) {
    return (
      <div className="flex flex-col gap-2 p-2">
        {
          filteredCommands.map((cmd, i) => {
            return (
              <div key={i} className="flex flex-row gap-1 cursor-pointer hover:bg-gray-100" onClick={
                () => {
                  onCommandSelect && onCommandSelect(cmd)
                }
              }>
                <div className="text-bold text-pink-500">/{cmd.name} <span className='text-gray-800'>{cmd.usage}</span></div>
                <div className="text-gray-500">{cmd.description}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return null
}