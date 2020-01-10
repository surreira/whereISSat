import React from 'react';
import Helmet from 'react-helmet';

import { findISS } from '../lib/iss';

import Layout from 'components/Layout';
import Info from 'components/Info';
import Map from 'components/Map';

const LOCATION = {
  lat: 39.593565,
  lng: -7.922777
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 4;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */
  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) {
      return;
    }
    findISS( leafletElement, DEFAULT_ZOOM );
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'Mapbox',
    zoom: DEFAULT_ZOOM,
    maxZoom: 6,
    mapEffect
  };

  const togglePopup = () => {
    const icon = document.getElementsByClassName( 'icon-iss' )[0];
    if ( icon ) {
      icon.click();
    }
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Where ISS at?</title>
      </Helmet>
      <section>
        <Map {...mapSettings} />
      </section>
      <section className="banner">
        <h1 onClick={() => togglePopup()}>
          <span className="title-left">where</span>
          <span className="feature">ISS</span>
          <span className="title-right">at?</span>
        </h1>
      </section>
      <Info />
    </Layout>
  );
};

export default IndexPage;
