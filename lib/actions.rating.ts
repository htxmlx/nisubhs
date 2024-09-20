'use server'

import type { Post, Rating } from '@prisma/client'
import prisma from '@/lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createRating(
  postId: string,
  rating: number,
  review: string
) {
  const { userId } = auth()

  if (!userId) return

  const clerk = clerkClient()

  const { imageUrl, fullName } = await clerk.users.getUser(userId)

  try {
    await prisma.rating.create({
      data: {
        userId,
        postId,
        value: rating,
        review,
        user_image: imageUrl,
        user_name: fullName || 'NA',
      },
    })
    revalidatePath('/profile')
    redirect('/profile')
  } catch (error) {
    console.error('Error creating post:', error)
  }
}

export async function updateRating(
  postId: string,
  rating: number,
  review: string
) {
  const { userId } = auth()

  if (!userId) return

  try {
    // Update the existing rating
    await prisma.rating.updateMany({
      where: {
        userId,
        postId,
      },
      data: {
        value: rating,
        review,
      },
    })
    revalidatePath(`/details?id=${postId}`)
    redirect(`/details?id=${postId}`)
  } catch (error) {
    console.error('Error updating rating:', error)
  }
}

export async function deleteRating(postId: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('User is not authenticated')
  }

  try {
    const post = await prisma.rating.findUnique({
      where: { id: postId },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.userId !== userId) {
      throw new Error('User is not authorized to delete this post')
    }

    await prisma.rating.delete({
      where: { id: postId },
    })
    revalidatePath(`/details?id=${postId}`)
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}
