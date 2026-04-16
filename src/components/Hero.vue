<template>
  <section class="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
    <!-- Silk Background Effect -->
    <HeroBackground />
    
    <!-- Background Decor (Optional - Silk replaces/augments this) -->
    <div class="absolute inset-0 pointer-events-none z-0">
       <!-- Parallax Circles or shapes - kept for extra depth but reduced opacity -->
       <div class="absolute top-20 left-10 w-96 h-96 bg-primary-bg rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
       <div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-pulse-slow delay-1000"></div>
    </div>

    <!-- Ensure padding adjustments for centering -->
    <div class="container mx-auto px-4 z-20 relative text-center flex flex-col items-center pt-24 md:pt-[10vh] pb-10">
      <!-- Profile Image - Enlarged & Warm -->
      <div class="mb-8 md:mb-10 relative group max-w-[140px]">
          <div class="absolute -inset-2 bg-gradient-to-r from-[#F8A08C] to-[#e08e7b] rounded-full opacity-60 group-hover:opacity-100 blur-md transition duration-500"></div>
          <img 
            :src="ProfileImg.src" 
            alt="Valentina Dubinsky - Ihre erfahrene Änderungsschneiderin in Düsseldorf-Eller" 
            width="140" 
            height="140"
            fetchpriority="high"
            class="relative w-32 h-32 md:w-[140px] md:h-[140px] rounded-full border-4 border-white shadow-xl object-cover transform transition duration-500 hover:scale-105" 
          />
          <div class="absolute -right-4 md:-right-8 top-0 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full shadow-sm text-[11px] md:text-sm font-bold text-gray-700 rotate-12">
             Ihre Schneiderin
          </div>
      </div>

      <!-- H1 shortened to one line for SEO -->
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-deep mb-4 md:mb-5 tracking-tight leading-tight [text-shadow:0_2px_20px_rgba(255,255,255,0.8)]">
        Änderungsschneiderei
        <span class="text-[#F8A08C] relative inline-block">
            Düsseldorf-Eller
            <!-- Underline decoration -->
            <svg class="absolute w-full h-3 -bottom-1 left-0 text-[#F8A08C] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
        </span>
      </h1>
      
      <!-- H2 Tagline -->
      <h2 class="text-lg md:text-2xl font-serif font-medium text-secondary-deep/80 mb-6 md:mb-8 tracking-wide max-w-2xl [text-shadow:0_1px_10px_rgba(255,255,255,0.6)]">
        Valentinas Nähstube – Handwerk mit Liebe seit 40 Jahren
      </h2>
      
      <!-- One-Liner (Warm) -->
      <p class="text-base md:text-xl text-secondary-deep/90 max-w-2xl mb-10 md:mb-12 leading-relaxed font-sans font-medium italic [text-shadow:0_1px_10px_rgba(255,255,255,0.6)]">
        "Ihre Kleidung in den besten Händen – persönlich, präzise, mit Liebe zum Detail."
      </p>

      <!-- Feature Icons Strip (Compact) -->
      <div class="mb-6 md:mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-secondary-deep/80 w-full max-w-3xl mx-auto">
        <div class="flex flex-col items-center gap-1.5 md:gap-2 group hover:text-[#F8A08C] transition-colors">
            <div class="p-2 md:p-3 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                 <MdiTapeMeasure class="text-xl md:text-2xl" />
            </div>
            <span class="text-[10px] md:text-xs uppercase tracking-widest font-bold font-sans">Präzision</span>
        </div>
        <div class="flex flex-col items-center gap-1.5 md:gap-2 group hover:text-[#F8A08C] transition-colors">
            <div class="p-2 md:p-3 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                <MdiScissorsCutting class="text-xl md:text-2xl" />
            </div>
            <span class="text-[10px] md:text-xs uppercase tracking-widest font-bold font-sans">Maßarbeit</span>
        </div>
        <div class="flex flex-col items-center gap-1.5 md:gap-2 group hover:text-[#F8A08C] transition-colors">
            <div class="p-2 md:p-3 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                <MdiIron class="text-xl md:text-2xl" />
            </div>
            <span class="text-[10px] md:text-xs uppercase tracking-widest font-bold font-sans">Wäsche</span>
        </div>
         <div class="flex flex-col items-center gap-1.5 md:gap-2 group hover:text-[#F8A08C] transition-colors">
            <div class="p-2 md:p-3 bg-accent-warm/20 rounded-full group-hover:bg-accent-warm/30 transition-colors">
                <MdiPackageVariantClosed class="text-xl md:text-2xl" />
            </div>
            <span class="text-[10px] md:text-xs uppercase tracking-widest font-bold font-sans">DHL</span>
        </div>
      </div>
      
      <div class="flex flex-wrap justify-center gap-3 md:gap-4">
        <a href="#dienstleistungen" class="bg-[#F8A08C] hover:bg-[#e08e7b] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-[0_10px_25px_rgba(248,160,140,0.25)] hover:shadow-[0_15px_35px_rgba(248,160,140,0.35)] transform hover:-translate-y-1">
          Leistungen entdecken
        </a>
        <a href="/#oeffnungszeiten" class="bg-transparent hover:bg-secondary-deep/5 text-secondary-deep border-2 border-secondary-deep/20 px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-sm hover:shadow-lg">
          Öffnungszeiten
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import MdiTapeMeasure from '~icons/mdi/tape-measure';
import MdiScissorsCutting from '~icons/mdi/scissors-cutting';
import MdiIron from '~icons/mdi/iron';
import MdiPackageVariantClosed from '~icons/mdi/package-variant-closed';
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
