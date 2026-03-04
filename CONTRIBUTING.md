# Contributing to English Mastery Hub

Thank you for your interest in contributing to **English Mastery Hub** by Yamazing Corp! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to fostering an open, welcoming, and inclusive environment. By participating, you agree to uphold our standards of respect, empathy, and constructive collaboration.

## How to Contribute

### Reporting Bugs

1. Check existing [Issues](https://github.com/yamazing-corp/english-mastery-hub/issues) to avoid duplicates
2. Create a new issue with the **Bug Report** template
3. Include: steps to reproduce, expected vs. actual behavior, screenshots, browser/OS info

### Suggesting Features

1. Open a [Feature Request](https://github.com/yamazing-corp/english-mastery-hub/issues/new) issue
2. Describe the use case and expected benefit
3. If possible, include mockups or references

### Submitting Code

#### Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/english-mastery-hub.git
cd english-mastery-hub

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start dev server
npm run dev
```

#### Development Guidelines

- **Components**: Follow the existing CSS-in-JS pattern with theme tokens
- **Theme Compatibility**: Every UI element must work in both light and dark modes
- **Naming**: Use descriptive, semantic variable and function names
- **AI Integration**: Use the `callClaude` helper for all API calls; never hardcode API keys
- **Vocabulary/Content**: Keep all content professionally relevant (business English focus)

#### Pull Request Process

1. Ensure your code works in both light and dark themes
2. Test all 6 modules (Dashboard, Vocabulary, Verbs, Conversation, Writing, Interview)
3. Write a clear PR description explaining the change
4. Reference any related issues
5. Request review from a maintainer

### Content Contributions

We especially welcome contributions to:

- **New vocabulary terms** (with definition, phonetic, and contextual example)
- **New verb exercises** (business context sentences)
- **New conversation scenarios** (professional situations)
- **New writing prompts** (business writing contexts)
- **New interview questions** (with coaching tips)
- **Translations** (PT-BR interface localization)

## Style Guide

### Code Style

- Use functional components with React Hooks
- Prefer `useCallback` and `useMemo` for performance
- Keep components under 200 lines; extract when needed
- Use the design system tokens (`th.accent`, `th.bgCard`, etc.) — never hardcode colors

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add salary negotiation conversation scenario
fix: correct verb exercise answer validation
docs: update design system color palette
style: improve card hover animation timing
refactor: extract vocabulary card into separate component
```

## Questions?

Open a [Discussion](https://github.com/yamazing-corp/english-mastery-hub/discussions) or reach out to the maintainers.

---

**Thank you for helping professionals around the world improve their English!**
