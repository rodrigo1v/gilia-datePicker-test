# Headless Date Picker

A headless date picker engine implemented in pure TypeScript, paired with a minimal Vue 3 wrapper for UI interaction.

The core logic is fully framework-agnostic and has no runtime dependencies, allowing it to remain independent from any rendering layer. While this project includes only a Vue 3 integration, the architecture is designed to support additional UI frameworks through a dedicated adapter layer that would bridge the engine with each framework’s reactivity and rendering model.

---

## Architecture Overview

The project is divided into three layers:

### 1. Engine (`src/headless-date-picker`)
Contains all date logic (calendar generation, navigation, selection).
It is completely independent from Vue and does not access the DOM.

### 2. Vue Wrapper (`src/vue`)
A thin UI layer that connects the engine to Vue’s reactivity system and renders the calendar.

### 3. Styles (`src/styles`)
Design system based on CSS variables, fully framework-agnostic.

---

## State Management

The engine owns a single mutable `CalendarState` object:

- `visibleMonth`
- `visibleYear`
- `selectedDate`

All updates (navigation and selection) mutate this state directly.

On the Vue side, the state is wrapped using Vue reactivity (`ref`), allowing UI updates without the engine being aware of any framework.

---

## Temporal API Notes

The engine uses the Temporal API when available, falling back to UTC-based `Date` operations otherwise.

- The fallback avoids timezone-related inconsistencies by using UTC methods
- Ensures deterministic calendar behavior across environments

---

## Running the Project (Local Development)

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Build the library:

```bash
npm run build:lib
```

## Running the Demo Build (Production Preview)

Build the demo version:
```bash
npm run build:demo
```

Preview the production build locally:
```bash
npx serve demo-dist
```

## Full Build (Library + Demo)
```bash
npm run build
```
---

## GitHub Pages Deployment

The demo is automatically deployed using GitHub Actions.
Live demo is served from:
```bash
demo-dist/
```
After each push to main, the latest version is published automatically via GitHub Pages.

## Live Demo

Check the latest deployed version here:

https://rodrigo1v.github.io/gilia-datePicker-test/

## Notes

* No external date libraries are used
* The engine contains no framework-specific code
* The Vue layer is intentionally minimal and replaceable
.