# Registration Form

A responsive sign-up page built with plain HTML, CSS and JavaScript: no libraries, no build step.
Built for the Wiya AI Junior Software Engineer technical assessment.

## How to run

Open `index.html` in any modern browser. No server, install or internet connection is needed.

## Features

- **Fields:** Full Name, Email Address, Phone Number, Password, Confirm Password, a Terms & Conditions checkbox and a Create Account button.
- **Responsive:** on wide screens the Wiya logo panel sits on the left of the form; on phones it moves above the form and everything stacks in one column.
- **Validation:** every field is checked, and its error message appears right under it.
  - A field is checked when you leave it, and its error clears as soon as you fix it.
  - Submitting with an invalid field is blocked: all errors show at once and focus moves to the first one.
- **Show / hide password:** a Show/Hide button inside each password field. The passwords are hidden again when the form is cleared.
- **Demo success message** after a valid sign-up, then the form is cleared.
- **Privacy:** there is no backend. Nothing is sent, saved or stored (no requests, no cookies, no `localStorage`), and clearing the form means the password does not stay on the page.
- **Accessibility:** every input has a label, errors are linked with `aria-describedby` and flagged with `aria-invalid`, and the success message is announced to screen readers.

## Validation rules

| Field | Rule |
|---|---|
| Full Name | Required. At least 3 characters: letters in any language, spaces, `'` or `-`. |
| Email Address | Required. Must look like `name@domain.tld`. |
| Phone Number | Required. An optional `+`, then 8 to 15 digits. Spaces, dashes and brackets are ignored. |
| Password | Required. At least 8 characters, with at least one letter and one number. |
| Confirm Password | Required. Must match Password. |
| Terms & Conditions | Must be checked. |

## Project structure

```
index.html     Form markup
styles.css     Layout and theme (colors and sizes are CSS variables in :root)
script.js      Validation, show/hide password and the demo success message
wiya-logo.jpg  The Wiya logo shown in the logo panel
```
