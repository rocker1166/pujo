import React, { useEffect, useMemo, useRef } from 'react'
import { OlaMaps } from '../lib/OlaMap/OlaMapsWebSDK/olamaps-js-sdk.es'
import '../lib/OlaMap/OlaMapsWebSDK/style.css'

interface MapComponentProps {
  latitude: any
  longitude: any
}

export default function Navmap({ latitude, longitude }: MapComponentProps) {
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  const olaMaps = useMemo(() => {
    return new OlaMaps({
      apiKey: process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY || '',
    })
  }, [])

  useEffect(() => {
    const mapContainer = document.getElementById('map')
    if (!mapContainer) return

    const myMap = olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard-mr/style.json",
      container: mapContainer,
      center: [88.346142, 22.529923], // Default center (Kolkata)long/lati
      zoom: 15,
    })

    mapRef.current = myMap

    return () => {
      if (myMap) {
        myMap.remove()
      }
    }
  }, [olaMaps])

  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      const coordinates: [number, number] = [parseFloat(longitude), parseFloat(latitude)]
      mapRef.current.setCenter(coordinates)
      mapRef.current.setZoom(15)

      // Remove existing marker
      if (markerRef.current) {
        markerRef.current.remove()
      }

      // Add a draggable marker
      const marker = olaMaps
        .addMarker({
          offset: [0, -15],
          anchor: 'bottom',
          color: 'red',
         
        })
        .setLngLat(coordinates)
        .addTo(mapRef.current)

      markerRef.current = marker

      marker.on('drag', () => {
        const lngLat = marker.getLngLat()
        console.log('Marker dragged to:', lngLat)
      })
    }
  }, [latitude, longitude, olaMaps])

  return (
    <div id="map" className="h-[400px] relative w-full mt-4 rounded-lg shadow-lg">
      <span className="sr-only">Map showing the selected location</span>
    </div>
  )
}
