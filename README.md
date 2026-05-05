# Headless Date Picker

A headless date picker engine implemented in pure TypeScript, paired with a minimal Vue 3 wrapper for UI interaction

The core logic is fully framework-agnostic and has no runtime dependencies, allowing it to remain independent from any rendering layer. While this project includes only a Vue 3 integration, the architecture is designed to support additional UI frameworks through a dedicated adapter layer that would bridge the engine with each framework’s reactivity and rendering model.

---

## Architecture Overview

The project is divided into two layers:

* **Engine (`src/headless-date-picker`)**
  Contains all date logic (calendar generation, navigation, selection).
  It is completely independent from Vue and does not access the DOM.

* **Vue Wrapper (`src/vue`)**
  A thin UI layer that connects the engine to Vue’s reactivity system and renders the calendar.

---

## State Management

The engine owns a single mutable `CalendarState` object:

* `visibleMonth`
* `visibleYear`
* `selectedDate`

All updates (navigation and selection) mutate this state directly.

On the Vue side, the state object is wrapped using `reactive()`, allowing Vue to track changes without the engine needing to know about reactivity.

---

## Temporal API Notes

The engine uses the Temporal API when available, falling back to UTC-based `Date` operations otherwise.

* The fallback avoids timezone-related inconsistencies by using UTC methods

---

## Running the Project

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

Build the library:

```bash
npm run build
```

---

## Notes

* No external date libraries are used
* The engine contains no framework-specific code
* The Vue layer is intentionally minimal and replaceable
.