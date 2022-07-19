import React, { FC, PropsWithChildren } from 'react'
import { createPortalTombText, Menu } from '@/components'

const TOMB_TEXT_CONFIG = [
  {
    x: 125,
    y: 140,
    text: 'LUNA',
    key: 1
  },
  {
    x: 820,
    y: 500,
    text: 'AZUKI',
    key: 2
  },
  {
    x: 590,
    y: 550,
    text: 'LUNA',
    key: 3
  },
  {
    x: 1180,
    y: 130,
    text: 'AZUKI',
    key: 4
  },
  {
    x: 1170,
    y: 680,
    text: 'AZUKI',
    key: 5
  }
]

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-screen w-screen">
      {TOMB_TEXT_CONFIG.map(({ x, y, text, key }) => (
        <div key={key}>{createPortalTombText(x, y, text)}</div>
      ))}
      <Menu />
      {children}
    </main>
  )
}

export default Layout
