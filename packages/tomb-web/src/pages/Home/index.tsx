import React, { ElementRef, FC, useRef, useState } from 'react'
import classNames from 'classnames'
import { Menu } from '@/components'
import styles from './style.module.less'
import GATE1 from './GATE1.png'
import DOOR from './DOOR.png'

const HomePage: FC = () => {
  const menuRef = useRef<ElementRef<typeof Menu>>(null)
  const hotZoneRef = useRef<HTMLDivElement>(null)

  const [on, setOn] = useState(false)

  const handleEnterHotZone = () => {
    if (!on) {
      setOn(true)
      menuRef.current?.slideMenu()
      hotZoneRef.current?.removeEventListener('mouseenter', handleEnterHotZone)
    }
  }

  return (
    <div className={classNames(styles.home, 'h-screen', 'w-screen')}>
      <Menu ref={menuRef} />
      <div
        className="w-10/12 h-4/5 absolute absolute-screen-center z-10"
        ref={hotZoneRef}
        onMouseEnter={handleEnterHotZone}
      ></div>
      <div className="absolute bottom-5 left-8 flex items-end">
        <img src={GATE1} alt="gate1" className="w-48 h-3/5" />
        <img
          src={DOOR}
          style={on ? { transform: 'rotateY(-90deg)' } : {}}
          alt="door"
          className="w-[32rem] h-[40rem] origin-left transition-all duration-[2000ms] transform-gpu"
        />
      </div>
      <main
        style={on ? { top: '50%', opacity: 1 } : {}}
        className="absolute text-5xl font-bold absolute-screen-center transition-all transform-gpu top-16 duration-[2000ms] opacity-0"
      >
        WELCOME TO 0XTOMB
      </main>
      <div className="absolute bottom-5 right-8 flex transform -scale-x-[1] items-end">
        <img src={GATE1} alt="gate1" className="w-48 h-1/2" />
        <img
          src={DOOR}
          alt="door"
          style={on ? { transform: 'rotateY(-90deg)' } : {}}
          className="w-[32rem] h-[40rem] origin-left transition-all duration-[2000ms] transform-gpu"
        />
      </div>
    </div>
  )
}

export default HomePage
