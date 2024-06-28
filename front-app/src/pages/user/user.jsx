import PropTypes from 'prop-types'
import Header from '../../components/header/header'
import signOut from '../../../public/img/logout.svg'
import EditName from '../../components/editName/editName'
import '../user/user.scss'
import { useState } from 'react'
import Account from '../../components/Account/account'

const User = ({ accountData }) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditClick = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="userWrapper">
      <Header imgSignOut={signOut} textSignOut="Sign Out" />
      <div className="userContent">
        {isEditing ? (
          <EditName onCancel={toggleEditClick} />
        ) : (
          <EditName onEditClick={toggleEditClick} />
        )}
        <Account accountData={accountData} />
      </div>
    </div>
  )
}

User.propTypes = {
  accountData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      balanceDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default User
