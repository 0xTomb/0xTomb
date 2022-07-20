import React, { FC, Fragment, PropsWithChildren } from 'react'
import { createPortalTombText, Menu } from '@/components'
import { TOMB_TEXT_CONFIG } from '@/components/Layout/consts'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-screen w-screen">
      {TOMB_TEXT_CONFIG.map(({ x, y, text, key }) =>
        React.createElement(Fragment, { key }, createPortalTombText(x, y, text))
      )}
      <Menu />
      {children}
    </main>
  )
}

export default Layout
