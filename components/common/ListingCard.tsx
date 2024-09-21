import type { Post } from '@prisma/client'
import { StarFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
interface ListingCardProps extends Post {
  averageRating: string
}
export function ListingCard({
  id,
  address,
  images,
  title,
  price,
  averageRating,
}: ListingCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={images[0]}
        alt={title}
        height={300}
        width={300}
        className="aspect-video"
      />
      <CardContent className="p-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-muted-foreground">{address}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">₱{price}/mo</span>
        </div>
        <Badge variant="secondary" className="w-fit mt-2">
          <StarFilledIcon className="h-4 w-4 mr-1 fill-primary" />
          {averageRating}
        </Badge>
      </CardContent>
    </Card>
  )
}
