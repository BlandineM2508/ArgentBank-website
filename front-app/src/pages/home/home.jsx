import PropTypes from 'prop-types' // Importer PropTypes
import '../home/home.scss'
import Header from '../../components/header/header'
import Hero from '../../components/hero/hero'
import Features from '../../components/features/features' // Assurez-vous que le chemin est correct

const Home = ({ featuresData }) => {
  return (
    <div className="homeWrapper">
      <Header />
      <Hero />
      <Features featuresData={featuresData} />
    </div>
  )
}

// Ajouter les validations de props
Home.propTypes = {
  featuresData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Home
