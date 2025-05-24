# Live Demo

**[https://finai-ui.vercel.app](https://finai-ui.vercel.app)**

---

## Overview

Fin AI UI is a conversational copilot built atop a modern Next.js + Tailwind frontend. It blends chat, AI-powered message transformations, and rich-formatting tools into a sleek Intercom-like interface.

Key features:

* **Three‑column layout** on desktop (Sidebar | Conversation | AI Copilot)
* **Collapsible sidebar** for chat navigation on mobile
* **Conversation feed** with responsive, wrapping bubbles
* **AI Copilot panel** for context-aware suggestions
* **Rich text input** with bold, italic, headers, lists, and links
* **AI tone transforms** (Rephrase, Friendly, Formal, Grammar fix, Translate)
* **Emoji picker** for inserting emojis inline
* **Autosizing input** that expands vertically, not scrolls horizontally
* **Loading animation** during AI calls
* **Dynamic metadata** via `generateMetadata`

---

## AI Tone Transformations

Under the selection toolbar, click **AI**, choose a transform:

* **Rephrase**: Rewrite preserving meaning
* **My tone of voice**: Match your style
* **More friendly**: Softer, casual phrasing
* **More formal**: Professional tone
* **Fix grammar & spelling**: Clean up typos & grammar
* **Translate...**: Translate selected text

Each triggers a call to the Gemini API at `/api/gemini`, sending just the system+user prompt and returning the transformed snippet.

---

## Rich‑Formatting Toolbar

Select text in the input to reveal formatting options:

* **B**: Bold
* **I**: Italic
* **H1 / H2**: Headers
* **• List**: Unordered list
* **Link**: Insert hyperlink
* **Bot**: Horizontal rule / AI commands

Emojis (😊) in the bottom toolbar pull up an inline palette of common emojis.

---

## Deployment

This project is deployed on Vercel: [finai-ui.vercel.app](https://finai-ui.vercel.app)

To run locally:

```bash
npm install
npm run dev
```

---

## Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Styling**: Tailwind CSS
* **Icons**: lucide-react
* **AI Client**: @google/generative-ai (Gemini)
* **Data**: dummyChats, client‑side state

---

## License

MIT © Your Name
