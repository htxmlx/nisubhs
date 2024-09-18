'use client'

import { formatPrice } from '@/lib/utils'
import type { Post } from '@prisma/client'
import { useTheme } from 'next-themes'
import { useRef, useState } from 'react'
import { MapRef, Map as MapGL, Marker } from 'react-map-gl'
import { Badge } from './ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'

const TOKEN =
  'pk.eyJ1IjoiYXprcml2ZW4xNiIsImEiOiJjbGhma3IxaWcxN3c3M2VyM3VhcGsxcHk3In0.pto_0eshW9NHMP-m1O_blg'

const mapStyles = {
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
}
interface MapProps {
  data: Post[]
}
export default function Map({ data }: MapProps) {
  const { theme } = useTheme()

  const mapRef = useRef<MapRef>(null)
  const [selectedCity, setSelectedCity] = useState<Post | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((city) => {
    const price = Number(city.price)
    const withinPriceRange = price >= priceRange[0] && price <= priceRange[1]
    const matchesSearchTerm = city.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return withinPriceRange && matchesSearchTerm
  })

  const pins = filteredData.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation()
        setSelectedCity(city)
        if (mapRef.current) {
          mapRef.current?.flyTo({
            center: [city.longitude, city.latitude],
            essential: true,
            zoom: 18,
            speed: 5,
            curve: 1,
            easing: (t: number) => t,
          })
        }
      }}
    >
      <Badge>{formatPrice(Number(city.price))}</Badge>
    </Marker>
  ))
  return (
    <>
      <MapGL
        ref={mapRef}
        initialViewState={{
          latitude: 11.461424460015792,
          longitude: 123.14389088712784,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle={theme === 'dark' ? mapStyles.dark : mapStyles.light}
        mapboxAccessToken={TOKEN}
        style={{
          height: '100vh',
          width: '100%',
          zIndex: 10,
        }}
        onClick={(e) => alert(e.lngLat)}
      >
        {pins}
      </MapGL>

      {selectedCity && (
        <ListingCard
          item={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </>
  )
}

export const ListingCard = ({
  item,
  onClose,
}: {
  item: Post
  onClose: () => void
}) => (
  <Card className="z-50 fixed bottom-14 w-full">
    <CardHeader className="relative border-b w-full h-32">
      <Image
        fill
        src={item.images[0]}
        alt={`Image of ${item.title}`}
        className="w-full h-40 object-cover"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </Button>
    </CardHeader>
    <CardContent>
      <h2 className="text-xl font-semibold mb-2">{item.address}</h2>
      <p>
        <strong>Price:</strong> {item.price}
      </p>
      <p>
        <strong>Latitude:</strong> {item.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {item.longitude}
      </p>
    </CardContent>
    <CardFooter>
      <Button>More Info</Button>
    </CardFooter>
  </Card>
)
