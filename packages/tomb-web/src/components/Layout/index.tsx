import React, { FC, PropsWithChildren } from 'react'
import { createPortalTombText, Menu } from '@/components'
import { TOMB_TEXT_CONFIG } from '@/components/Layout/consts'

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
