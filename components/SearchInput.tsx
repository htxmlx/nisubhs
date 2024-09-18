'use client'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'

export default function SearchInput() {
  const router = useRouter()
  return <Input onChange={(e) => router.push(`?query=${e.target.value}`)} />
}
