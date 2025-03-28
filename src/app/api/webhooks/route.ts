import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { createOrUpdate } from '@/lib/actions/user'

export async function POST(req: Request):Promise<Response> {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', { status: 400 })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', { status: 400 })
  }

  // Log webhook details
  const { id } = evt?.data
  const eventType = evt?.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  // Handle user creation or update
  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    try {
      const { id, first_name, last_name, username, email_addresses, image_url } = evt?.data

      // Ensure email_addresses is properly structured
      const emailArray = Array.isArray(email_addresses) ? email_addresses : []

      // Call createOrUpdate with correct parameter order
      const user = await createOrUpdate(
        id,
        username ?? 'defaultUsername',
        first_name ?? '',
        last_name ?? '',
        image_url ?? '',
        emailArray
      )

      if (user || eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user?._id ?? '',
              isAdmin: user?.isAdmin ?? false,
            },
          })
        } catch (error) {
          console.error('Error updating Clerk metadata:', error)
          return new Response('Error updating metadata', { status: 500 })
        }
      }
    } catch (error) {
      console.error('Error processing user:', error)
      return new Response('Error processing user', { status: 500 })
    }
  }

  // Handle user deletion
  if (evt.type === 'user.deleted') {
    console.log('User is deleted')
  }

  return new Response('Webhook received', { status: 200 })
}
