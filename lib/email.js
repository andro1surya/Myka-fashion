import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const isResendConfigured = Boolean(
  resendApiKey &&
  resendApiKey.startsWith('re_') &&
  !resendApiKey.includes('123456789')
);

const resend = isResendConfigured ? new Resend(resendApiKey) : null;

const SENDER = process.env.EMAIL_FROM || 'MYKA FASHION Wholesale <inquiries@mykafashion.com>';
const SALES_EMAIL = process.env.SALES_NOTIFICATION_EMAIL || 'wholesale@mykafashion.com';

/**
 * Format inquiry items list for HTML emails
 */
function renderItemsHtml(items = []) {
  if (!items || items.length === 0) {
    return '<p style="color: #666; font-style: italic;">No specific styles attached. General collection inquiry.</p>';
  }

  const rows = items.map(item => `
    <tr style="border-bottom: 1px solid #ECE7DE;">
      <td style="padding: 10px 12px; font-weight: 600; color: #14213D;">${item.sku || 'N/A'}</td>
      <td style="padding: 10px 12px; color: #2B2B2B;">${item.productName || 'Garment'}</td>
      <td style="padding: 10px 12px; color: #B8893B; font-weight: 600; text-align: center;">${item.quantity || 1} pcs</td>
      <td style="padding: 10px 12px; color: #666; font-size: 13px;">${item.colorNotes || 'Standard'}${item.isSampleRequest ? ' <span style="background: #E8EDF5; color: #14213D; padding: 2px 6px; border-radius: 4px; font-size: 11px;">Sample</span>' : ''}</td>
    </tr>
  `).join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-family: sans-serif; font-size: 14px;">
      <thead>
        <tr style="background-color: #F4EFE6; text-align: left; color: #14213D;">
          <th style="padding: 10px 12px; font-size: 12px; text-transform: uppercase;">SKU</th>
          <th style="padding: 10px 12px; font-size: 12px; text-transform: uppercase;">Style</th>
          <th style="padding: 10px 12px; font-size: 12px; text-transform: uppercase; text-align: center;">Quantity</th>
          <th style="padding: 10px 12px; font-size: 12px; text-transform: uppercase;">Specifications</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

/**
 * Dispatch buyer confirmation email
 */
export async function sendBuyerConfirmation(inquiry) {
  if (!isResendConfigured) {
    console.info(`[Resend Simulated] Buyer confirmation email dispatched to ${inquiry.businessEmail} for ${inquiry.inquiryNumber}`);
    return { success: true, simulated: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Inquiry Confirmation - ${inquiry.inquiryNumber}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F8F6F2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2B2B2B;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F6F2; padding: 40px 15px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
              
              <!-- Brand Header -->
              <tr>
                <td style="background-color: #14213D; padding: 36px 40px; text-align: center;">
                  <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; letter-spacing: 3px; color: #FAF0CA; text-transform: uppercase;">MYKA FASHION</h1>
                  <p style="margin: 6px 0 0; color: #B8893B; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">B2B Wholesale & Global Garment Export</p>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="font-family: Georgia, serif; color: #14213D; margin-top: 0; font-size: 20px;">Wholesale Inquiry Received</h2>
                  <p style="font-size: 15px; line-height: 1.6; color: #4A4A4A;">
                    Dear <strong>${inquiry.fullName}</strong>,
                  </p>
                  <p style="font-size: 15px; line-height: 1.6; color: #4A4A4A;">
                    Thank you for contacting the export desk at <strong>MYKA FASHION</strong>. We have logged your wholesale inquiry under reference number:
                  </p>
                  
                  <div style="background-color: #F4EFE6; border-left: 4px solid #B8893B; padding: 14px 20px; margin: 24px 0;">
                    <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Inquiry Reference</p>
                    <p style="margin: 4px 0 0; font-size: 22px; font-weight: bold; color: #14213D; letter-spacing: 1px;">${inquiry.inquiryNumber}</p>
                  </div>

                  <h3 style="font-size: 16px; color: #14213D; margin: 28px 0 12px; font-family: Georgia, serif;">Requested Styles & Quantities</h3>
                  ${renderItemsHtml(inquiry.items)}

                  <div style="margin-top: 24px; padding: 16px; background-color: #FAF9F6; border-radius: 4px; font-size: 14px; line-height: 1.5;">
                    <p style="margin: 0 0 8px;"><strong>Estimated Order Volume:</strong> ${inquiry.estimatedQuantity} pieces</p>
                    <p style="margin: 0 0 8px;"><strong>Buyer Classification:</strong> ${inquiry.buyerType}</p>
                    <p style="margin: 0 0 8px;"><strong>Country of Delivery:</strong> ${inquiry.country}</p>
                    ${inquiry.message ? `<p style="margin: 8px 0 0; font-style: italic; color: #555;">&ldquo;${inquiry.message}&rdquo;</p>` : ''}
                  </div>

                  <h3 style="font-size: 16px; color: #14213D; margin: 32px 0 12px; font-family: Georgia, serif;">Next Steps</h3>
                  <p style="font-size: 14px; line-height: 1.6; color: #4A4A4A;">
                    Our merchandising team will review your specifications, prepare FOB/CIF pricing tier options, and respond within <strong>24 business hours</strong> with sampling timelines and material details.
                  </p>

                  <table width="100%" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ECE7DE;">
                    <tr>
                      <td style="font-size: 13px; color: #777;">
                        For urgent inquiries or sampling consultations, contact our export desk:
                        <br />
                        <strong style="color: #14213D;">Email:</strong> wholesale@mykafashion.com
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #14213D; padding: 24px 40px; text-align: center; color: #A0B2C6; font-size: 12px;">
                  <p style="margin: 0;">&copy; ${new Date().getFullYear()} MYKA FASHION. Indian Garment Export & Private Label Manufacturing.</p>
                  <p style="margin: 6px 0 0; font-size: 11px; color: #8A9CA8;">This is an inquiry acknowledgment, not a payable invoice or commercial bill.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const res = await resend.emails.send({
      from: SENDER,
      to: [inquiry.businessEmail],
      subject: `[${inquiry.inquiryNumber}] Wholesale Inquiry Acknowledgment - MYKA FASHION`,
      html
    });
    return { success: true, id: res.data?.id };
  } catch (err) {
    console.error('Failed to send buyer confirmation via Resend:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Dispatch sales notification email to business team
 */
export async function sendSalesNotification(inquiry) {
  if (!isResendConfigured) {
    console.info(`[Resend Simulated] Sales team notification dispatched to ${SALES_EMAIL} for ${inquiry.inquiryNumber}`);
    return { success: true, simulated: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: sans-serif; color: #2B2B2B; line-height: 1.5; padding: 20px;">
      <h2 style="color: #14213D;">New B2B Wholesale Inquiry: ${inquiry.inquiryNumber}</h2>
      <p>A new buyer has submitted a wholesale inquiry on <strong>MYKA FASHION</strong>.</p>
      
      <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Buyer Name:</td><td>${inquiry.fullName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Company:</td><td>${inquiry.companyName}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Business Email:</td><td><a href="mailto:${inquiry.businessEmail}">${inquiry.businessEmail}</a></td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Phone / WhatsApp:</td><td>${inquiry.phone}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Country:</td><td>${inquiry.country}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Buyer Type:</td><td>${inquiry.buyerType}</td></tr>
        ${inquiry.gstNumber ? `<tr><td style="padding: 6px 0; font-weight: bold;">GST Number:</td><td>${inquiry.gstNumber}</td></tr>` : ''}
        <tr><td style="padding: 6px 0; font-weight: bold;">Est. Quantity:</td><td>${inquiry.estimatedQuantity} pieces</td></tr>
        ${inquiry.attachmentUrl ? `<tr><td style="padding: 6px 0; font-weight: bold;">Attachment:</td><td><a href="${inquiry.attachmentUrl}">View Tech Pack / Attachment</a></td></tr>` : ''}
      </table>

      <h3>Buyer Message:</h3>
      <blockquote style="background: #F4EFE6; padding: 12px 16px; border-left: 4px solid #14213D; margin: 0 0 20px 0;">
        ${inquiry.message || 'No additional message.'}
      </blockquote>

      <h3>Shortlisted Products:</h3>
      ${renderItemsHtml(inquiry.items)}

      <p style="margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin" style="background: #14213D; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Open Admin Dashboard
        </a>
      </p>
    </body>
    </html>
  `;

  try {
    const res = await resend.emails.send({
      from: SENDER,
      to: [SALES_EMAIL],
      subject: `🚨 [NEW INQUIRY] ${inquiry.inquiryNumber} - ${inquiry.companyName} (${inquiry.country})`,
      html
    });
    return { success: true, id: res.data?.id };
  } catch (err) {
    console.error('Failed to send sales notification via Resend:', err);
    return { success: false, error: err.message };
  }
}
