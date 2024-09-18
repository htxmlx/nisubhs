import Section from '@/components/common/section'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import DeleteListing from '@/components/DeleteListing'
import { auth } from '@clerk/nextjs/server'
import type { Post } from '@prisma/client'
import { notFound } from 'next/navigation'

export default async function Page() {
  const { userId } = auth()
  if (!userId) return notFound()

  const listings = await prisma.post.findMany({
    where: {
      userId,
    },
  })
  return (
    <Section>
      {listings.length
        ? listings.map((data) => <ListingCard key={data.id} {...data} />)
        : 'No listing'}
    </Section>
  )
}

function ListingCard(data: Post) {
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
          <DeleteListing postId={id} />
        </div>
      </CardContent>
    </Card>
  )
}
