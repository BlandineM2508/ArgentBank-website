import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { updateUserName } from '../../redux/slice'
import { saveUserProfile } from '../../data/api'
import { createSelector } from 'reselect'
import '../editName/editName.scss'

const EditName = ({ onCancel }) => {
  const dispatch = useDispatch()

  const selectProfile = (state) => state.profile.profile
  const selectAuth = (state) => state.auth

  const selectUserInfo = createSelector([selectProfile], (profile) => ({
    userName: profile?.userName,
    firstName: profile?.user?.firstName,
    lastName: profile?.user?.lastName,
  }))

  const selectToken = createSelector([selectAuth], (auth) => auth.token)

  const {
    firstName = '',
    lastName = '',
    userName = '',
  } = useSelector(selectUserInfo)
  const token = useSelector(selectToken)

  const [newUserName, setNewUserName] = useState(userName)
  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName')
    if (storedUserName) {
      setNewUserName(storedUserName)
    } else if (userName) {
      setNewUserName(userName)
    }
  }, [userName])

  const handleSaveUserProfile = async (e) => {
    e.preventDefault()
    if (newUserName !== userName) {
      try {
        await saveUserProfile(token, { userName: newUserName })
        dispatch(updateUserName({ userName: newUserName }))
        localStorage.setItem('userName', newUserName)
        setEditing(false)
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du nom d'utilisateur:",
          error
        )
      }
    } else {
      setEditing(false)
    }
  }

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleCancelEdit = () => {
    setEditing(false)
    onCancel() // Propagation de l'événement d'annulation à un gestionnaire supérieur si nécessaire
  }

  const handleChange = (e) => {
    setNewUserName(e.target.value) // Met à jour le nouveau nom d'utilisateur à chaque changement dans l'input
  }

  return (
    <div>
      {isEditing ? (
        <div className="editNameWrapper">
          <h2>Edit User Info</h2>
          <form>
            <div className="inputGroup">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                placeholder={userName}
                value={newUserName} // Ajout de la valeur de newUserName
                onChange={handleChange}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder={firstName} // Utilisation du placeholder dynamique
                value={firstName} // Ajout de la valeur de firstName
                disabled
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder={lastName} // Utilisation du placeholder dynamique
                value={lastName} // Ajout de la valeur de lastName
                disabled
              />
            </div>
          </form>
          <div className="buttonContainer">
            <button
              className="save"
              type="submit"
              onClick={handleSaveUserProfile}
            >
              Save
            </button>
            <button className="cancel" type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="headerName">
          <h1>
            Welcome back
            <br />
            {newUserName} !
          </h1>
          <button className="buttonEdit" onClick={handleEditClick}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  )
}

EditName.propTypes = {
  onCancel: PropTypes.func,
  onEditClick: PropTypes.func,
}
export default EditName
