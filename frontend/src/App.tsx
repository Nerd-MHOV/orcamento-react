import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import './app.scss'
import { PrivateRoute } from './pages/PrivateRoute'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Login />} />
            <Route path='home' element={<PrivateRoute><Home /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
