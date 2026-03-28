export type EmailNotificationType =
  | 'customer_order_confirmation'
  | 'admin_new_order'
  | 'customer_order_status_update'

export type EmailNotificationPayload = {
  to: string
  subject: string
  type: EmailNotificationType
  data: Record<string, unknown>
}

export type EmailNotificationResult = {
  ok: boolean
  deliveryMode: 'smtp' | 'log-only' | 'failed'
  error?: string
  messageId?: string
}

export async function deliverEmailNotification(
  payload: EmailNotificationPayload
): Promise<EmailNotificationResult> {
  try {
    const response = await fetch('/api/email/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        ok: false,
        deliveryMode: 'failed',
        error: result?.error || 'Email notification request failed',
      }
    }

    return {
      ok: Boolean(result?.ok),
      deliveryMode: result?.deliveryMode || 'failed',
      error: result?.error,
      messageId: result?.messageId,
    }
  } catch (error) {
    return {
      ok: false,
      deliveryMode: 'failed',
      error: error instanceof Error ? error.message : 'Unexpected email error',
    }
  }
}
