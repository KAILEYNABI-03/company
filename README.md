# Badishagadi Projects website

A responsive, static HTML/CSS/JavaScript website with a Cloudflare Pages Function for secure server-side enquiry email delivery.

## Files
- `index.html` — website content and enquiry form
- `styles.css` — responsive styling
- `script.js` — mobile navigation and form submission
- `functions/api/contact.js` — server-side enquiry API
- `_headers` — baseline browser security headers

## Deploy free with Cloudflare Pages (recommended)

1. Create a free account at https://dash.cloudflare.com/
2. Create a GitHub account at https://github.com/ if you do not already have one.
3. Unzip this project on your computer.
4. In GitHub, create a new **public or private repository** named `badishagadi-website`.
5. Upload the contents of this folder to the repository. Make sure `index.html`, `styles.css`, `script.js`, `_headers`, and the `functions` folder are at the repository root.
6. In Cloudflare Dashboard, open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
7. Choose the repository.
8. Set Framework preset to **None**. Set Build command to blank (or no build command). Set Build output directory to `/` (root). Save and deploy.
9. Cloudflare will provide a public `*.pages.dev` address. Open it on a phone and computer to test.

## Enable the enquiry backend (Resend)

The site itself works without an email provider, but the enquiry form needs a server-side email service to deliver submissions.

1. Create an account at https://resend.com/.
2. Verify a sending domain you control in Resend. Use an address on that verified domain for the sender, for example `Website <website@yourverifieddomain.co.za>`. Do not use the customer's email as the sender.
3. In Cloudflare Pages, open your project → **Settings** → **Variables and Secrets** (or **Environment variables**).
4. Add these as **encrypted secrets** for Production:
   - `RESEND_API_KEY` = your Resend API key
   - `CONTACT_TO_EMAIL` = `badishagadiprojects@outlook.com`
   - `CONTACT_FROM_EMAIL` = your verified sender address, e.g. `Badishagadi Website <website@yourverifieddomain.co.za>`
5. Save and trigger a new deployment.
6. Test the form with a real enquiry and check the receiving inbox and spam folder.

Never put the Resend API key in `index.html`, `script.js`, GitHub, or any browser-visible file. Keep it only in Cloudflare's encrypted secret settings.

## Security notes and recommended production hardening

- The API validates fields on the server, limits request size, rejects unexpected origins, uses a hidden honeypot field, and does not expose provider error details.
- `_headers` adds baseline security headers. Review CSP if you later add third-party scripts, analytics, maps, or embedded content.
- Add a Cloudflare WAF/rate-limiting rule for `/api/contact` (for example, limit repeated POST requests from a single IP). This is important because an email endpoint can otherwise be abused. Cloudflare's available rate-limiting features depend on account/product availability.
- For stronger bot protection, add Cloudflare Turnstile and verify its token in the function before sending email.
- Do not collect identity numbers, payment details, passwords, or unnecessary personal information in this form.
- This simple form sends enquiries by email; it is not an order management system or a database/CRM. Add a database only if you need customer accounts, order tracking, or a quotation dashboard.
- A static website cannot keep private API keys in the frontend. The included email integration keeps the Resend key server-side.

## Before publishing

- Confirm all contact details and the wording of the company references.
- Add the company's approved logo file if a high-resolution logo is available. The current header uses a clean text-and-symbol brand mark.
- Consider adding a privacy notice page explaining how enquiry details are handled.
- Test the enquiry form after setting the three environment variables.
- A custom domain is optional. Cloudflare's `pages.dev` address is public and free; you can connect a purchased domain later.

## Company information used
Content is based on the supplied Badishagadi Projects (Pty) Ltd company profile. The tax number is intentionally not displayed publicly on the website.
