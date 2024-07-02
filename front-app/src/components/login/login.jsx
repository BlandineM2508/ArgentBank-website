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

  // Déclaration des états locaux pour gérer les entrées de formulaire et les messages d'erreur
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  //Ajout des fonctions "handleEmailChange" et "handlePasswordChange" permettant la mise à jour des états.
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user')
    }
  }, [isAuthenticated, navigate])

  // Ajout de la fonction "handleAuth" pour envoyer à l'API les données d'authentification en utilisant la valeur actuelle des états.
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
        console.log("Réponse de l'API :", data)
        dispatch(loginUserSuccess(data.body.token))
        console.log('Connexion réussie !')
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

  useEffect(() => {
    // Vérifiez la présence du token dans localStorage
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(loginUserSuccess(token))
    }
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user')
      console.log('Token présent')
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
