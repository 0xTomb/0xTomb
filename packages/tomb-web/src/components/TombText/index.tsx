import React, { FC, PropsWithChildren } from 'react'
import styles from './style.module.less'
import classNames from 'classnames'
import { createPortal } from 'react-dom'
import { useRecoilState } from 'recoil'
import { homePageOnState } from '@/state'

type Props = {
  x: number
  y: number
  className?: string
}

const TombText: FC<PropsWithChildren<Props>> = ({ children, x, y, className }) => {
  return (
    <div
      className={classNames(styles.text, 'fixed', className)}
      style={{
        top: y,
        left: x
      }}
    >
      <b className="text-5xl text-neutral-700 font-medium">{children}</b>
    </div>
  )
}

export const createPortalTombText = (x: number, y: number, text: string) => {
  const [on] = useRecoilState(homePageOnState)
  const root = document.querySelector('#root') as HTMLElement
  return createPortal(
    <TombText
      x={x}
      y={y}
      className={classNames('-rotate-45 opacity-0 home-transition delay-1000 select-none', { 'opacity-100': on })}
    >
      {text}
    </TombText>,
    root
  )
}

export default TombText
