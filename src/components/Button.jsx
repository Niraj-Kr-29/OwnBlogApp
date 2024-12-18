import React from 'react'

const Button = ({
    children, 
    type = 'button',
    bgColor = 'bg-customOrange',
    textColor = 'text-white',
    className = '',
    ...props

}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button