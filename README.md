# ThinkFirst AI — Working Website

ThinkFirst AI is a functional, browser-based writing-practice application designed around your PromptWars hackathon problem statement: helping students practise independent thinking and writing rather than merely detecting AI-generated text.

## Run it
1. Extract `thinkfirst-ai-website.zip`.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox).
3. No install or build step is required.

For local development, you can also serve the folder with any static web server.

## Working features
- Topic selection and category filters
- Guided thinking questions
- Argument-map builder based on the student's own answers
- Writing editor, word and character counts
- Rule-based writing feedback for clarity, reasoning, evidence, counterarguments and sentence length
- Draft saving and revisions in browser local storage
- Progress page and JSON data export
- Responsive desktop/mobile layout

## Important scope notes
- This is a working client-side website, not a screenshot-only prototype.
- Writing feedback is rule-based and runs in the browser. It is not a generative AI model, AI detector, plagiarism checker, or proof of a student's cognitive process.
- Data stays in the current browser/device. There is no account system, server database, multi-device sync, or teacher dashboard.
- To add real generative AI feedback or shared accounts, a secure backend/API integration is needed. Never put a private AI API key directly into client-side HTML/JavaScript.

## Deploy
This is a static website. Upload `index.html` to a static hosting service such as GitHub Pages, Netlify, or Vercel. If you add a backend later, deploy that separately.
