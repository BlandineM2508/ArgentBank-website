import PropTypes from 'prop-types'
import { useState } from 'react'
import './account.scss'

const Account = ({ accountData }) => {
  const [activeIndices, setActiveIndices] = useState([])

  const handleToggle = (index) => {
    setActiveIndices((prevActiveIndices) => {
      if (prevActiveIndices.includes(index)) {
        return prevActiveIndices.filter((i) => i !== index)
      } else {
        return [...prevActiveIndices, index]
      }
    })
  }

  return (
    <div>
      {accountData.map((account, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">
              {account.type} ({account.number})
            </h3>
            <p className="account-amount">{account.balance}</p>
            <p className="account-amount-description">
              {account.balanceDescription}
            </p>
          </div>
          <div className="account-content-wrapper cta">
            <button
              className={`arrow ${
                activeIndices.includes(index) ? 'rotate' : ''
              }`}
              onClick={() => handleToggle(index)}
            ></button>
          </div>
        </section>
      ))}
    </div>
  )
}

Account.propTypes = {
  accountData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      balanceDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Account
