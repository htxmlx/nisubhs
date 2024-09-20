import { formatPrice } from '@/lib/utils'
import { Search, Settings2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Slider } from './ui/slider'

// Define types for the props
interface MapFilterProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  priceRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleStyleChange: any
  currentMapStyle: string
}

export default function MapFilter({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  setIsDrawerOpen,
  handleStyleChange,
  currentMapStyle,
}: MapFilterProps) {
  return (
    <div className="flex gap-2 items-center justify-between px-2 mt-5 bg-background z-50">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search by house name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings2 className="size-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-4 space-y-5 h-[50vh] flex flex-col items-center">
          <h3 className="text-center">Map Type</h3>
          <div className="flex gap-5">
            <div
              className="rounded-lg overflow-hidden flex flex-col items-center"
              onClick={() =>
                handleStyleChange('mapbox://styles/mapbox/streets-v12')
              }
            >
              <div className="aspect-video relative h-12">
                <Image objectFit="cover" src="/standard.png" fill alt="image" />
              </div>
              Standard
            </div>

            <div
              className="rounded-lg overflow-hidden flex flex-col items-center"
              onClick={() =>
                handleStyleChange(
                  'mapbox://styles/mapbox/satellite-streets-v12'
                )
              }
            >
              <div className="aspect-video relative h-12">
                <Image
                  objectFit="cover"
                  src="/satellite.png"
                  fill
                  alt="image"
                />
              </div>
              Satellite
            </div>

            <div
              className="rounded-lg overflow-hidden flex flex-col items-center"
              onClick={() =>
                handleStyleChange('mapbox://styles/mapbox/outdoors-v12')
              }
            >
              <div className="aspect-video relative h-12">
                <Image objectFit="cover" src="/street.png" fill alt="image" />
              </div>
              Street
            </div>
          </div>

          <h3 className="text-center">Price Range</h3>
          <div className="price-filter p-4 shadow-md rounded">
            <Slider
              min={0}
              max={5000}
              step={1000}
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              className="w-full min-w-[250px] mt-2"
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
