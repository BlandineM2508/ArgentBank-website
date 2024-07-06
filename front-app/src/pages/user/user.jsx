import PropTypes from 'prop-types'
import EditName from '../../components/editName/editName'
import '../user/user.scss'
import { useState, useEffect } from 'react'
import Account from '../../components/Account/account'
import { setUser } from '../../redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'

const User = ({ accountData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Ajout de vérifications pour s'assurer que l'état est défini avant d'accéder à ses propriétés
  const token = useSelector((state) => state.auth.token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // Redirection si l'utilisateur n'est pas authentifié ou si le token est manquant
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/')
    }
  }, [isAuthenticated, token, navigate])

  // Récupération des données utilisateurs,
  //appel à l'api lors du rendu initial et à chaque fois que le token ou le dispach change
  useEffect(() => {
    if (!token) {
      return
    }

    const fetchUserProfile = () => {
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la requête')
          }
          return response.json()
        })
        .then((data) => {
          dispatch(setUser(data.body)) // demande à Redux d'utiliser l'action "setUser" pour mettre à jour l'état global.
        })
        .catch((error) => {
          console.error('Erreur:', error)
        })
    }

    fetchUserProfile()
  }, [token, dispatch])

  const toggleEditClick = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <Header />
      <div className="userWrapper">
        <div className="userContent">
          {isEditing ? (
            <EditName onCancel={toggleEditClick} />
          ) : (
            <EditName onEditClick={toggleEditClick} />
          )}
          <Account accountData={accountData} />
        </div>
      </div>
    </>
  )
}

User.propTypes = {
  accountData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      balanceDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default User
