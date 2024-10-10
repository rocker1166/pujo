'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import debounce from 'lodash.debounce'
import { OlaMaps } from '../lib/OlaMap/OlaMapsWebSDK/olamaps-js-sdk.es'
import '../lib/OlaMap/OlaMapsWebSDK/style.css'

interface Prediction {
  description: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

interface AddressAutocompleteMapProps {
  onCoordinatesChange: (lat: string, lng: string) => void
}

export default function AddressAutocompleteMap({ onCoordinatesChange }: AddressAutocompleteMapProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
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
      center: [88.346142, 22.529923],
      zoom: 15,
    })

    mapRef.current = myMap

    return () => {
      if (myMap) {
        myMap.remove()
      }
    }
  }, [olaMaps])

  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length < 2) {
        setSuggestions([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(input)}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch suggestions.')
        }

        const data = await response.json()
        setSuggestions(data.predictions || [])
      } catch (err: any) {
        console.error('Error fetching autocomplete suggestions:', err)
        setError(err.message || 'An unexpected error occurred.')
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    if (!selected) {
      fetchSuggestions(query)
    }

    return () => {
      fetchSuggestions.cancel()
    }
  }, [query, fetchSuggestions, selected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelected(false)
  }

  const handleSuggestionClick = (prediction: Prediction) => {
    setQuery(prediction.description)
    setSuggestions([])
    setSelected(true)
    updateMap(prediction.geometry.location)
  }

  const handleSubmit = () => {
    console.log('Submitted:', query)
    setSuggestions([])
    setSelected(true)
    if (suggestions.length > 0) {
      updateMap(suggestions[0].geometry.location)
    }
  }

  const updateMap = (location: { lat: number; lng: number }) => {
    if (mapRef.current) {
      const coordinates: [number, number] = [location.lng, location.lat]
      mapRef.current.setCenter(coordinates)
      mapRef.current.setZoom(15)

      // Remove existing marker
      if (markerRef.current) {
        markerRef.current.remove()
      }

      // Add a popup
      const popup = olaMaps
        .addPopup({ offset: [0, -30], anchor: 'bottom' })
        .setHTML(`<div>${query}</div>`)

      const marker = olaMaps
        .addMarker({
          offset: [0, -15],
          anchor: 'bottom',
          color: 'red',
          draggable: true,
        })
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(mapRef.current)

      markerRef.current = marker

      // Update latitude and longitude fields
      setLatitude(location.lat.toFixed(6))
      setLongitude(location.lng.toFixed(6))
      onCoordinatesChange(location.lat.toFixed(6), location.lng.toFixed(6))

      // Add drag event listener
      marker.on('drag', onDrag)
    }
  }

  const onDrag = () => {
    if (markerRef.current) {
      const lngLat = markerRef.current.getLngLat()
      console.log('Marker dragged to:', lngLat)
      setLatitude(lngLat.lat.toFixed(6))
      setLongitude(lngLat.lng.toFixed(6))
      onCoordinatesChange(lngLat.lat.toFixed(6), lngLat.lng.toFixed(6))
    }
  }

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'latitude') {
      setLatitude(value)
    } else if (name === 'longitude') {
      setLongitude(value)
    }

    const lat = parseFloat(name === 'latitude' ? value : latitude)
    const lng = parseFloat(name === 'longitude' ? value : longitude)

    if (!isNaN(lat) && !isNaN(lng)) {
      updateMap({ lat, lng })
    }
  }

  return (
    <div className="w-full">
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your address"
          className="w-full p-2 bg-white border border-orange-600 rounded-xl text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-festiveOrange focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Submit
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-300">Latitude</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={handleCoordinateChange}
            className="mt-1 block w-full p-2 bg-white border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-300">Longitude</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={longitude}
            
            onChange={handleCoordinateChange}
            className="mt-1 block w-full p-2 bg-white border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {isLoading && (
        <div className="text-gray-300 mt-2">Loading...</div>
      )}

      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}

      {!isLoading && suggestions.length > 0 && !selected && (
        <ul className="bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.description}
              className="p-2 cursor-pointer hover:bg-gray-600 text-white"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}

      <div id="map" className="h-[400px] w-full mt-4 rounded-lg shadow-lg">
        <span className="sr-only">Map showing the selected location</span>
      </div>
    </div>
  )
} 