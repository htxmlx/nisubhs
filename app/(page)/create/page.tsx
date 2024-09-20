import Section from '@/components/common/section'
import UnauthorizedPage from '@/components/Fallback'
import Form from '@/components/Form'
import { Protect } from '@clerk/nextjs'
import React from 'react'

export default function Page() {
  return (
    <Section>
      <Protect fallback={<UnauthorizedPage />} permission="org:listing:create">
        <Form />
      </Protect>
    </Section>
  )
}
