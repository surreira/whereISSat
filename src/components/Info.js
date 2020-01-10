import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const Info = () => {
  const [menuOpen, setMenuOpen] = React.useState( false );

  const toggleMenu = ( event ) => {
    event.preventDefault();
    return menuOpen ? setMenuOpen( false ) : setMenuOpen( true );
  };

  return (
    <>
      <a href="#info" className="info-button" onClick={( e ) => toggleMenu( e )} aria-label="Open the menu">
        { menuOpen ? <IoMdClose /> : <IoMdMenu /> }
      </a>
      { menuOpen && (
        <>
          <div className="overlay"></div>
          <div id="info" className="info">
            <div className="container">
              <h2>Where&apos;s the ISS at?</h2>
              <p>
                This site is a small learning experiment with a new stack of web technologies; it shows and tracks the
                location of the{ ' ' }
                <strong>
                  <a href="https://www.nasa.gov/mission_pages/station/main/index.html">International Space Station</a>
                </strong>{ ' ' }
                in the map.
                <br />
                The site was also built to be accessible and responsive.
              </p>
              <p>
                This project was built using <a href="https://reactjs.org">React</a>,{ ' ' }
                <a href="https://gatsbyjs.org">Gatsby</a> and <a href="https://leafletjs.com/">Leaflet</a>.
              </p>
              <p>
                Maps imagery provided by <a href="https://www.mapbox.com">Mapbox</a>.
              </p>
              <p>
                The ISS location is provided by <a href="https://wheretheiss.at">https://wheretheiss.at</a>
              </p>
              <p className="project-link">
                <a href="https://github.com/surreira/whereISSat">
                  <FaGithub />
                </a>
              </p>
            </div>
          </div>
        </>
      ) }
    </>
  );
};

export default Info;
