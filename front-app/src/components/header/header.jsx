import { Link } from 'react-router-dom'
import '../header/header.scss'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../../assets/img/argentBankLogo.webp'
import User from '../../assets/img/user.svg'
import SignOut from '../../assets/img/logout.svg'
import { logoutUser } from '../../redux/slice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const userData = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(logoutUser())
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="containerNav">
      <Link to="/">
        <img src={Logo} alt="Argent Bank logo" className="mainNav_logo" />
      </Link>
      <div className="nav">
        {token && userData ? (
          <>
            <Link className="navLink" to="/user">
              <img src={User} alt="User Icon" className="iconProfile" />
              {userData.userName}
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
