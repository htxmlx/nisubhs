import type { Post } from '@prisma/client'
import { Card, CardContent, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'

export function ListingCard(data: Post) {
  const { id, address, images, title, price } = data
  return (
    <Card key={id}>
      <CardContent className="mt-2">
        <div className="relative aspect-video">
          <Image src={images[0]} alt={title + 'image'} fill />
        </div>
        <CardTitle className="font-semibold">{title}</CardTitle>
        <CardTitle className="text-muted-foreground">{address}</CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">₱{price}.00</p>{' '}
          <Button>More Info</Button>
        </div>
      </CardContent>
    </Card>
  )
}
