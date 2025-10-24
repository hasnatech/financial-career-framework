// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './pages/About'
import Contact from './pages/Contact'

import React from 'react'
// import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Option2 from './pages/Option2.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/option2', element: <Option2 /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
