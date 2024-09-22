import Section from '@/components/common/section'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import DeleteListing from '@/components/DeleteListing'
import { auth, currentUser } from '@clerk/nextjs/server'
import type { Post } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function Page() {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId) return notFound()
  if (!user) return notFound()
  console.log(user)

  const listings = await prisma.post.findMany({
    where: {
      userId,
    },
  })
  return (
    <Section>
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">Account Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            {user.emailAddresses?.[0]?.emailAddress}
          </div>
          <div className="flex items-center gap-2">
            {user.firstName || 'Name not available'}
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold">My Listings</h2>
      <div className="grid grid-cols-2 gap-4">
        {listings.length
          ? listings.map((data) => (
              <Link href={`/details?id=${data.id}`} key={data.id}>
                <ListingCard {...data} />
              </Link>
            ))
          : 'No listing'}
      </div>
    </Section>
  )
}

function ListingCard({ id, address, images, title, price }: Post) {
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
        <DeleteListing postId={id} />
      </CardContent>
    </Card>
  )
}
