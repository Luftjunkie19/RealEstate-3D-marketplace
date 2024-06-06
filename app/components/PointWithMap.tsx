'use client';
import React from 'react'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';






type Props = {lat:number, lng:number, address:number}

function PointWithMap({lat, lng, address}: Props) {
  return (
    <MapContainer 
    dragging={false}
    center={[lat, lng]}
    zoom={13}
    scrollWheelZoom={false}
    className='max-w-5xl h-80 mx-auto lg:my-2 z-[20]'
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