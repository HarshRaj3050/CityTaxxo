import connectDB from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();
    let user = await User.findOne({ email });
    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { message: "Email already exist!" },
        { status: 400 },
      );
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (password.length <= 6) {
      return NextResponse.json(
        { message: "password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    if (user && !user.isEmailVerified) {
      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt,
      });
    }

    await sendMail(
      email,
      "Your OTP for Email Verification",
      `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email - CityTaxxo</title>
</head>

<body style="margin:0;padding:0;background-color:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 30px;background:#0f172a;">
              <h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:700;">
                CityTaxxo
              </h1>
              <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px;">
                Secure Account Verification
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:48px 40px;">

              <h2 style="margin:0 0 16px;color:#111827;font-size:24px;font-weight:600;">
                Verify your email address
              </h2>

              <p style="margin:0 0 20px;color:#4b5563;font-size:16px;line-height:1.7;">
                Thank you for choosing <strong>CityTaxxo</strong>.
                To complete your account setup and secure your account,
                please use the verification code below.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:25px 0;">
                    <div style="
                      display:inline-block;
                      background:#f8fafc;
                      border:1px solid #e5e7eb;
                      border-radius:12px;
                      padding:18px 32px;
                      font-size:34px;
                      font-weight:700;
                      letter-spacing:10px;
                      color:#0f172a;
                    ">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:20px 0 0;color:#4b5563;font-size:15px;line-height:1.7;">
                This verification code will expire in
                <strong>5 minutes</strong>.
              </p>

              <p style="margin:20px 0 0;color:#4b5563;font-size:15px;line-height:1.7;">
                For your security, never share this code with anyone.
                CityTaxxo employees will never ask for your verification code.
              </p>

            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="padding:24px 40px;background:#f8fafc;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
                If you did not request this verification code, you can safely ignore this email.
                No changes will be made to your account without successful verification.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:30px;color:#94a3b8;font-size:13px;">
              © ${new Date().getFullYear()} CityTaxxo. All rights reserved.
              <br />
              This is an automated message. Please do not reply to this email.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
    );

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Register Error: ${error}` },
      { status: 500 },
    );
  }
}
