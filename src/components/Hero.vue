<template>
  <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <!-- Silk Background Effect -->
    <HeroBackground />
    
    <!-- Background Decor (Optional - Silk replaces/augments this) -->
    <div class="absolute inset-0 pointer-events-none z-0">
       <!-- Parallax Circles or shapes - kept for extra depth but reduced opacity -->
       <div class="absolute top-20 left-10 w-96 h-96 bg-primary-bg rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
       <div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-pulse-slow delay-1000"></div>
    </div>

      <!-- Profile Image -->
      <div class="mb-8 relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-[#F8A08C] to-[#e08e7b] rounded-full opacity-60 group-hover:opacity-100 blur transition duration-500"></div>
          <img 
            :src="ProfileImg.src" 
            alt="Valentina Dubinsky - Ihre erfahrene Änderungsschneiderin in Düsseldorf-Eller" 
            width="112" 
            height="112"
            class="relative w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover transform transition duration-500 hover:scale-105" 
          />
          <div class="absolute -right-8 top-0 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-xs font-bold text-gray-600 rotate-12">
             Ihre Schneiderin
          </div>
      </div>

      <h1 class="text-5xl md:text-7xl font-serif font-bold text-secondary-deep mb-6 tracking-tight leading-tight [text-shadow:0_2px_20px_rgba(255,255,255,0.8)]">
        Ihre Lieblingskleidung – <br class="hidden md:block" />
        <span class="text-[#F8A08C] relative inline-block">
            neu geboren
            <!-- Underline decoration -->
            <svg class="absolute w-full h-3 -bottom-1 left-0 text-[#F8A08C] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
        </span>.
      </h1>
      
      <p class="text-xl md:text-2xl text-secondary-deep/90 max-w-2xl mb-12 leading-relaxed font-sans font-medium [text-shadow:0_1px_10px_rgba(255,255,255,0.6)]">
        Nachhaltige Reparaturen, professionelle Änderungen, <strong>Wäsche- & Bügelservice</strong> und maßgeschneiderte Lösungen im Herzen von Düsseldorf-Eller. <span class="text-[#F8A08C] font-semibold">Seit über 40 Jahren.</span>
      </p>
      
      <div class="flex flex-col md:flex-row gap-6">
        <a href="/#preise" class="bg-[#F8A08C] hover:bg-[#e08e7b] text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_10px_25px_rgba(248,160,140,0.25)] hover:shadow-[0_15px_35px_rgba(248,160,140,0.35)] transform hover:-translate-y-1">
          Preise ansehen
        </a>
        <a href="/#oeffnungszeiten" class="bg-transparent hover:bg-secondary-deep/5 text-secondary-deep border-2 border-secondary-deep/20 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-lg">
          Öffnungszeiten ansehen
        </a>
      </div>

      <!-- Feature Icons Strip (Grid for consistent spacing) -->
      <div class="mt-20 grid grid-cols-3 gap-8 md:gap-20 text-secondary-deep/60 w-full max-w-4xl mx-auto">
        <div class="flex flex-col items-center gap-3 group hover:text-[#F8A08C] transition-colors">
            <div class="p-4 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                 <MdiNeedle class="text-3xl" />
            </div>
            <span class="text-xs uppercase tracking-widest font-bold font-sans">Präzision</span>
        </div>
        <div class="flex flex-col items-center gap-3 group hover:text-[#F8A08C] transition-colors">
            <div class="p-4 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                <MdiScissorsCutting class="text-3xl" />
            </div>
            <span class="text-xs uppercase tracking-widest font-bold font-sans">Maßarbeit</span>
        </div>
        <div class="flex flex-col items-center gap-3 group hover:text-[#F8A08C] transition-colors">
            <div class="p-4 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                <MdiIron class="text-3xl" />
            </div>
            <span class="text-xs uppercase tracking-widest font-bold font-sans">Wäscheservice</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import MdiNeedle from '~icons/mdi/needle';
import MdiScissorsCutting from '~icons/mdi/scissors-cutting';
import MdiIron from '~icons/mdi/iron';
import HeroBackground from './HeroBackground.vue';
import ProfileImg from '../assets/schneiderinprofil.jpg';
</script>

<style scoped>
.animate-pulse-slow {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.15; }
}
</style>
