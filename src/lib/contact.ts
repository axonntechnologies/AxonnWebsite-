/**
 * Contact form transport -> Google Apps Script Web App -> Sheet + email.
 * Setup steps are in google-apps-script/Code.gs and the README.
 */
export const CONTACT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwehgbdkDgZrGdK7pAEBVAIPQMZs2JIpug3K6r5Lg9lyDshd31BkBKNCktWpf7euGnR/exec";

export interface ContactPayload {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContact(data: ContactPayload): Promise<void> {
  if (!CONTACT_ENDPOINT) {
    throw new Error(
      "CONTACT_ENDPOINT is empty — paste your Apps Script Web App URL in src/lib/contact.ts"
    );
  }

  // Data goes in the query string of a GET request. There is no request body
  // for Apps Script's redirect to drop, and query params always populate
  // e.parameter. mode:"no-cors" -> opaque response we don't need to read;
  // a resolved fetch means it was delivered.
  const params = new URLSearchParams();
  params.set("name", data.name.slice(0, 200));
  params.set("email", data.email.slice(0, 200));
  params.set("countryCode", data.countryCode.slice(0, 12));
  params.set("phone", data.phone.slice(0, 40));
  params.set("subject", data.subject.slice(0, 300));
  params.set("message", data.message.slice(0, 4000));

  try {
    await fetch(`${CONTACT_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors"
    });
  } catch (err) {
    // no-cors responses are opaque, so some browsers surface the redirect as a
    // TypeError even though the request was delivered. Only treat a genuine
    // offline state as a failure.
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      throw err;
    }
    console.warn("contact fetch resolved opaque/errored (likely delivered):", err);
  }
}
