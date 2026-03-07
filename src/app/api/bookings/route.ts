import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, service, date, endDate, time, message } = body;

        const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
        const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
        const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;

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

                // Note: If you renamed your sheet tab from "Sheet1", this will fail with 400 or 404.
                // Note: Ensure the service account has "Editor" access to the specific sheet.
            }
        }

        return NextResponse.json({ success: true, eventId: calResponse.data.id });
    } catch (error: any) {
        console.error("CRITICAL BOOKING ERROR:", error.message);
        return NextResponse.json({ error: error.message || "Failed to process booking." }, { status: 500 });
    }
}
