import './App.css'
import { ToastContainer } from 'react-toastify'
import Header from './Components/Layout/Header/Header'
import Main from './Components/Layout/Main/Main'
import Menu from './Components/Layout/Menu/Menu'
import Footer from './Components/Layout/Footer/Footer'

function App() {

  return (
      <div className='App'>
        <Header/>
        <Menu/>
        <Main/>
        <Footer/>
        <ToastContainer/>
      </div>  
  )
}

export default App
