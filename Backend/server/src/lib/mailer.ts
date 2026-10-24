export interface Mailer {
  send(message: { to: string; subject: string; body: string }): Promise<void>;
}

export const mailer: Mailer = {
  async send({ to, subject }): Promise<void> {
    console.log("Email queued:", { to, subject });
  },
};

// TODO: Swap for Nodemailer/Resend in production.
