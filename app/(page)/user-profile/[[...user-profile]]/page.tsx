import Section from '@/components/common/section'
import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
  <Section className="flex items-center justify-center">
    <UserProfile path="/user-profile" />
  </Section>
)

export default UserProfilePage
