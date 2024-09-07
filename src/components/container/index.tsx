import React from 'react'

type Props = {
    children: React.ReactElement[] | React.ReactElement
}

export const Container: React.FC<Props> = React.memo(({children}) => {
  return (
    <div className='flex gap-6 max-w-screen-xl mx-auto mt-12'>{ children }</div>
  )
})