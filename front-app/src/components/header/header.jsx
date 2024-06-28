import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../header/header.scss'
import { useSelector } from 'react-redux'
import Logo from '../../../public/img/argentBankLogo.png'
import User from '../../../public/img/user.svg'
import SignOut from '../../../public/img/logout.svg'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifiez l'état de connexion de l'utilisateur
    const token =
      localStorage.getItem('userToken') || sessionStorage.getItem('userToken')
    const storedUserName = localStorage.getItem('userName')

    if (token) {
      setIsAuthenticated(true)
      if (storedUserName) {
        setUserName(storedUserName)
      }
    }
  }, [])

  const handleSignOut = () => {
    // Effacez le token et le userName lors de la déconnexion
    localStorage.removeItem('userToken')
    sessionStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    setIsAuthenticated(false)
    setUserName('')
    // Redirigez vers la page d'accueil
    navigate('/')
  }

  // Sélecteurs Redux pour obtenir des données du store
  const profile = useSelector((state) => state.profile.profile)

  useEffect(() => {
    if (profile && profile.userName) {
      setUserName(profile.userName)
      localStorage.setItem('userName', profile.userName)
    }
  }, [profile])

  return (
    <div className="containerNav">
      {/* Lien vers la page d'accueil avec le logo */}
      <Link to="/">
        <img src={Logo} alt="Argent Bank logo" className="mainNav_logo" />
      </Link>

      <div className="nav">
        {isAuthenticated ? (
          <>
            <Link className="navLink" to="/user">
              <img src={User} alt="User Icon" className="iconProfile" />
              {userName}
            </Link>

            <a onClick={handleSignOut} className="navLink">
              <img src={SignOut} alt="Sign Out Icon" className="iconSignOut" />
              <span>Sign Out</span>
            </a>
          </>
        ) : (
          <Link to="/sign-in" className="navLink">
            <img src={User} alt="User Icon" className="iconProfile" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
