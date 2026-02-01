/**
 * Vercel Serverless Function for Meta Conversion API
 * POST /api/fb-events
 */

const PIXEL_ID = '1679471963050003';
// Ideally this should be in process.env.FB_ACCESS_TOKEN, but using provided token directly as requested
const ACCESS_TOKEN = 'EAATZCGgzfRWgBQvoqdnpcRxR0SXcswHVoiMwOaB24M11pxTRf1ZAioFeyhwe1dZC8ZCCLZBe6ZBSoTu7YlGNowKNNfbzgZCa2OWVsNZBtAoZB5acNZBUjtTUsic9BfZB395EVdflHgUJbxMWNSlPpaG9fv3PjYQkOgaZAMZAA6yZCbhQNMKoZC1Q7Yhlb8MoLebXV7AsE9iHgZDZD';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { eventName, eventId, eventUrl, userData, customData } = request.body;

        // Get client info from request headers
        const clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
        const userAgent = request.headers['user-agent'];

        // Parse cookies for fbp and fbc
        const cookies = parseCookies(request.headers.cookie);
        const fbp = cookies['_fbp'];
        const fbc = cookies['_fbc'];

        const currentTimestamp = Math.floor(Date.now() / 1000);

        const checkIsArray = Array.isArray(customData);
        const customDataObj = checkIsArray ? {} : customData;

        const eventPayload = {
            data: [
                {
                    event_name: eventName,
                    event_time: currentTimestamp,
                    message: "ViewContent triggered via CAPI check",
                    event_id: eventId,
                    event_source_url: eventUrl,
                    action_source: "website",
                    user_data: {
                        client_ip_address: clientIp,
                        client_user_agent: userAgent,
                        fbp: fbp || undefined,
                        fbc: fbc || undefined,
                        ...userData // Merge any other user data provided
                    },
                    custom_data: customDataObj
                }
            ]
            // test_event_code: 'TEST1234' // Optional: Uncomment for testing in Events Manager
        };

        const fbResponse = await fetch(
            `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventPayload),
            }
        );

        const fbResult = await fbResponse.json();

        if (!fbResponse.ok) {
            console.error('[CAPI] External Error:', fbResult);
            return response.status(400).json({ error: 'Failed to send to Facebook', details: fbResult });
        }

        return response.status(200).json({ success: true, fbResult });

    } catch (error) {
        console.error('[CAPI] Internal Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}

function parseCookies(cookieHeader) {
    const list = {};
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function (cookie) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}
