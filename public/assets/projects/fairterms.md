# FairTerms

> Summarise Terms and Conditions and Privacy Policies into clear bullets, locally in the browser.

## Overview

FairTerms is a Chrome extension that reads the Terms and Conditions or Privacy Policy of the current tab and produces a short, direct summary with a Potential Risks section. It is designed for users who want a fast way to understand long legal text before accepting it.

It was created for the TikTok Singapore Hackathon in 2025

## Problem

- Policy pages are long, dense, and difficult to scan quickly.
- Most users accept terms without understanding key clauses or risks.
- Existing summarisation tools often require sending private page text to external servers.

## Solution

- Built a one-click Chrome extension popup that summarises the active page.
- Added an on-device AI pipeline using WebGPU so inference runs locally.
- Produced markdown-formatted output split into Key Terms and Potential Risks.
- Implemented resilient background state and progress feedback for smoother UX.

## Your Role

- Role: Lead Developer
- Team: 5 Developers consisting of CS undergrads
- Timeline: 48 Hrs

## Key Features

1. **One-Click Summarisation**: Starts extraction and summarisation from the popup with a single action.
2. **On-Device AI Summarisation**: Runs inference locally via WebGPU, without sending page text to a server.
3. **Live Progress Feedback**: Shows loading and summarisation progress to keep users informed.
4. **Markdown Output**: Renders clean, readable summaries with sectioned formatting.
5. **Smart Content Extraction**: Focuses on high-signal policy content from the current tab.

## Tech Stack

| Area | Tools |
| - | - |
| Frontend | React, TypeScript |
| Build Tooling | Vite, @vitejs/plugin-react |
| AI Inference | @mlc-ai/web-llm, WebGPU |
| Rendering | react-markdown, remark-gfm |
| Extension Platform | Chrome MV3 APIs (service worker, content scripts, offscreen documents) |

## Architecture / Implementation Notes

- Uses a focused summarisation pipeline: extract text, run model inference, then format into user-readable sections.
- Uses an offscreen document with MV3 background coordination to keep model work isolated from popup lifecycle limits.
- Preserves state in the background layer so popup reopen events do not lose progress.
- Chooses local inference over cloud APIs to prioritize privacy and avoid transmitting policy text.

## Challenges & How You Solved Them

1. **Challenge**: Browser extension contexts are short-lived, especially popup UI.
	**Fix**: Moved long-running tasks into background and offscreen contexts and synchronized state updates to the popup.
2. **Challenge**: Users need confidence while model assets load and inference runs.
	**Fix**: Added live progress feedback and clear status transitions so users understand current execution state.
3. **Challenge**: Legal pages vary widely in layout and content quality.
	**Fix**: Implemented smarter extraction logic and fallback behavior for low-content pages.

## Results / Impact

- Quantitative: Delivers concise summaries from long policy text in a single interaction flow.
- Qualitative: Improves readability by presenting key points and risks in a direct format.
- Business/User outcome: Helps users make faster, more informed consent decisions.

## Source Code

- GitHub Repo: [https://github.com/not-a-scam/FairTerms]

## What I'd Improve Next

- Add broader extraction heuristics for heavily dynamic policy pages.
- Add model and prompt configuration profiles for speed versus depth.
- Add citation mapping from summary bullets back to source passages.

## Quick Summary

FairTerms is a privacy-first Chrome extension that uses on-device AI to summarise Terms and Conditions and Privacy Policies into clear, markdown-formatted sections, including potential risks. By combining MV3 extension architecture, WebGPU inference, and resilient background state, it turns dense legal pages into faster, more actionable reading.
