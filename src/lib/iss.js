import L from 'leaflet';
import { promiseToFlyTo } from './map';
import { Polyline as WrappedPolyline } from 'leaflet-antimeridian/src/vector/Wrapped.Polyline.js';

function popupContent( position ) {
  return `<h3><span>International</span> <span>Space</span> <span>Station</span></h3>
    <p>Altitude: <strong>${Number.parseFloat( position.altitude ).toFixed( 2 )}</strong> Km</p>
    <p>Velocity: <strong>${Number.parseFloat( position.velocity ).toFixed( 0 )}</strong> Km/h</p>
    <p>Latitude: <strong>${position.latitude}</strong></p>
    <p>Longitude: <strong>${position.longitude}</strong></p>`;
}

export async function findISS( map, zoom ) {
  let issPosition;
  try {
    const response = await fetch( 'https://api.wheretheiss.at/v1/satellites/25544' );
    issPosition = await response.json();
    localStorage.setItem( 'iss', JSON.stringify([{ lat: issPosition.latitude, lng: issPosition.longitude }]));
  } catch ( error ) {
    console.warn( 'Unable to fetch ISS position.', error );
    return;
  }

  const issLocation = new L.LatLng( issPosition.latitude, issPosition.longitude );
  const issMarker = L.marker( issLocation, {
    icon: L.divIcon({
      className: 'icon',
      html: `<div class="icon-iss">🛰</div>`,
      iconSize: 50
    })
  })
    .bindPopup( popupContent( issPosition ), {
      className: 'custom-popup',
      closeButton: false
    })
    .openPopup();
  issMarker.setLatLng( issLocation );
  issMarker.addTo( map );

  await promiseToFlyTo( map, {
    zoom: zoom,
    center: issLocation
  });

  window.setInterval( async () => {
    try {
      const response = await fetch( 'https://api.wheretheiss.at/v1/satellites/25544' );
      issPosition = await response.json();
    } catch ( error ) {
      console.warn( 'Unable to fetch ISS position.', error );
      return;
    }

    localStorage.setItem(
      'iss',
      JSON.stringify(
        JSON.parse( localStorage.getItem( 'iss' )).concat({
          lat: issPosition.latitude,
          lng: issPosition.longitude
        })
      )
    );

    const issRoute = new WrappedPolyline(
      JSON.parse( localStorage.getItem( 'iss' )).map(( position ) => {
        return new L.LatLng( position.lat, position.lng );
      }),
      { color: '#8a7f8d', weight: 8 }
    );
    issRoute.addTo( map );

    const newLocation = new L.LatLng( issPosition.latitude, issPosition.longitude );
    issMarker.setLatLng( newLocation );
    if ( issMarker.getPopup().isOpen()) {
      issMarker
        .bindPopup( popupContent( issPosition ), {
          className: 'custom-popup',
          closeButton: false
        })
        .openPopup();
    }

    await promiseToFlyTo( map, {
      zoom: map.getZoom() < zoom ? map.getZoom() : zoom,
      center: newLocation
    });
  }, 5000 );

  // return issLocation;
}
