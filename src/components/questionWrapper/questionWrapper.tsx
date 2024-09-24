import React from 'react'
import { YesButton } from '../buttons/yesButton'
import { NoButton } from '../buttons/noButton'

interface QuestionWrapperProps {
    question: string,
    setToYes: () => void,
    setToNo: () => void,
}

export const QuestionWrapper = (props: QuestionWrapperProps) => {
  return (
    <div className='w-full py-4 bg-[#2C2C2C]/80 rounded-xl shadow-lg shadow-black/60 flex items-center justify-between gap-3 px-4'>
        <p className='text-white text-sm'>{props.question}</p>
        <div className='flex gap-2.5 w-1/4'>
            <YesButton setGejala={props.setToYes}/>
            <NoButton setGejala={props.setToNo}/>
        </div>
    </div>
  )
}
