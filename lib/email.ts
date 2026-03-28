import nodemailer from 'nodemailer'

type EmailNotificationType =
  | 'customer_order_confirmation'
  | 'admin_new_order'
  | 'customer_order_status_update'

type EmailItem = {
  productName?: string
  variantSize?: string
  quantity?: number
  subtotal?: number
}

type EmailAddress = {
  street?: string
  city?: string
  state?: string
  pincode?: string
}

type EmailPayload = {
  to: string
  subject: string
  type: EmailNotificationType
  data: {
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    orderId?: string
    status?: string
    totalAmount?: number
    items?: EmailItem[]
    address?: EmailAddress
  }
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser
const fromName = process.env.SMTP_FROM_NAME || 'Amrat Kalash'
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'amrishaagros@gmail.com'

function isEmailConfigured() {
  return Boolean(smtpHost && smtpPort && smtpUser && smtpPass && fromEmail)
}

function formatCurrency(amount?: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

function renderItems(items: EmailItem[] = []) {
  if (!items.length) return '<p>No items found.</p>'

  return `
    <table style="width:100%;border-collapse:collapse;margin-top:16px;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb;">Item</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb;">Variant</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb;">Qty</th>
          <th style="text-align:right;padding:8px;border-bottom:1px solid #e5e7eb;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${item.productName || '-'}</td>
                <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${item.variantSize || '-'}</td>
                <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${item.quantity || 0}</td>
                <td style="padding:8px;border-bottom:1px solid #f3f4f6;text-align:right;">${formatCurrency(item.subtotal)}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `
}

function renderAddress(address?: EmailAddress) {
  if (!address) return '<p>Address not provided.</p>'

  return `
    <p style="margin:0;">
      ${address.street || ''}<br />
      ${address.city || ''}, ${address.state || ''} ${address.pincode || ''}
    </p>
  `
}

function wrapEmail(title: string, body: string) {
  return `
    <div style="background:#f8fafc;padding:24px;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#f59e0b,#ea580c);padding:24px;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">${title}</h1>
          <p style="margin:8px 0 0;">Amrat Kalash</p>
        </div>
        <div style="padding:24px;line-height:1.6;">
          ${body}
        </div>
      </div>
    </div>
  `
}

function getEmailContent(payload: EmailPayload) {
  const { type, data } = payload

  if (type === 'customer_order_confirmation') {
    return {
      html: wrapEmail(
        'Order Confirmation',
        `
          <p>Hi ${data.customerName || 'Customer'},</p>
          <p>Thank you for your order. We have received it successfully.</p>
          <p><strong>Order ID:</strong> ${data.orderId || '-'}</p>
          <p><strong>Total Amount:</strong> ${formatCurrency(data.totalAmount)}</p>
          <h3 style="margin-top:24px;">Items</h3>
          ${renderItems(data.items)}
          <h3 style="margin-top:24px;">Delivery Address</h3>
          ${renderAddress(data.address)}
        `
      ),
      text: `Order confirmed for ${data.customerName || 'Customer'}. Order ID: ${data.orderId || '-'}. Total: ${formatCurrency(data.totalAmount)}.`,
    }
  }

  if (type === 'admin_new_order') {
    return {
      html: wrapEmail(
        'New Order Received',
        `
          <p>A new customer order has been placed.</p>
          <p><strong>Order ID:</strong> ${data.orderId || '-'}</p>
          <p><strong>Customer:</strong> ${data.customerName || '-'}</p>
          <p><strong>Email:</strong> ${data.customerEmail || '-'}</p>
          <p><strong>Phone:</strong> ${data.customerPhone || '-'}</p>
          <p><strong>Total Amount:</strong> ${formatCurrency(data.totalAmount)}</p>
          <h3 style="margin-top:24px;">Items</h3>
          ${renderItems(data.items)}
          <h3 style="margin-top:24px;">Delivery Address</h3>
          ${renderAddress(data.address)}
        `
      ),
      text: `New order ${data.orderId || '-'}. Customer: ${data.customerName || '-'}. Total: ${formatCurrency(data.totalAmount)}.`,
    }
  }

  return {
    html: wrapEmail(
      'Order Status Update',
      `
        <p>Hi ${data.customerName || 'Customer'},</p>
        <p>Your order status has been updated.</p>
        <p><strong>Order ID:</strong> ${data.orderId || '-'}</p>
        <p><strong>New Status:</strong> ${(data.status || '-').toUpperCase()}</p>
        <p><strong>Total Amount:</strong> ${formatCurrency(data.totalAmount)}</p>
      `
    ),
    text: `Order ${data.orderId || '-'} status updated to ${(data.status || '-').toUpperCase()}.`,
  }
}

export async function sendTransactionalEmail(payload: EmailPayload) {
  if (!isEmailConfigured()) {
    return {
      ok: false,
      deliveryMode: 'log-only' as const,
      error: 'SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL and ADMIN_NOTIFICATION_EMAIL to enable real delivery.',
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const content = getEmailContent(payload)
    const recipient = payload.type === 'admin_new_order' ? adminEmail : payload.to
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: recipient,
      subject: payload.subject,
      html: content.html,
      text: content.text,
    })

    return {
      ok: true,
      deliveryMode: 'smtp' as const,
      messageId: info.messageId,
    }
  } catch (error) {
    return {
      ok: false,
      deliveryMode: 'failed' as const,
      error: error instanceof Error ? error.message : 'Email send failed',
    }
  }
}
