# Architecture

## Overview

English Mastery Hub is a single-page React application designed as a modular learning platform. It follows a component-centric architecture where each learning module is self-contained within the main `App` component, sharing a unified design system and theme context.

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                  Client Browser                  │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │              React Application              │ │
│  │                                             │ │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────┐  │ │
│  │  │ Theme   │  │  Router   │  │  State    │  │ │
│  │  │ System  │  │ (module)  │  │  Manager  │  │ │
│  │  └────┬────┘  └────┬─────┘  └─────┬─────┘  │ │
│  │       │            │               │         │ │
│  │  ┌────┴────────────┴───────────────┴──────┐  │ │
│  │  │           Module Renderer              │  │ │
│  │  │                                        │  │ │
│  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │  │ │
│  │  │  │Vocab │ │Verbs │ │ Conv │ │Write │  │  │ │
│  │  │  └──────┘ └──────┘ └──┬───┘ └──┬───┘  │  │ │
│  │  │  ┌──────┐ ┌──────┐    │        │      │  │ │
│  │  │  │Inter │ │Daily │    │        │      │  │ │
│  │  │  └──────┘ └──────┘    │        │      │  │ │
│  │  └───────────────────────┼────────┼──────┘  │ │
│  └──────────────────────────┼────────┼─────────┘ │
│                             │        │           │
└─────────────────────────────┼────────┼───────────┘
                              │        │
                    ┌─────────┴────────┴──────────┐
                    │     Anthropic Claude API     │
                    │   claude-sonnet-4-20250514   │
                    └─────────────────────────────┘
```

## Module Architecture

### Module System

The application uses a simple string-based routing system rather than a full router library. Each module is identified by a constant and rendered via a switch in the main `renderMod()` function.

```javascript
const M = {
  DASH: "d",     // Dashboard / Home
  VOCAB: "v",    // Vocabulary flashcards
  VERBS: "vb",   // Verb conjugation exercises
  CONV: "c",     // AI Conversation practice
  WRITE: "w",    // Writing lab
  INT: "i",      // Interview prep
};
```

### Data Flow

```
Static Data (vocabSets, verbExercises, etc.)
    │
    ▼
React State (useState hooks)
    │
    ▼
Module Renderers ──► UI Components (Card, Btn, Badge, Pill)
    │
    ▼
User Interaction
    │
    ├──► Local State Update (vocab flip, verb check, navigation)
    │
    └──► API Call (conversation, writing feedback)
            │
            ▼
        Claude API Response
            │
            ▼
        State Update ──► Re-render
```

### AI Integration

Two modules use the Claude API:

1. **Conversation Practice** — Multi-turn chat with system prompts defining the role-play scenario. Full conversation history is sent with each request to maintain context.

2. **Writing Lab** — Single-turn evaluation. The user's writing and the task criteria are sent as a single request, and Claude returns structured feedback.

```javascript
// API call pattern
const callClaude = async (systemPrompt, messages) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });
  const data = await response.json();
  return data.content?.map(b => b.text || "").join("\n");
};
```

## Theme System

The theme system uses a dual-theme object that provides all color tokens:

```javascript
const THEMES = {
  light: { bg, bgCard, accent, text, ... },
  dark:  { bg, bgCard, accent, text, ... },
};

// Active theme selected by boolean toggle
const th = isDark ? THEMES.dark : THEMES.light;
```

All UI components consume `th` tokens directly via inline styles. This ensures every element automatically adapts when the theme toggles.

## State Management

The application uses React's built-in `useState` hooks for all state management. No external state library is needed at the current scale. Key state groups:

| Group | States | Purpose |
|-------|--------|---------|
| Navigation | `mod`, `anim` | Active module, animation key |
| Theme | `dk` | Dark mode toggle |
| Vocabulary | `vsi`, `vci`, `showDef`, `vScore` | Set index, card index, reveal state, scores |
| Verbs | `bsi`, `bi`, `bAns`, `bFb`, `bScore` | Set index, exercise index, answer, feedback, scores |
| Conversation | `si`, `msgs`, `cin`, `cLoad` | Scenario index, messages, input, loading |
| Writing | `wi`, `wTxt`, `wFb`, `wLoad` | Prompt index, text, feedback, loading |
| Interview | `iCat`, `iQ`, `showTip` | Category, question index, tip visibility |
| Global | `streak`, `expI` | Streak count, daily expression index |

## Performance Considerations

- **useCallback** on all event handlers and API calls to prevent unnecessary re-renders
- **Key-based animation** resets page transitions on module change
- **Lazy API calls** — AI features only call the API when user explicitly triggers them
- **No external UI library** — zero dependency overhead beyond React
- **Inline styles** — no CSS parsing/compilation overhead at runtime

## Future Architecture Considerations

For v2.0, consider:

- **Component extraction** — Split `App.jsx` into individual module components
- **Context API** — Move theme and global state into React Context
- **Persistent storage** — Add localStorage or IndexedDB for progress tracking
- **API key management** — Move API calls to a serverless backend (Vercel/Netlify functions) to protect the key
- **Testing** — Add Vitest for unit tests and Playwright for E2E
