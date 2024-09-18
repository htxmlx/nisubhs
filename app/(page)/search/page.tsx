import Section from '@/components/common/section'
import SearchInput from '@/components/SearchInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import type { Post } from '@prisma/client'
import Image from 'next/image'

export default async function Page({
  searchParams,
}: {
  searchParams?: { query: string }
}) {
  const query = searchParams?.query || ''

  // Fetch listings from Prisma with filtering
  const listings = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive', // case-insensitive search
          },
        },
        {
          address: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
  })

  return (
    <Section>
      <SearchInput />
      {listings.length
        ? listings.map((data) => <ListingCard key={data.id} {...data} />)
        : 'No listings found'}
    </Section>
  )
}

function ListingCard(data: Post) {
  const { id, address, images, title, price } = data
  return (
    <Card key={id}>
      <CardContent className="mt-2">
        <div className="relative aspect-video">
          <Image src={images[0]} alt={title + ' image'} fill />
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
