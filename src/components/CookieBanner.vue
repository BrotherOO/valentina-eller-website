<template>
  <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto md:max-w-md z-[100] p-4">
    <div class="bg-secondary-deep text-primary-bg p-6 rounded-2xl shadow-2xl border border-primary-bg/10 backdrop-blur-sm">
      <div class="mb-4">
        <p class="text-sm leading-relaxed">
          Wir nutzen Cookies nur für technisch notwendige Funktionen. Es werden keine Tracking-Daten an Dritte gesendet.
        </p>
      </div>
      <div class="flex justify-end">
        <button 
          @click="acceptCookies" 
          class="bg-primary-bg text-secondary-deep font-bold py-2 px-6 rounded-full hover:bg-white transition-colors text-sm shadow-md"
        >
          Alles klar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    // Show banner after a slight delay for better UX
    setTimeout(() => {
      isVisible.value = true;
    }, 500);
  }
});

const acceptCookies = () => {
  localStorage.setItem('cookie_consent', 'true');
  isVisible.value = false;
};
</script>

<style scoped>
/* Scoped styles if needed, but Tailwind handles most */
</style>
