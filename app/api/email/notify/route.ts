import { NextResponse } from 'next/server'
import { sendTransactionalEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body?.to || !body?.subject || !body?.type) {
      return NextResponse.json(
        {
          ok: false,
          deliveryMode: 'failed',
          error: 'Missing required email fields',
        },
        { status: 400 }
      )
    }

    const result = await sendTransactionalEmail(body)

    return NextResponse.json(result, {
      status: result.ok ? 200 : 200,
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        deliveryMode: 'failed',
        error: error instanceof Error ? error.message : 'Invalid email request',
      },
      { status: 500 }
    )
  }
}
