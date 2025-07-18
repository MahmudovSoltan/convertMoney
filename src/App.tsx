import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ConvertBody from './components/ConvertBody'
const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <ConvertBody />

      </BrowserRouter>
    </div>
  )
}

export default App