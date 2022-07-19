import React, { ElementRef, FC, useRef, useState } from 'react'
import classNames from 'classnames'
import { Button, Menu } from '@/components'
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
      <div
        className={classNames(
          'absolute bottom-5 left-8 flex items-end select-none w-3/4 h-3/4 pointer-events-none transition-all duration-1000 delay-1000',
          { 'opacity-0': on }
        )}
      >
        <img src={GATE1} alt="gate1" className="w-2/12 h-full" />
        <img
          src={DOOR}
          style={on ? { transform: 'rotateY(-85deg)' } : {}}
          alt="door"
          className="w-5/12 h-full origin-left transition-all duration-[2000ms] transform-gpu"
        />
      </div>
      <main
        style={on ? { top: '35%', opacity: 1 } : {}}
        className="absolute left-1/2 -translate-x-1/2 top-1 transition-all transform-gpu duration-[2000ms] opacity-0 z-10 w-fit border-8 px-3 py-3 border-neutral-800 bg-[#D9D2C0]"
      >
        <div className="border-4 border-neutral-800 px-16 py-8 text-8xl font-bold bg-[#D9D2C0]">WELCOME TO 0XTOMB</div>
      </main>
      <div
        className={classNames(
          'absolute bottom-5 right-8 flex transform -scale-x-[1] items-end select-none w-3/4 h-3/4 pointer-events-none transition-all duration-1000 delay-1000',
          {
            'opacity-0': on
          }
        )}
      >
        <img src={GATE1} alt="gate1" className="w-2/12 h-full" />
        <img
          src={DOOR}
          alt="door"
          style={on ? { transform: 'rotateY(-85deg)' } : {}}
          className="w-5/12 h-full origin-left transition-all duration-[2000ms] transform-gpu"
        />
      </div>

      <main
        className={classNames(
          'absolute bottom-[160px] left-1/2 -translate-x-1/2 transition-all duration-[2000ms] opacity-0',
          { 'opacity-100': on }
        )}
      >
        <Button>
          <span className={classNames(styles['btn-text'], 'text-2xl text-white')}>R . I . P</span>
        </Button>
      </main>
    </div>
  )
}

export default HomePage
