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
<html>
<head>
  <meta charset="UTF-8" />
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="padding:30px;text-align:center;background:#111827;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 30px;">
              <p style="margin:0 0 16px;color:#333;font-size:16px;">
                Hello,
              </p>

              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
                Use the following One-Time Password (OTP) to verify your account.
                This code is valid for the next 10 minutes.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <span
                  style="
                    display:inline-block;
                    padding:14px 28px;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    color:#111827;
                    background:#f3f4f6;
                    border-radius:8px;
                  "
                >
                  ${otp}
                </span>
              </div>

              <p style="margin:24px 0 0;color:#555;font-size:14px;line-height:1.6;">
                If you did not request this verification code, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px;text-align:center;background:#f9fafb;color:#888;font-size:12px;">
              © ${new Date().getFullYear()} CityTaxxo. All rights reserved.
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
