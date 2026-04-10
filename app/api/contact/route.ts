import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Validate basic fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS?.replace(/\s+/g, "");

        if (!user || !pass) {
            console.error("Missing email configuration environment variables.");
            return NextResponse.json(
                { error: "Server configuration error. Missing credentials." },
                { status: 500 }
            );
        }

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: user,
                pass: pass,
            },
        });

        // Email layout
        const mailOptions = {
            from: user,
            to: user, // Sending the email to yourself
            replyTo: email, // This allows you to directly reply to the user's email
            subject: `Portfolio Contact: ${subject || "No Subject"} - from ${name}`,
            html: `
                <h3>New Mission Transmission via Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <br />
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Transmission error:", error);
        return NextResponse.json(
            { error: "Failed to send transmission. Please try again later." },
            { status: 500 }
        );
    }
}
