import React, { ElementRef, FC, useRef } from 'react'
import classNames from 'classnames'
import { Menu } from '@/components'
import styles from './style.module.less'

const HomePage: FC = () => {
  const menuRef = useRef<ElementRef<typeof Menu>>(null)

  return (
    <div className={classNames(styles.home, 'h-screen', 'w-screen')}>
      <Menu ref={menuRef} />
      <div
        className="w-10/12 h-4/5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        onMouseEnter={() => menuRef.current?.slideMenu()}
      ></div>
    </div>
  )
}

export default HomePage
