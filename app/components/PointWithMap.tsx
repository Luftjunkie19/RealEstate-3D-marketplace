'use client';

import React from 'react'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';




type Props = {lat:number, lng:number, address:number}

function PointWithMap({lat, lng, address}: Props) {
  return (
    <MapContainer 
    center={[lat, lng]}
    zoom={13}
    scrollWheelZoom={true}
    className='max-w-5xl h-80 mx-auto lg:my-6'
  >
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[lat, lng]}>
      <Popup>
        {address}
      </Popup>
    </Marker>
</MapContainer>
  )
}

export default PointWithMap