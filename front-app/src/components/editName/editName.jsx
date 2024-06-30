import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/slice'
import './editName.scss'

const EditName = () => {
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const userData = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token || !userData) {
      return
    }

    if (userData && isEditingUser) {
      setUserName(userData.userName || '')
      setFirstName(userData.firstName || '')
      setLastName(userData.lastName || '')
    }
  }, [userData, isEditingUser, token])

  if (!userData) {
    return <div>Loading...</div>
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      userName,
      firstName,
      lastName,
    }

    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dispatch(setUser({ userName, firstName, lastName }))
        setIsEditingUser(false)
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }

  return (
    <div className="editNameWrapper">
      {!isEditingUser && (
        <h1>
          Welcome back <br /> {userData.firstName} {userData.lastName}
        </h1>
      )}
      {isEditingUser && (
        <form className="editForm" onSubmit={handleSubmit}>
          <h2 className="editFormTitle">Edit user info</h2>
          <div className="editFormWrapper">
            <label htmlFor="username" className="editFormLabel">
              User Name:
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={userName}
              className="editFormInput"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="editFormWrapper">
            <label htmlFor="firstname" className="editFormLabel">
              First name:
            </label>
            <input
              type="text"
              id="firstname"
              name="firstName"
              value={firstName}
              disabled={true}
              className="editFormInput"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="editFormWrapper">
            <label htmlFor="lastname" className="editFormLabel">
              Last name:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastName"
              value={lastName}
              disabled={true}
              className="editFormInput"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="editFormButton">
            <input
              type="submit"
              value="Enregistrer"
              className="editFormSubmit"
            />
            <button
              type="button"
              onClick={() => setIsEditingUser(false)}
              className="editFormCancel"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
      {!isEditingUser && (
        <button className="editButton" onClick={() => setIsEditingUser(true)}>
          Edit Name
        </button>
      )}
    </div>
  )
}

export default EditName
