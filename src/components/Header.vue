<template>
  <header :class="['fixed top-0 w-full z-50 transition-all duration-300 font-sans', isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4']">
    <div class="container mx-auto px-4 md:px-8 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <div class="h-16 w-auto transition-transform group-hover:scale-105">
           <img :src="logoImg.src" alt="Valentina Logo" class="object-contain h-full w-full" />
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-8 items-center">
        <a v-for="link in links" :key="link.href" :href="link.href" class="text-sm font-medium hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full">
          {{ link.label }}
        </a>
      </nav>

      <!-- Mobile Button -->
      <button @click="isOpen = !isOpen" class="md:hidden text-gray-800 focus:outline-none">
        <span class="sr-only">Menu</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isOpen" class="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl">
      <div class="flex flex-col p-4 gap-4">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="isOpen = false" class="text-lg font-medium text-gray-700 hover:text-primary">
          {{ link.label }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import logoImg from '../assets/logo_valentina_neu.png';

const links = [
  { label: 'Startseite', href: '/' },
  { label: 'Preise', href: '/#preise' },
  { label: 'Öffnungszeiten', href: '/#oeffnungszeiten' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/#kontakt' },
];

const isOpen = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
