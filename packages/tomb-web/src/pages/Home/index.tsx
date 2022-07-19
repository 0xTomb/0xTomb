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
    <div className="h-screen w-screen">
      <div
        className={classNames(styles.bg, 'absolute h-screen w-screen transition-all duration-[2000ms]', {
          invisible: on
        })}
      ></div>
      <div className={classNames(styles.bg2, 'absolute h-screen w-screen', { hidden: !on })}></div>
      <Menu ref={menuRef} />
      <div
        className={classNames('w-10/12 h-4/5 absolute absolute-screen-center z-20', { hidden: on })}
        ref={hotZoneRef}
        onMouseEnter={handleEnterHotZone}
      ></div>
      <div className="absolute bottom-5 left-8 flex items-end select-none w-3/4 h-3/4">
        <img src={GATE1} alt="gate1" className="w-2/12 h-full" />
        <img
          src={DOOR}
          style={on ? { transform: 'rotateY(-85deg)' } : {}}
          alt="door"
          className="w-5/12 h-full origin-left transition-all duration-[2000ms] transform-gpu"
        />
      </div>
      <main
        style={on ? { top: '50%', opacity: 1 } : {}}
        className="absolute text-8xl font-bold absolute-screen-center transition-all transform-gpu top-16 duration-[2000ms] opacity-0 z-10 w-fit"
      >
        WELCOME TO 0XTOMB
      </main>
      <div className="absolute bottom-5 right-8 flex transform -scale-x-[1] items-end select-none w-3/4 h-3/4">
        <img src={GATE1} alt="gate1" className="w-2/12 h-full" />
        <img
          src={DOOR}
          alt="door"
          style={on ? { transform: 'rotateY(-85deg)' } : {}}
          className="w-5/12 h-full origin-left transition-all duration-[2000ms] transform-gpu"
        />
      </div>
    </div>
  )
}

export default HomePage
