// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeaturesData from '../src/data/features_home.json'
import AccountData from '../src/data/accounts_data.json'
import Home from './pages/home/home'
import SignIn from './pages/sign-in/sign-in'
import User from './pages/user/user'
import { Provider } from 'react-redux'
import store from './redux/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserSuccess } from './redux/slice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token) {
      dispatch(loginUserSuccess(token))
    }
  }, [dispatch])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home featuresData={FeaturesData} />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User accountData={AccountData} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
