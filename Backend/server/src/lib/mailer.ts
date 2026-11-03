import nodemailer from "nodemailer";

export interface Mailer {
  send(message: { to: string; subject: string; body: string }): Promise<void>;
}

export const mailer: Mailer = {
  async send({ to, subject, body }): Promise<void> {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, SMTP_SECURE } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      console.warn("Email not sent: SMTP_HOST, SMTP_USER, and SMTP_PASSWORD must be configured.");
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: SMTP_SECURE === "true",
        auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      });
      await transporter.sendMail({ from: SMTP_FROM || SMTP_USER, to, subject, text: body });
    } catch (error) {
      console.warn("Email delivery failed:", error instanceof Error ? error.message : error);
    }
  },
};
