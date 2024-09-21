'use client'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'

export default function SearchInput() {
  const router = useRouter()
  return (
    <Input
      placeholder="Find a place..."
      onChange={(e) => router.push(`?query=${e.target.value}`)}
    />
  )
}
