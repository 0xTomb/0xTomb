import React, { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Button, Layout } from '@/components'
import styles from './style.module.less'
import { useRecoilState } from 'recoil'
import { homePageOnState } from '@/state'
import { useTitle } from 'ahooks'
import { BG, BG2, DOOR, GATE1 } from '@/pages/Home/consts'

function loadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let image: HTMLImageElement | undefined = new Image()
    image.onload = () => {
      resolve(url)
      image = undefined
    }
    image.onerror = () => reject(url)
    image.src = url
  })
}

const HomePage: FC = () => {
  const [loading, setLoading] = useState(true)
  const [urls, setUrls] = useState<string[]>([])
  const hotZoneRef = useRef<HTMLDivElement>(null)
  const [on, setOn] = useRecoilState(homePageOnState)

  useTitle('0xTomb')
  useEffect(() => {
    console.time('image-load')
    Promise.all<string>([loadImage(GATE1), loadImage(DOOR), loadImage(BG), loadImage(BG2)]).then((urls) => {
      console.timeEnd('image-load')
      setLoading(false)
      setUrls(urls)
    })
  }, [])

  const handleEnterHotZone = () => {
    if (!on) {
      hotZoneRef.current?.removeEventListener('mouseenter', handleEnterHotZone)
      setOn(true)
    }
  }

  if (loading) {
    return <div className="absolute-screen-center">Loading ...</div>
  }

  return (
    <Layout>
      <div
        className={classNames('absolute h-screen w-screen home-transition  z-[-1]', {
          invisible: on
        })}
        style={{
          backgroundImage: `url(${urls[2]})`
        }}
      ></div>
      <div
        className={classNames(styles.bg2, 'absolute h-screen w-screen z-[-1]', { hidden: !on })}
        style={{ backgroundImage: `url(${urls[3]})` }}
      ></div>
      <div
        className={classNames('w-10/12 h-4/5 absolute absolute-screen-center z-20', { hidden: on })}
        ref={hotZoneRef}
        onMouseEnter={handleEnterHotZone}
      ></div>
      <div
        className={classNames(
          styles.left,
          'absolute bottom-5 left-8 flex items-end select-none w-3/4 h-3/4 pointer-events-none door-transition door-hidden-delay',
          { 'opacity-0': on }
        )}
      >
        <img src={urls[0]} alt="gate1" className="w-2/12 h-full" />
        <img
          src={urls[1]}
          style={on ? { transform: 'rotateY(85deg)' } : {}}
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
          styles.right,
          'absolute bottom-5 right-8 flex transform -scale-x-[1] items-end select-none w-3/4 h-3/4 pointer-events-none door-transition door-hidden-delay',
          {
            'opacity-0': on
          }
        )}
      >
        <img src={urls[0]} alt="gate1" className="w-2/12 h-full" />
        <img
          src={urls[1]}
          alt="door"
          style={on ? { transform: 'rotateY(85deg)' } : {}}
          className="w-[48%] h-full origin-left home-transition"
        />
      </div>

      <main
        className={classNames('absolute bottom-[180px] left-1/2 -translate-x-1/2 home-transition opacity-0', {
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
