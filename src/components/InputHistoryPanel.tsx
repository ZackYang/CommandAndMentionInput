'use client'

import InputsHistoryContext from '@/contexts/InputsHistoryContext'
import React, { useContext } from 'react'
import parse from 'html-react-parser';

export default function InputHistoryPanel() {
  const { history } = useContext(InputsHistoryContext)
  return (
    <div className='flex flex-col'>
      {
        history.map((input, i) => {
          return (
            <div key={i} className="p-2">
              {parse(input)}
            </div>
          )
        })
      }
    </div>
  )
}