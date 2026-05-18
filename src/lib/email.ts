import nodemailer from 'nodemailer'
import type { RegistrationFormData, SponsorFormData } from '@/types'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,   // App password, not account password
  },
})

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'jeevaoli.friends@gmail.com'
const CLUB_NAME   = 'Jeeva Oli Friends'

// ─── Registration confirmation to captain ────────────────────
export async function sendRegistrationConfirmation(data: RegistrationFormData, tournamentName: string) {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F5F0;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#C0392B,#8B1A14);padding:32px;text-align:center">
        <div style="font-size:32px;font-weight:900;letter-spacing:0.04em;color:#F5F5F0">JEEVA OLI FRIENDS</div>
        <div style="font-size:12px;letter-spacing:0.12em;color:#C9A227;margin-top:4px">MANIYAMBET · KABADDI CLUB</div>
      </div>
      <div style="padding:32px">
        <h2 style="color:#C9A227;font-size:24px;margin-bottom:8px">Registration Received! 🏆</h2>
        <p style="color:#C8C8C2;line-height:1.7;margin-bottom:24px">
          Dear <strong style="color:#F5F5F0">${data.captainName}</strong>,<br><br>
          We've received the registration for <strong style="color:#F5F5F0">${data.teamName}</strong> for the <strong style="color:#C9A227">${tournamentName}</strong>. 
          Your application is under review and we'll confirm your slot within 24 hours.
        </p>
        <div style="background:#1A1A1C;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin-bottom:24px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7A74;margin-bottom:12px">Registration Summary</div>
          ${[
            ['Team Name', data.teamName],
            ['Captain', data.captainName],
            ['Phone', data.contactPhone],
            ['Email', data.contactEmail],
            ['Location', data.location],
            ['Players', `${data.playerCount}`],
            ['Tournament', tournamentName],
          ].map(([k, v]) => `
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
              <span style="color:#7A7A74;font-size:13px">${k}</span>
              <span style="color:#F5F5F0;font-size:13px;font-weight:600">${v}</span>
            </div>
          `).join('')}
        </div>
        <div style="background:rgba(192,57,43,0.1);border:1px solid rgba(192,57,43,0.3);border-radius:8px;padding:16px;margin-bottom:24px">
          <div style="font-weight:700;color:#E8735A;margin-bottom:8px">What's Next?</div>
          <ul style="color:#C8C8C2;font-size:13px;line-height:1.8;margin:0;padding-left:18px">
            <li>Admin reviews your application (within 24 hours)</li>
            <li>You'll receive an approval/rejection email</li>
            <li>On match day, report 30 minutes early</li>
            <li>All players must carry valid ID proof</li>
          </ul>
        </div>
        <p style="color:#7A7A74;font-size:12px">
          Questions? Contact us at <a href="mailto:${ADMIN_EMAIL}" style="color:#C0392B">${ADMIN_EMAIL}</a> or call +91 98765 43210
        </p>
      </div>
      <div style="background:#111113;padding:16px;text-align:center;font-size:11px;color:#7A7A74;border-top:1px solid rgba(192,57,43,0.2)">
        © ${new Date().getFullYear()} ${CLUB_NAME}, Maniyambet · Built with ♥ for Kabaddi
      </div>
    </div>
  `
  await transporter.sendMail({
    from: `"${CLUB_NAME}" <${process.env.EMAIL_USER}>`,
    to: data.contactEmail,
    subject: `Team Registration Received — ${tournamentName} | ${CLUB_NAME}`,
    html,
  })
}

// ─── Admin notification for new registration ─────────────────
export async function sendAdminRegistrationAlert(data: RegistrationFormData, tournamentName: string) {
  await transporter.sendMail({
    from: `"JOF Website" <${process.env.EMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `[NEW REGISTRATION] ${data.teamName} — ${tournamentName}`,
    html: `
      <h2>New Team Registration</h2>
      <ul>
        <li><strong>Team:</strong> ${data.teamName}</li>
        <li><strong>Captain:</strong> ${data.captainName}</li>
        <li><strong>Phone:</strong> ${data.contactPhone}</li>
        <li><strong>Email:</strong> ${data.contactEmail}</li>
        <li><strong>Location:</strong> ${data.location}</li>
        <li><strong>Players:</strong> ${data.playerCount}</li>
        <li><strong>Tournament:</strong> ${tournamentName}</li>
        ${data.message ? `<li><strong>Message:</strong> ${data.message}</li>` : ''}
      </ul>
      <p>Login to admin panel to approve or reject this registration.</p>
    `,
  })
}

// ─── Sponsorship interest notification ───────────────────────
export async function sendSponsorshipAlert(data: SponsorFormData) {
  await transporter.sendMail({
    from: `"JOF Website" <${process.env.EMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `[SPONSORSHIP INTEREST] ${data.businessName}`,
    html: `
      <h2>New Sponsorship Enquiry</h2>
      <ul>
        <li><strong>Business:</strong> ${data.businessName}</li>
        <li><strong>Contact:</strong> ${data.contactName}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        ${data.website ? `<li><strong>Website:</strong> ${data.website}</li>` : ''}
        ${data.message ? `<li><strong>Message:</strong> ${data.message}</li>` : ''}
      </ul>
    `,
  })
}
