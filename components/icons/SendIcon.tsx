import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: number
}

export const SendIcon: React.FC<IconProps> = ({ className = '', size = 24, ...props }) => {
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
      <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" />
    </svg>
  )
}
