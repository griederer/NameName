import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: number
}

export const BabyIcon: React.FC<IconProps> = ({ className = '', size = 24, ...props }) => {
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
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11V22H11V11C9.9 11 9 10.1 9 9V7.5L3 7V9H1V5C1 4.4 1.4 4 2 4H22C22.6 4 23 4.4 23 5V9H21Z" />
    </svg>
  )
}
