import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import { AssetsLoader } from '@tomb/assets-loader'

const al = new AssetsLoader({ type: 'font', urls: ['https://tomb-web.oss-cn-shanghai.aliyuncs.com/Bokor.ttf?versionId=CAEQORiBgIClm_PzkBgiIGUyZjJjNjFiMGNkNDQ5NTk5NzRlYzhlMjZjMTVhYmQy'] })
al.asyncStart()
  .then((fonts) => {
    AssetsLoader.commonFontLoadedCallback(fonts as FontFace[])
  })


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
)
