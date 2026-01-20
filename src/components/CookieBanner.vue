<template>
  <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:max-w-[28rem] z-[100] p-4">
    <div class="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-100/50 backdrop-blur-md ring-1 ring-black/5">
      <div class="mb-5">
        <h4 class="font-bold text-lg mb-2 text-gray-900">Privatsphäre-Einstellungen</h4>
        <p class="text-sm leading-relaxed text-gray-600">
          Wir verwenden Cookies, um Ihnen das optimale Nutzungserlebnis zu bieten. Einige davon sind notwendig (Essenziell), während andere uns helfen, unser Onlineangebot zu verbessern. Nähere Hinweise erhalten Sie in unserer 
          <a href="/datenschutz" class="underline text-[#D06074] hover:text-[#b04558] font-medium transition-colors">Datenschutzerklärung</a>.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 justify-end">
        <button 
          @click="declineCookies" 
          class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none"
        >
          Ablehnen
        </button>
        <button 
          @click="acceptCookies" 
          class="px-6 py-2.5 rounded-xl bg-[#F8A08C] text-white font-bold text-sm hover:bg-[#e08e7b] shadow-lg shadow-[#F8A08C]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-[#F8A08C] focus:outline-none"
        >
          Alle akzeptieren
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
  localStorage.setItem('cookie_consent', 'accepted');
  // Here you would trigger analytics enable function if you had one
  isVisible.value = false;
};

const declineCookies = () => {
  localStorage.setItem('cookie_consent', 'declined');
  isVisible.value = false;
};
</script>

<style scoped>
/* Additional animations if needed */
</style>
