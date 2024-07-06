import { useState, useEffect } from 'react'
import './login.scss'
import User from '../../assets/img/user.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  loginStart,
  loginUserSuccess,
  loginUserFailure,
} from '../../redux/slice.js'

const LogIn = () => {
  // Hooks pour dispatcher des actions Redux et pour la navigation
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // États locaux pour gérer les entrées de formulaire et les messages d'erreur
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) // Recuperation des infos dans le slice

  // Mise à jour de l'état des champs de formulaire
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  // Redirection vers la page utilisateur si authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user')
    }
  }, [isAuthenticated, navigate])

  // Gestion de l'authentification
  const handleAuth = (event) => {
    event.preventDefault()
    dispatch(loginStart())

    fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête')
        }
        return response.json()
      })
      .then((data) => {
        dispatch(loginUserSuccess(data.body.token))
        // Stockage du token basé sur le souhait de l'utilisateur de se souvenir de la connexion
        if (rememberMe) {
          localStorage.setItem('token', data.body.token)
        } else {
          sessionStorage.setItem('token', data.body.token)
        }
        navigate('/user')
      })
      .catch((error) => {
        console.log('Error while signin in :', error)
        dispatch(loginUserFailure())
        setLoginMessage({
          mainMessage: 'Failed authentication',
          additionalMessage: 'Verify your credentials.',
        })
      })
  }

  // Vérifie la présence du token dans le localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(loginUserSuccess(token))
    }
  }, [dispatch])

  // Redirection si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="signInWrapper">
      <div className="formContainer">
        <div className="formWrapper">
          <img className="userIcon" src={User} alt="User icon" />
          <h2>Sign In</h2>

          <form onSubmit={handleAuth}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            <div className="error">
              <p>{loginMessage.mainMessage}</p>
              <p>{loginMessage.additionalMessage}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn
