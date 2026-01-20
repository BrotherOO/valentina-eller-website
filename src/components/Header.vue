<template>
  <header :class="['fixed top-0 w-full z-50 transition-all duration-300 font-sans', isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4']">
    <div class="container mx-auto px-4 md:px-8 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <div class="h-16 w-auto transition-transform group-hover:scale-105">
           <img :src="logoImg.src" alt="Valentina Änderungsschneiderei Logo - Ihr vertrauensvoller Partner" width="163" height="64" class="object-contain h-full w-full" />
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-8 items-center">
        <a v-for="link in links" :key="link.href" :href="link.href" class="text-sm font-medium text-secondary-deep hover:text-accent-warm transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent-warm after:transition-all hover:after:w-full">
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
    <Transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in transform"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <div v-show="isOpen" class="md:hidden absolute top-full left-0 w-full h-screen bg-[#FFF5F2]/98 backdrop-blur-lg border-t border-accent-warm/20 shadow-xl z-[999] overflow-y-auto pb-40">
        <div class="flex flex-col p-6 gap-6 items-center text-center pt-12">
          <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMenu" class="text-2xl font-serif text-secondary-deep hover:text-accent-warm transition-colors relative group py-2">
            {{ link.label }}
             <span class="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-accent-warm transition-all group-hover:w-full group-hover:left-0"></span>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
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

// Scroll Lock Logic
watch(isOpen, (newValue) => {
    if (typeof document !== 'undefined') {
        if (newValue) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
});

const closeMenu = () => {
    isOpen.value = false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  // Safety cleanup
  if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
  }
});
</script>
