<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'
import '@/styles/variables.css'
import '@/styles/global.css'
</script>

<template>
  <main class="flex flex-col items-center justify-start pt-20 px-4 gap-8 min-h-screen">
    <header class="flex flex-col items-center gap-2 text-center">
      <span class="inline-flex items-center gap-1.5 text-dp-text/60 text-xs font-semibold tracking-widest uppercase">
        <span class="w-2 h-2 rounded-full bg-dp-accent inline-block"></span>
        Gila Software Interview
      </span>
      <h1 class="text-2xl font-bold text-dp-text">Headless Date Picker Test</h1>
    </header>
    <DatePicker />
  </main>
</template>
