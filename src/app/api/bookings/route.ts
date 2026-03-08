import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, service, date, endDate, time, message } = body;

        const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
        const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
        const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;

        // Email credentials
        const EMAIL_USER = process.env.EMAIL_USER;
        const EMAIL_PASS = process.env.EMAIL_PASS;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        // 1. Basic configuration check
        if (!CLIENT_EMAIL || !PRIVATE_KEY || !CALENDAR_ID) {
            console.error("CONFIG ERROR: Missing Google API credentials in .env");
            return NextResponse.json({ error: "Booking system is not fully configured." }, { status: 500 });
        }

        const cleanKey = PRIVATE_KEY.replace(/^"+|"+$/g, "").replace(/\\n/g, "\n").trim();
        const cleanSheetId = SHEET_ID?.replace(/^"+|"+$/g, "").trim();

        // 2. Setup Auth with BOTH scopes for single client efficiency
        const auth = new google.auth.JWT({
            email: CLIENT_EMAIL,
            key: cleanKey,
            scopes: [
                "https://www.googleapis.com/auth/calendar",
                "https://www.googleapis.com/auth/spreadsheets"
            ],
        });

        const calendar = google.calendar({ version: "v3", auth });
        const sheets = google.sheets({ version: "v4", auth });

        // 3. AVAILABILITY CHECK
        // Using timeMin/timeMax to check if the specific slot is already taken for THIS service
        const startCheck = new Date(date).toISOString();
        const endCheck = new Date(endDate).toISOString();

        console.log("DEBUG: Checking slot availability...", { service, start: startCheck });

        const existingEvents = await calendar.events.list({
            calendarId: CALENDAR_ID,
            timeMin: startCheck,
            timeMax: endCheck,
            singleEvents: true,
            orderBy: 'startTime'
        });

        const isConflict = existingEvents.data.items?.some(event =>
            event.summary?.toLowerCase().includes(service.toLowerCase())
        );

        if (isConflict) {
            return NextResponse.json(
                { error: `This slot is already booked for ${service}. Please choose another time.` },
                { status: 409 }
            );
        }

        // 4. SAVE TO GOOGLE CALENDAR
        // Added sendUpdates: 'none' to fix Service Account invitation permission errors (403)
        const calResponse = await calendar.events.insert({
            calendarId: CALENDAR_ID,
            sendUpdates: 'none',
            requestBody: {
                summary: `${name} - ${service}`,
                description: `Client: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nNotes: ${message}`.trim(),
                start: { dateTime: date, timeZone: "Asia/Kolkata" },
                end: { dateTime: endDate, timeZone: "Asia/Kolkata" }
            },
        });

        // 5. SAVE TO GOOGLE SHEETS
        if (cleanSheetId) {
            try {
                // Ensure we are targeting "Sheet1" exactly as shown in the screenshot
                await sheets.spreadsheets.values.append({
                    spreadsheetId: cleanSheetId,
                    range: "Sheet1!A:G",
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: [[
                            name,
                            phone,
                            email,
                            service,
                            new Date(date).toLocaleDateString("en-IN"),
                            time,
                            message || "No notes provided"
                        ]]
                    },
                });
                console.log("DEBUG: Successfully saved to Google Sheets");
            } catch (sheetError: any) {
                console.error("SHEETS ERROR DETAILS:", {
                    message: sheetError.message,
                    status: sheetError.status,
                    data: sheetError.response?.data
                });
            }
        }

        // 6. SEND EMAIL NOTIFICATION TO ADMIN
        if (EMAIL_USER && EMAIL_PASS && ADMIN_EMAIL) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: EMAIL_USER,
                        pass: EMAIL_PASS,
                    },
                });

                const mailOptions = {
                    from: `"Angelic Studio Booking" <${EMAIL_USER}>`,
                    to: ADMIN_EMAIL,
                    subject: `New Booking: ${service} - ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h2 style="color: #d4af37;">New Client Booking!</h2>
                            <p>A new appointment has been scheduled.</p>
                            <hr style="border: 0; border-top: 1px solid #eee;" />
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0;"><strong>Client Name:</strong></td><td>${name}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>${service}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Date:</strong></td><td>${new Date(date).toLocaleDateString("en-IN")}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Time:</strong></td><td>${time}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Notes:</strong></td><td>${message || "N/A"}</td></tr>
                            </table>
                            <hr style="border: 0; border-top: 1px solid #eee;" />
                            <p style="font-size: 12px; color: #777;">This is an automated notification from Angelic Salon Website.</p>
                        </div>
                    `,
                };

                await transporter.sendMail(mailOptions);
                console.log("DEBUG: Admin notification email sent successfully");
            } catch (emailError: any) {
                console.error("EMAIL ERROR:", emailError.message);
                // We don't return an error here to the user because the booking was already successful in Calendar/Sheets
            }
        }

        return NextResponse.json({ success: true, eventId: calResponse.data.id });
    } catch (error: any) {
        console.error("CRITICAL BOOKING ERROR:", error.message);
        return NextResponse.json({ error: error.message || "Failed to process booking." }, { status: 500 });
    }
}
