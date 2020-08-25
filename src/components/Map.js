import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Map as BaseMap, TileLayer } from 'react-leaflet';

import { useConfigureLeaflet, useMapServices, useRefEffect } from 'hooks';
import { isDomAvailable } from 'lib/util';

const Map = ( props ) => {
  const { children, className, defaultBaseMap = 'OpenStreetMap', mapEffect, ...rest } = props;

  const mapRef = useRef();

  useConfigureLeaflet();

  useRefEffect({
    ref: mapRef,
    effect: mapEffect
  });

  const services = useMapServices({
    names: ['OpenStreetMap', 'Mapbox']
  });
  const basemap = services.find(( service ) => service.name === defaultBaseMap );

  let mapClassName = `map`;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  if ( !isDomAvailable()) {
    return (
      <div className={mapClassName}>
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  const mapSettings = {
    className: 'map-base',
    zoomControl: false,
    minZoom: 3,
    ...rest
  };

  return (
    <div className={mapClassName}>
      <BaseMap
        ref={mapRef}
        {...mapSettings}
        style={{
          height: window.innerHeight,
          width: window.innerWidth < 975 ? window.innerWidth : window.innerWidth / 2
        }}
      >
        { children }
        { basemap && <TileLayer {...basemap} /> }
      </BaseMap>
    </div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultBaseMap: PropTypes.string,
  mapEffect: PropTypes.func
};

export default Map;
