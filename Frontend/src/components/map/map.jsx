/* eslint-disable react/prop-types */
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'

import { Icon } from 'leaflet';

import './style.css'
import Markers from './markers/markers';
import { useEffect, useState } from 'react';

export default function Map(props) {

  const [clickedPosition, setClickedPosition] = useState(null);

  // Componente para manejar eventos del mapa
    function MapClickHandler({ onMapClick }) {
      useMapEvents({
        click: (e) => {

          

          if (onMapClick) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;

          setClickedPosition([lat, lng]);
            onMapClick(lat, lng);
            
          }
        }
      });
      
      return null;
    }

    const newIcon = new Icon({
        iconUrl: "https://i.ibb.co/pjDPxcRT/new-Marker.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35],
        className: 'custom-marker-own'
    });

    const user = props.user;
    const randomPosts = props.randomPosts;
    const defaultValues = {
      centeredPosition: [20, 0],
      minZoom: 2.45,
      defaultScroll: true,
      maxZoom: 17,
    }
    
    
  return (
    <>
        <MapContainer id='map'
          center={props.position ? props.position : defaultValues.centeredPosition}
          zoom={props.zoom ? props.zoom : defaultValues.minZoom}
          scrollWheelZoom={props.scroll ? props.scroll : defaultValues.defaultScroll}
          minZoom={defaultValues.minZoom}
          maxZoom={defaultValues.maxZoom}
        >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true} />
          
          <Markers randomPosts={randomPosts} user={user}></Markers>

          {clickedPosition && (
          <Marker position={clickedPosition} icon={newIcon}>
          </Marker>
          )}

          <MapClickHandler onMapClick={props.onMapClick}/>
        </MapContainer>
    </>
  )
}