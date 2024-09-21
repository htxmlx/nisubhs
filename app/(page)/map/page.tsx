import Section from '@/components/common/section'
import Map from '@/components/Map'
import prisma from '@/lib/prisma'

export default async function Page() {
  const listings = await prisma.post.findMany()

  return (
    <Section className="p-0 space-y-0">
      <Map data={listings} />
    </Section>
  )
}
