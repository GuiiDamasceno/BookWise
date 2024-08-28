import { getServerSession } from 'next-auth'
import { authOptions } from '../auth-options'

export async function serverSession() {
  const session = await getServerSession(authOptions)

  return session
}
