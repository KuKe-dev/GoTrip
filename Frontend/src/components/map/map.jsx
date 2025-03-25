/* eslint-disable react/prop-types */
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer} from 'react-leaflet'

import './style.css'
import Markers from './markers/markers';

export default function Map(props) {

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
          
          <Markers></Markers>

        </MapContainer>
    </>
  )
}