import PropTypes from 'prop-types'
import '../features/features.scss'

const Features = ({ featuresData }) => {
  return (
    <div className="featuresContainer">
      {featuresData.map((feature, index) => (
        <div className="featuresContent" key={index}>
          <div className="circle">
            <img src={feature.icon} alt={feature.alt} />
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

Features.propTypes = {
  featuresData: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Features
