# Security

- XSS prevention: user text is escaped with escapeHtml() or inserted with textContent, never raw innerHTML.
- Safe storage: localStorage data is read with safeParse(), so corrupted data cannot crash the app.
- No secrets: no API keys or tokens in the code. Any future AI API must go through a backend.
- Content Security Policy declared in index.html.
- No third-party tracking, no network requests with user text.
- External links use rel="noopener noreferrer".
- Zero runtime dependencies.

Report issues by opening a GitHub issue titled "Security".
