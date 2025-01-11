import React from 'react'

function Button({text,bgColor,textColor}) {
  return (
    <div className={`bg-${bgColor} text-${textColor}`}>{text}</div>
  )
}

export default Button