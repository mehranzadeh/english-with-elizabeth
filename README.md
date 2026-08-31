# English with Elizabeth — PWA V9

V9 removes the YouTube IFrame API from the application. YouTube is not used as the in-app player, so the app itself no longer triggers YouTube anti-bot verification.

Hybrid publisher player:
- Official ABC / ABC News / CBS / Television Academy / USC / Apple TV pages are loaded in an in-app iframe when the publisher permits framing.
- If a publisher blocks framing, the app provides an "Open official source" button.
- A future licensed direct MP4/HLS URL can be supplied to the same player layer without changing the learning UI.

Learning features:
- 30-day roadmap
- Vocabulary and expressions
- Sentence Lab
- Shadowing practice
- Text-to-speech
- Microphone recording
- Speech recognition where browser-supported
- Speaking scoring
- Adaptive follow-up
- Smart Review
- XP/progress/error bank
- PWA install and offline shell

Important: V9 does not bypass publisher restrictions or YouTube anti-bot systems and does not redistribute copyrighted videos.


## Version visibility
The home screen always displays the current application version (V9) in a visible badge. Future releases should update `APP_VERSION`, the badge text, manifest/cache version, and release ZIP together.
