import { HTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  isCurrent?: boolean
  isActive?: boolean
}

export function Box({ children, isCurrent, isActive }: BoxProps) {
  const boxClassNames = clsx(
    styles.container,
    {
      [styles.active]: isActive,
      [styles.current]: isCurrent
    }
  )

  return (
    <div className={boxClassNames}>
      {children}
    </div>
  )
}
