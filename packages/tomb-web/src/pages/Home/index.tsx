import React, { FC, useRef } from 'react'
import classNames from 'classnames'
import { Button, Layout } from '@/components'
import styles from './style.module.less'
import GATE1 from './GATE1.png'
import DOOR from './DOOR.png'
import { useRecoilState } from 'recoil'
import { homePageOnState } from '@/state'

const HomePage: FC = () => {
  const hotZoneRef = useRef<HTMLDivElement>(null)

  const [on, setOn] = useRecoilState(homePageOnState)

  const handleEnterHotZone = () => {
    if (!on) {
      setOn(true)
      hotZoneRef.current?.removeEventListener('mouseenter', handleEnterHotZone)
    }
  }

  return (
    <Layout>
      <div
        className={classNames(styles.bg, 'absolute h-screen w-screen home-transition  z-[-1]', {
          invisible: on
        })}
      ></div>
      <div className={classNames(styles.bg2, 'absolute h-screen w-screen z-[-1]', { hidden: !on })}></div>
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
          className="w-[48%] h-full origin-left home-transition"
        />
      </div>
      <main
        style={on ? { top: '30%', opacity: 1 } : {}}
        className="absolute left-1/2 -translate-x-1/2 top-1 home-transition opacity-0 z-10 w-fit border-8 px-3 py-3 border-neutral-800 bg-[#D9D2C0]"
      >
        <div className="border-4 border-neutral-800 px-12 py-6 text-8xl font-bold bg-[#D9D2C0]">WELCOME TO 0XTOMB</div>
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
          className="w-[48%] h-full origin-left home-transition"
        />
      </div>

      <main
        className={classNames('absolute bottom-[120px] left-1/2 -translate-x-1/2 home-transition opacity-0', {
          'opacity-100': on
        })}
      >
        <Button>
          <span className={classNames(styles['btn-text'], 'text-2xl text-white')}>R . I . P</span>
        </Button>
      </main>
    </Layout>
  )
}

export default HomePage
