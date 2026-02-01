/**
 * Meta Pixel & CAPI Integration Utilities
 */

const PIXEL_ID = '1679471963050003';

/**
 * Initialize Meta Pixel
 * Should be called once on app startup
 */
export function initPixel() {
    if (typeof window === 'undefined') return;

    // Standard Meta Pixel Code
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
}

/**
 * Track an event (Browser Side + attempt functionality for CAPI trigger)
 * @param {string} eventName - Standard or Custom Event Name (e.g., 'ViewContent')
 * @param {object} data - Event parameters
 */
export async function trackEvent(eventName, data = {}) {
    if (typeof window !== 'undefined' && window.fbq) {
        // 1. Fire Browser Event
        window.fbq('track', eventName, data);
        console.log(`[Pixel] Fired '${eventName}'`, data);

        // 2. Fire Server Event (CAPI) via backend proxy
        // We send payload to our own API to protect the token
        try {
            const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            const payload = {
                eventName,
                eventId,
                eventUrl: window.location.href,
                userData: {
                    // If we had user info (email/phone), we'd hash and send it here
                    // For now, we rely on fbp/fbc cookies which the server function will parse if forwarded
                },
                customData: data
            };

            // Fire and forget - don't block UI
            fetch('/api/fb-events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).catch(err => console.warn('[CAPI] Failed to send event', err));

        } catch (e) {
            console.warn('[CAPI] Error preparing request', e);
        }
    }
}
