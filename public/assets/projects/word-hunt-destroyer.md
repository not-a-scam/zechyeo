# Word Hunt Destroyer

> Automates solving and tracing words for iMessage/GamePigeon-style Word Hunt boards on macOS.

## Overview

Word Hunt Destroyer is a Python automation tool that reads a 4x4 Word Hunt board from screen capture, finds valid words with trie-backed search, and drags the mouse across matching paths to play them. It is built for macOS users running iPhone Mirroring (or any stable on-screen board setup) who want reproducible OCR-plus-automation workflows.

I made this primarily to beat my friends because they were just better than me :(

## Problem

- Solving Word Hunt boards manually is repetitive and speed-limited.
- OCR for letter grids is sensitive to screen position, crop windows, and tile boundaries.
- Even after finding words, accurately tracing letter paths at speed is tedious.

## Solution

- Captures a fixed board region using calibrated screenshot bounds.
- Detects board letters with per-letter template matching.
- Solves all valid 3+ letter words using a trie-backed dictionary traversal.
- Replays solutions by dragging the mouse through each word path automatically.

## Your Role

- Role: Solo Developer
- Team: Solo
- Timeline: Personal project (iterative)

## Key Features

1. **Board Capture Pipeline**: Grabs a stable screen region and slices it into grid cells for downstream detection.
2. **Template-Based OCR**: Matches each tile against letter templates stored in `data/templates` for deterministic recognition.
3. **Trie-Backed Solver**: Efficiently enumerates valid words from the detected board without brute-forcing all combinations.
4. **Mouse Path Automation**: Converts solved words into coordinate paths and drags them on screen to play automatically.
5. **Safety Controls**: Supports dry-run modes and `Esc` abort during live automation.

## Tech Stack

| Area | Tools |
| - | - |
| Language | Python 3.10+ |
| Computer Vision | Template matching (OpenCV/Pillow-style image workflow) |
| Automation | macOS mouse control / keyboard interruption |
| Data | JSON word dictionary, PNG letter templates |
| Tooling | Virtual environment + pip requirements |

## Architecture / Implementation Notes

- Uses fixed calibration constants in `detector/detector.py` (`SS_LEFT`, `SS_TOP`, `SS_WIDTH`, `SS_HEIGHT`) to define the screenshot region as `(left, top, width, height)`.
- Separates board crop bounds from grid slicing offsets (`GRID_LEFT_OFFSET`, `GRID_RIGHT_OFFSET`, `GRID_TOP_OFFSET`, `GRID_BOTTOM_OFFSET`, `GRID_GUTTER`) so capture and tile extraction can be tuned independently.
- Maintains a template generation workflow (`scripts/generate_templates.py`) to improve OCR accuracy for each user setup.
- Provides inspection tooling (`scripts/inspect_scores.py`) to debug match confidence per cell before running live automation.

## Challenges & How You Solved Them

1. **Challenge**: OCR breaks when window position or scale changes.
	**Fix**: Exposed screenshot and grid constants for direct calibration and documented which values to tune.
2. **Challenge**: Template quality heavily impacts letter detection.
	**Fix**: Added a template generation script with both direct-letter and interactive labeling modes.
3. **Challenge**: Live automation can fail fast if alignment is off.
	**Fix**: Added dry-run playback and immediate `Esc` abort to test safely before enabling full live mode.

## Results / Impact

- Quantitative: Automates a full board cycle from capture to word playback in one command.
- Qualitative: Removes repetitive manual tracing and provides a repeatable tuning workflow for better detection.
- User outcome: Faster experimentation for puzzle-solving automation on stable macOS mirror setups.

## Demo

- Live Demo: [Watch Demo](/assets/videos/word_hunt_destroyer_demo.mov)
- GitHub Repo: [https://github.com/not-a-scam/WordHuntDestroyer]

## What I'd Improve Next

- Add auto-calibration to reduce manual tuning of `SS_*` and `GRID_*` constants.
- Add confidence-based fallback logic for ambiguous tile matches.
- Add optional benchmark mode to compare solver speed and detection accuracy across template sets.

## Quick Summary

Word Hunt Destroyer is a macOS Python project that combines screenshot-based board capture, template-driven OCR, trie-based word solving, and mouse automation to play Word Hunt boards end-to-end. Its core value is a practical, tunable pipeline that makes puzzle automation repeatable and fast for stable mirrored-screen setups.
