import React from 'react'
import { Link, Element } from 'react-scroll'
import './Main.css'

const Home2 = () => {
  return (
    <div className="home2">
      {/* Navigation link */}
      <Link to="animated-section" smooth={true} duration={500}>
        <h1 className="header-text">Discover, Devour, Delight!</h1>
      </Link>

      {/* Animated section */}
      <Element name="animated-section" className="animated-section">
        <div className="spine-container">
          <img
            src={process.env.PUBLIC_URL + '/images/I11.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I12.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I3.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I5.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I4.png'}
            alt="spine"
            className="animated-image_special"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I10.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I7.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I8.png'}
            alt="spine"
            className="animated-image"
          />

          <img
            src={process.env.PUBLIC_URL + '/images/I9.png'}
            alt="spine"
            className="animated-image"
          />
        </div>
        
      </Element>
    </div>
  )
}

export default Home2
