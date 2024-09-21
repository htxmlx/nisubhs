import { CategoryTabs } from '@/components/CategoryTabs'
import Section from '@/components/common/section'
import prisma from '@/lib/prisma'
import type { Post } from '@prisma/client'

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
      <CategoryTabs posts={postsWithRating} />
    </Section>
  )
}
