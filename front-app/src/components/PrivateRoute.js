import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token)

  if (!token) {
    return <Navigate to="/sign-in" replace={true} />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateRoute
