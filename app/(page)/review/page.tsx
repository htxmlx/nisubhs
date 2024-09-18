import Section from '@/components/common/section'
import RatingForm from '@/components/RatingForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ReviewPage({
  searchParams,
}: {
  searchParams?: { id: string }
}) {
  const listing = await prisma.post.findUnique({
    where: {
      id: searchParams?.id,
    },
  })

  if (!listing) return notFound()
  return (
    <Section>
      <RatingForm postId={listing.id} />
    </Section>
  )
}
