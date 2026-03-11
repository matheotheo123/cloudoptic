import { Resend } from 'resend'

/**
 * Email notifications via Resend.
 * Gracefully no-ops if RESEND_API_KEY or ADMIN_EMAIL is not configured.
 */

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

const adminEmail = process.env.ADMIN_EMAIL ?? ''

export async function sendLeadNotification(lead: {
  name: string
  email: string
  company: string
  cloud_spend: string
  message?: string
}) {
  const resend = getResend()
  if (!resend || !adminEmail) return

  try {
    await resend.emails.send({
      from: 'Anthropi <notifications@anthropi.com>',
      to: adminEmail,
      subject: `New Audit Request — ${lead.company}`,
      html: `
        <h2>New Audit Request</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${lead.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${lead.email}</td></tr>
          <tr><td><strong>Company:</strong></td><td>${lead.company}</td></tr>
          <tr><td><strong>Cloud Spend:</strong></td><td>${lead.cloud_spend}</td></tr>
          ${lead.message ? `<tr><td><strong>Message:</strong></td><td>${lead.message}</td></tr>` : ''}
        </table>
      `,
    })
  } catch (err) {
    console.error('Failed to send lead notification email:', err)
  }
}

export async function sendExpertNotification(expert: {
  name: string
  email: string
  linkedin: string
  platforms: string
  experience: string
  resume_url?: string
}) {
  const resend = getResend()
  if (!resend || !adminEmail) return

  try {
    await resend.emails.send({
      from: 'Anthropi <notifications@anthropi.com>',
      to: adminEmail,
      subject: `New Expert Application — ${expert.name}`,
      html: `
        <h2>New FinOps Expert Application</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${expert.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${expert.email}</td></tr>
          <tr><td><strong>LinkedIn:</strong></td><td><a href="${expert.linkedin}">${expert.linkedin}</a></td></tr>
          <tr><td><strong>Platforms:</strong></td><td>${expert.platforms}</td></tr>
          <tr><td><strong>Experience:</strong></td><td>${expert.experience} years</td></tr>
          ${expert.resume_url ? `<tr><td><strong>Resume:</strong></td><td><a href="${expert.resume_url}">Download</a></td></tr>` : ''}
        </table>
      `,
    })
  } catch (err) {
    console.error('Failed to send expert notification email:', err)
  }
}
