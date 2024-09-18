import Section from '@/components/common/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import Image from 'next/image'
export default async function Page() {
  const listings = await prisma.post.findMany()
  return (
    <Section>
      {listings.length
        ? listings.map((data) => <ListingCard key={data.id} {...data} />)
        : 'No listing'}
    </Section>
  )
}

import { Button } from '@/components/ui/button'
import type { Post } from '@prisma/client'
import Link from 'next/link'

function ListingCard(data: Post) {
  const { id, address, images, title, price } = data
  return (
    <Card key={id}>
      <Link href={`details?id=${id}`}>
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
      </Link>
    </Card>
  )
}
