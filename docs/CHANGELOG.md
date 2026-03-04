# Changelog

All notable changes to English Mastery Hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2025-03-04

### Added

- **Vocabulary Module** — 32 professional terms across 4 domains (Data Science, SaaS, Business, Interview) with phonetic transcriptions, definitions, and contextual examples
- **Verb Mastery Module** — 16 exercises covering advanced tenses (Future Perfect, Past Perfect Continuous, Conditionals) and business phrasal verbs
- **AI Conversation Practice** — 4 role-play scenarios (Job Interview, Sprint Planning, C-Suite Presentation, Client Discovery) powered by Claude API with real-time English feedback
- **Writing Lab** — 4 professional writing prompts (LinkedIn Post, Executive Email, SaaS Copy, Slack Message) with AI-powered feedback including scoring, corrections, and rewritten versions
- **Interview Prep** — 12 curated questions across Behavioral, Technical, and Culture categories with coaching tips and power phrases
- **Daily Expressions** — 8 business idioms with meaning, context, and usage examples
- **Yamazing Corp Design System** — Premium warm-toned design with light/dark theme toggle
- **Theme Toggle** — Seamless light/dark mode switching with animated transition
- **Streak System** — Tracks consecutive correct answers for motivation
- **Progress Indicators** — Per-module progress bars and score badges

### Design

- Typography: Outfit (display) + Plus Jakarta Sans (body)
- Light theme: Warm white (#FAFAF7) with amber gold (#D4A017) accents
- Dark theme: Deep slate (#0E1117) with bright gold (#F0C246) accents
- Glassmorphism navbar with backdrop blur
- 22px border-radius cards with gradient overlays
- Animated page transitions (fadeUp) and hover elevations
- Dot pattern textures on hero section

### Technical

- React 18 with Hooks (functional components only)
- CSS-in-JS with theme tokens for full light/dark support
- Anthropic Claude API integration (claude-sonnet-4-20250514)
- Vite 5.x build system
- Zero external UI dependencies (pure React)
