# English with Elizabeth — PWA V6

A mobile-first Progressive Web App for interview-based English learning.

## Included
- Embedded YouTube IFrame player
- Play/pause, seek, speed and caption controls
- Timestamped Sentence Lab
- Shadowing target + browser Text-to-Speech
- Microphone recording + playback
- Browser Speech Recognition when supported
- Speaking Coach and adaptive follow-up
- Local speaking analysis prototype
- Error Bank
- Smart Review
- XP and 30-day progress
- LocalStorage persistence
- PWA manifest + service worker
- Install prompt support

## Run correctly
A PWA/service worker requires HTTPS or localhost.

### Option A — Python
```bash
python -m http.server 8000
```
Open:
http://localhost:8000

### Option B — VS Code Live Server
Serve the folder over localhost.

### Phone
Upload the folder to an HTTPS host (for example your own web server) and open it in Chrome on Android. Then choose **Add to Home screen / Install app**.

## Important content note
The lesson transcript lines in this starter are learning placeholders and should be replaced by authorized/verbatim captions and exact timestamps before public distribution.

Some YouTube videos may disable embedding. The app does not bypass YouTube restrictions.

## AI note
V6 is fully functional as a PWA prototype, but true LLM grammar correction and phoneme-level pronunciation scoring require a secure backend/API. API keys must never be placed in app.js.
