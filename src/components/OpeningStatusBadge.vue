<template>
  <div v-if="statusMessage" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm transition-all duration-500 backdrop-blur-sm"
    :class="statusClasses">
    <span class="w-2 h-2 rounded-full animate-pulse shrink-0" :class="statusDotClass"></span>
    <span>{{ statusMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useOpeningHours } from '../composables/useOpeningHours';

const { statusMessage, statusClasses, statusDotClass } = useOpeningHours();
</script>
