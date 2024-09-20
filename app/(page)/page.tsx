import Section from '@/components/common/section'
import { Card, CardContent } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import type { Post, Rating } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { StarFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  const listings = await prisma.post.findMany({
    include: {
      ratings: true,
    },
  })

  const postsWithRating = listings.map((post) => {
    const averageRating =
      post.ratings.length > 0
        ? (
            post.ratings.reduce((sum, rating) => sum + rating.value, 0) /
            post.ratings.length
          ).toFixed(1)
        : 'No ratings'

    return {
      ...post,
      averageRating,
    } as Post & { averageRating: string }
  })

  return (
    <Section>
      <h1 className="text-2xl font-bold mb-6">Featured Properties</h1>
      <div className="grid grid-cols-2  gap-4">
        {postsWithRating.length
          ? postsWithRating.map((data) => (
              <Link href={`details?id=${data.id}`} key={data.id}>
                <ListingCard {...data} />
              </Link>
            ))
          : 'No listing'}
      </div>
    </Section>
  )
}

export interface ListingCardProps extends Post {
  averageRating: string
}

function ListingCard({
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
          <span className="font-bold text-lg">${price}/mo</span>
        </div>
        <Badge variant="secondary" className="w-fit mt-2">
          <StarFilledIcon className="h-4 w-4 mr-1 fill-primary" />
          {averageRating}
        </Badge>
      </CardContent>
    </Card>
  )
}
