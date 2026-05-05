<script setup lang="ts">
import { ref, computed, nextTick, onUnmounted } from 'vue';
import { HeadlessDatePickerEngine } from '@/headless-date-picker';
import type { CalendarDate, CalendarCell } from '@/headless-date-picker';

const tick = ref(0);
const isOpen = ref(false);
const MONTH_NAMES = [
  'January','February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
] as const;
const WEEK_DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'] as const;
const rootElement = ref<HTMLDivElement | null>(null);

const engine: HeadlessDatePickerEngine = new HeadlessDatePickerEngine();
const grid = computed(() => (tick.value, engine.getMonthGrid()));
const inputValue = computed(() => {
  tick.value;
  const value = engine.getInputValue();
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${month}/${day}/${year}`;
});
const headerLabel = computed(() => {
  tick.value;
  const { month, year } = engine.getVisibleMonth();
  return `${MONTH_NAMES[month - 1]} ${year}`;
});
const sync = () => { tick.value++ };

function run(action: () => void) {
  action();
  sync();
}

function prevYear() { run(() => engine.prevYear()) };
function nextYear() { run(() => engine.nextYear()) };
function prevMonth() { run(() => engine.prevMonth()) };
function nextMonth() { run(() => engine.nextMonth()) };

function selectDate(date: CalendarDate) {
  engine.selectDate(date);
  sync();
}

function openPopover() {
  if (isOpen.value) return;
  isOpen.value = true;
  nextTick(() => document.addEventListener('mousedown', onOutsideClick));
}

function closePopover() {
  isOpen.value = false;
  document.removeEventListener('mousedown', onOutsideClick);
}

function onOutsideClick(e: MouseEvent) {
  if (
    rootElement.value
    && e.target instanceof Node
    && !rootElement.value.contains(e.target)
  ) closePopover();
}

function getCellKey(cell: CalendarCell): string {
  const { year, month, day } = cell.date;
  return `${year}-${month}-${day}`;
}

function formatDateAttr(cell: CalendarCell): string {
  return getCellKey(cell);
}

function cellTabIndex(cell: CalendarCell): 0 | -1 {
  return cell.isCurrentMonth ? 0 : -1;
}

function handleSelect(cell: CalendarCell) {
  if (!cell.isCurrentMonth) return;
  selectDate(cell.date)
}

function getDayClasses(cell: CalendarCell): string[] {
  const classes = ['dp-day'];
  if (cell.isSelected) classes.push('dp-day--selected');
  if (cell.isToday && !cell.isSelected) classes.push('dp-day--today');
  if (!cell.isCurrentMonth) classes.push('dp-day--other-month');
  return classes;
}

onUnmounted(() => {
  document.removeEventListener('mousedown', onOutsideClick);
})
</script>

<template>
  <div>Select a date</div>
  <div
    ref="rootElement"
    class="relative inline-block"
    @keydown.esc="closePopover"
  >
    <div class="relative">
      <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--dp-muted)]">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3.5" y="4.5" width="17" height="17" rx="3" />
          <path d="M7 3v3M17 3v3M3.5 9h17" stroke-linecap="round"/>
        </svg>
      </span>
      <input
        type="text"
        readonly
        :value="inputValue"
        placeholder="mm/dd/yyyy"
        class="dp-input"
        @click="openPopover"
        @focus="openPopover"
      />
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute mt-1 w-72 p-4 bg-[var(--dp-bg)] rounded-xl shadow-lg text-[var(--dp-primary)]"
      >
        <div class="flex items-center justify-between mb-3 px-1">
          <button type="button" class="dp-nav-btn" @click="prevYear">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 17L6 12L11 7" />
              <path d="M18 17L13 12L18 7" opacity="0.6"/>
            </svg>
          </button>
          <button type="button" class="dp-nav-btn" @click="prevMonth">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          <span class="text-sm font-semibold tracking-wide select-none">
            {{ headerLabel }}
          </span>
          <button type="button" class="dp-nav-btn" @click="nextMonth">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>
          <button type="button" class="dp-nav-btn" @click="nextYear">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 17L18 12L13 7" />
              <path d="M6 17L11 12L6 7" opacity="0.6"/>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-7 mb-1 text-xs font-medium text-dp-text-muted">
          <span
            v-for="day in WEEK_DAYS"
            :key="day"
            class="text-center py-1 select-none"
          >
            {{ day }}
          </span>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <template v-for="(row, rowIndex) in grid" :key="rowIndex">
            <button
              v-for="cell in row"
              :key="getCellKey(cell)"
              type="button"
              :tabindex="cellTabIndex(cell)"
              :data-date="formatDateAttr(cell)"
              class="dp-day"
              :class="getDayClasses(cell)"
              @click="handleSelect(cell)"
            >
              {{ cell.date.day }}
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dp-input {
  width: var(--dp-input-width);
  padding: var(--dp-input-padding);
  font-size: var(--dp-font-size);
  color: var(--dp-primary);
  background: var(--dp-bg);
  border: 1px solid var(--dp-border);
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.1s ease, box-shadow 0.1s ease;
}
.dp-input::placeholder {
  color: var(--dp-muted);
}
.dp-input:hover {
  border-color: var(--dp-accent-hover);
}
.dp-input:focus        {
  border-color: var(--dp-accent);
  box-shadow: var(--dp-focus-ring);
}
.dp-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem; height: 1.75rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--dp-muted);
  cursor: pointer;
  transition: background 0.1s ease, color 0.1s ease;
}
.dp-nav-btn:hover {
  background: rgba(47, 44, 109, 0.08);
  color: var(--dp-primary);
}
.dp-day {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: var(--dp-cell-size);
  height: var(--dp-cell-size);
  font-size: var(--dp-font-size);
  color: var(--dp-primary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.1s ease, color 0.1s ease, border-color 0.1s ease;
}
.dp-day:hover {
  background: rgba(47, 44, 109, 0.08);
}
.dp-day:focus-visible {
  outline: none;
  box-shadow: var(--dp-focus-ring);
}
.dp-day--today {
  border-color: var(--dp-primary);
  font-weight: 600;
}
.dp-day--selected {
  background: var(--dp-accent);
  border-color: var(--dp-accent);
  color: var(--dp-text);
  font-weight: 600;
}
.dp-day--selected:hover {
  background: var(--dp-accent-hover);
}
.dp-day--other-month {
  color: var(--dp-muted);
  opacity: 0.4;
  cursor: default;
}
</style>
