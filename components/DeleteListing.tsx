'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { deletePost } from '@/lib/actions.listing'

export default function DeleteListing({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await deletePost(postId)
      window.location.reload()
    } catch (err) {
      setError('Failed to delete post')
      console.error('Error deleting post:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <Button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Listing'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
