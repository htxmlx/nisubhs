import type { Post } from '@prisma/client'

export interface PostWithRatings extends Post {
  averageRating: string
}
