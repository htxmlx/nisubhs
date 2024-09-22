'use client'
import type { Post } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

interface CategoryTabsProps {
  posts: PostWithRating[]
}

type PostWithRating = Post & { averageRating: string }

export function CategoryTabs({ posts }: CategoryTabsProps) {
  const categories = Array.from(
    new Set(posts.map((post) => post.close_to))
  ) as string[]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.close_to === selectedCategory)
    : posts

  return (
    <>
      <div className="mb-4">
        <div className="flex space-x-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={!selectedCategory ? 'secondary' : 'default'}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'secondary' : 'default'}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredPosts.length
          ? filteredPosts.map((data) => (
              <Link href={`/details?id=${data.id}`} key={data.id}>
                <ListingCard {...data} />
              </Link>
            ))
          : 'No listing'}
      </div>
    </>
  )
}

interface ListingCardProps extends Post {
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
