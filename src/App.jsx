
import { RouterProvider } from 'react-router-dom'
import './App.css'
import MyProvider from './provider/MyProvider'
import { router } from './router/Router'

const App = () => {


  return (
    <>
      <MyProvider>
        <RouterProvider router={router}></RouterProvider>
      </MyProvider>
    </>
  )
}

export default App
