import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  GroundOverlay
} from "react-google-maps";

function Map({center,left,right,overlay,zoom}) {
    
  let google=window.google
  const centerNum1=Number(center.split(',')[0])
  const centerNum2=Number(center.split(',')[1])
  const leftNum1=left.split(',')[0]
  const leftNum2=left.split(',')[1]
  const rightNum1=right.split(',')[0]
  const rightNum2=right.split(',')[1]
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: centerNum1, lng:  centerNum2 }}
      options={{
            styles: exampleMapStyles, disableDefaultUI: true
        }}
    >
    <GroundOverlay
      defaultUrl={overlay}
      defaultBounds={new google.maps.LatLngBounds(
        new google.maps.LatLng( leftNum1,leftNum2),
        new google.maps.LatLng(rightNum1,rightNum2)
      )}
    />
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Maps({center,left,right,overlay,zoom}) {

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapped
        overlay={overlay}
        left={left}
        right={right}
        center={center}
        zoom={zoom}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=&key=AIzaSyDJtwCzTFMW8OY6bzLERX3UJdVDeujnP-k`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}





const exampleMapStyles=[
 
]