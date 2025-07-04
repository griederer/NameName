import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: number
}

export const ChatIcon: React.FC<IconProps> = ({ className = '', size = 24, ...props }) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM6 9H18V11H6V9ZM14 14H6V12H14V14ZM18 8H6V6H18V8Z" />
    </svg>
  )
}
