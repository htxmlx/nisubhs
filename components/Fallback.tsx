'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Unauthorized Access
        </h1>
        <p className="text-xl text-muted-foreground">
          Sorry, you don't have permission to access this page.
        </p>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-secondary-foreground">
            If you believe this is an error, please contact the administrator or
            try logging in again.
          </p>
        </div>
        <Button
          variant="default"
          className="w-full"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}
