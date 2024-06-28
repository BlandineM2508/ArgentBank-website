import { useState } from 'react'
import '../sign-in/sign-in.scss'
import User from '../../../public/img/user.svg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser as apiLoginUser, fetchUserProfile } from '../../data/api.js'
import { loginUserSuccess } from '../../redux/slice.js'
import Header from '../../components/header/header'

const SignIn = () => {
  // Hooks pour dispatcher des actions Redux et pour la navigation
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Déclaration des états locaux pour gérer les entrées de formulaire et les messages d'erreur
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  // Gestionnaire de soumission du formulaire
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      // login en utilisant l'API
      const response = await apiLoginUser({ email, password })
      const { token } = response

      if (!token) {
        throw new Error('Token manquant')
      }

      // Stockage du token basé sur le souhait de l'utilisateur de se souvenir de la connexion
      if (rememberMe) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }

      try {
        // Récupération et stockage du profil utilisateur
        const userProfile = await fetchUserProfile(token)
        dispatch(loginUserSuccess({ user: userProfile, token }))
      } catch (err) {
        setError("Impossible de retrouver les détails de l'utilisateur.")
      }
      navigate('/user')
    } catch (err) {
      setError(
        err.message || "L'adresse mail ou le mot de passe n'est pas correct."
      )
    }
  }

  return (
    <div className="signInWrapper">
      <Header />
      <div className="formContainer">
        <div className="formWrapper">
          <img className="userIcon" src={User} alt="User icon" />
          <h2>Sign In</h2>
          {/* Icône utilisateur au-dessus du formulaire */}

          <form onSubmit={onSubmit}>
            {/* Champ de saisie pour l'email */}
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Champ de saisie pour le mot de passe */}
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Checkbox pour l'option "Se souvenir de moi" */}
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            {/* Bouton pour soumettre le formulaire */}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {/* Affichage conditionnel des messages d'erreur */}
          {error && <div className="errorForm">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default SignIn
