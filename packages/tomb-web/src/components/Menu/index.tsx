import React, { forwardRef, useImperativeHandle, useState } from 'react'
import classNames from 'classnames'

import styles from './style.module.less'

type RefFunc = {
  slideMenu: () => void
}

const Menu = forwardRef<RefFunc>((props, ref) => {
  const [menuSlide, setMenuSlide] = useState(false)

  useImperativeHandle(ref, () => ({
    slideMenu: () => {
      setMenuSlide(true)
    }
  }))

  return (
    <menu
      className={classNames(
        styles.menu,
        'w-full bg-neutral-800 h-12 px-3 absolute flex items-center transition-top duration-[2000ms]'
      )}
      style={menuSlide ? { top: 0 } : {}}
    >
      <ul className="flex h-full space-x-5">
        <li className="text-xl font-bold leading-12 shrink-0">+ HOME</li>
        <li className="text-xl font-bold leading-12 shrink-0">+ EPITAPH</li>
        <li className="text-xl font-bold leading-12 shrink-0">+ MY TOMBS</li>
        <li className="text-xl font-bold leading-12 shrink-0">+ DOCS</li>
      </ul>
      <header className={classNames(styles.header, 'text-xl relative leading-12 mx-auto')}>0XTOMBS</header>
      <ul className="flex h-full space-x-5">
        <li className="text-xs font-bold leading-12 shrink-0">CONNECT WALLET</li>
        <li className="text-xs font-bold leading-12 shrink-0">TWITTER</li>
        <li className="text-xs font-bold leading-12 shrink-0">OPENSEA</li>
        <li className="text-xs font-bold leading-12 shrink-0">DISCORD</li>
        <li className="text-xs font-bold leading-12 shrink-0">ETHERSCAN</li>
      </ul>
    </menu>
  )
})

export default Menu
