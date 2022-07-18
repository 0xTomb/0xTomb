import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'

import styles from './style.module.less'

type RefFunc = {
  slideMenu: () => void
}

const Menu = forwardRef<RefFunc>((props, ref) => {
  const menuRef = useRef<HTMLMenuElement>(null)

  useImperativeHandle(ref, () => ({
    slideMenu: () => {
      menuRef.current?.classList.add('!top-0')
    }
  }))

  return (
    <menu
      className={classNames(
        styles.menu,
        'text-[#d9d2c0] w-full bg-neutral-800 h-12 px-3 absolute flex items-center transition-top duration-[2000ms] top-[-32px]'
      )}
      ref={menuRef}
    >
      <ul className={classNames(styles['left-menu'], 'flex h-full')}>
        <li className="text-xl font-bold leading-12 shrink-0">HOME</li>
        <li className="text-xl font-bold leading-12 shrink-0">EPITAPH</li>
        <li className="text-xl font-bold leading-12 shrink-0">MY TOMBS</li>
        <li className="text-xl font-bold leading-12 shrink-0">DOCS</li>
      </ul>
      <header className={classNames(styles.header, 'text-2xl leading-12 absolute left-1/2 -translate-x-1/2')}>
        0XTOMBS
      </header>
      <ul className={classNames(styles['right-menu'], 'flex h-full space-x-5 ml-auto')}>
        <li className="font-bold leading-12 shrink-0">CONNECT WALLET</li>
        <li className="font-bold leading-12 shrink-0">TWITTER</li>
        <li className="font-bold leading-12 shrink-0">OPENSEA</li>
        <li className="font-bold leading-12 shrink-0">DISCORD</li>
        <li className="font-bold leading-12 shrink-0">ETHERSCAN</li>
      </ul>
      <i className="iconfont icon-caidan text-xl hidden font-bold leading-12 ml-auto" />
    </menu>
  )
})

export default Menu
