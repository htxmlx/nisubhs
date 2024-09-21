import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center">
        <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 animate-spin text-primary mx-auto" />
        <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
          Loading...
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          Please wait. This may take a few moments.
        </p>
      </div>
    </div>
  )
}
