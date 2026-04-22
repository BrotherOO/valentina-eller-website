<template>
  <section class="relative min-h-[100dvh] pt-24 lg:pt-0 flex items-center justify-center overflow-hidden bg-[#FFF9F8]" id="hero">
    
    <!-- Background Shader - Only on left, bleeding slowly to transparent towards the photo -->
    <div class="absolute inset-0 z-0 pointer-events-none" style="mask-image: linear-gradient(to right, black 40%, transparent 90%); -webkit-mask-image: linear-gradient(to right, black 40%, transparent 90%);">
       <HeroBackground />
    </div>

    <!-- Container -->
    <div class="container mx-auto px-4 lg:px-8 z-20 relative text-left">
      <div class="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center lg:py-24">
        
        <!-- Left Column: Content -->
        <!-- On mobile, order-2 pushes content below picture -->
        <div class="flex flex-col order-2 lg:order-1 pt-6 lg:pt-0">
          <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-secondary-deep mb-4 lg:mb-6 tracking-tight leading-[1.1] [text-shadow:0_2px_20px_rgba(255,255,255,0.9)]">
            Änderungsschneiderei<br />
            <span class="text-[#F8A08C] relative inline-block mt-1">
                Düsseldorf-Eller
                <!-- Underline decoration for emphasis -->
                <svg class="absolute w-full h-3 -bottom-1 left-0 text-[#F8A08C] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="4" fill="none" />
                </svg>
            </span>
          </h1>
          
          <h2 class="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-secondary-deep/90 mb-4 tracking-wide max-w-2xl [text-shadow:0_1px_10px_rgba(255,255,255,0.6)]">
            Valentinas Nähstube – Handwerk mit Liebe seit 40 Jahren
          </h2>
          
          <p class="text-lg lg:text-2xl text-secondary-deep/80 max-w-xl mb-10 lg:mb-12 leading-relaxed font-sans font-medium italic [text-shadow:0_1px_10px_rgba(255,255,255,0.6)]">
            "Ihre Kleidung verdient die besten Hände."
          </p>

          <!-- 3 Trust Badges Horizontal -->
          <div class="mb-10 lg:mb-16 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
             <div class="flex items-center gap-2 text-secondary-deep/90">
                <MdiTapeMeasure class="text-[#F8A08C] w-6 h-6 shrink-0" />
                <span class="text-xs md:text-sm uppercase tracking-wider font-bold">Über 40 Jahre Erfahrung</span>
             </div>
             <div class="flex items-center gap-2 text-secondary-deep/90">
                <MdiStar class="text-[#fbbd08] w-6 h-6 shrink-0" />
                <span class="text-xs md:text-sm uppercase tracking-wider font-bold">Bekannt & geliebt in Eller</span>
             </div>
             <div class="flex items-center gap-2 text-secondary-deep/90">
                <MdiPackageVariantClosed class="text-[#F8A08C] w-6 h-6 shrink-0" />
                <!-- Making text readable for crawlers as requested -->
                <span class="text-xs md:text-sm uppercase tracking-wider font-bold">Offizieller DHL Paketshop</span>
             </div>
          </div>
          
          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#kontakt" class="bg-[#F8A08C] hover:bg-[#e08e7b] text-white px-8 lg:px-10 py-4 lg:py-4 rounded-full font-bold text-base lg:text-lg transition-all shadow-xl hover:shadow-2xl border-2 border-[#F8A08C] text-center inline-block group">
              Öffnungszeiten & Adresse <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
            <a href="#preise" class="bg-white/80 backdrop-blur hover:bg-white text-secondary-deep border-2 border-secondary-deep/10 px-8 lg:px-10 py-4 lg:py-4 rounded-full font-bold text-base lg:text-lg transition-all shadow-sm hover:shadow-md text-center inline-block">
              Preise ansehen
            </a>
          </div>
        </div>

        <!-- Right Column: Workshop Picture with Badge -->
        <!-- On mobile, order-1 pulls picture to the very top -->
        <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end mt-4 lg:mt-0">
             <!-- The floating OpeningStatusBadge -->
             <!-- Positioned top-left overlapping slightly to break the frame -->
             <div class="absolute -top-4 -left-2 md:-top-6 md:-left-4 lg:-top-6 lg:-left-6 z-30 transform hover:scale-105 transition-transform shadow-2xl rounded-full bg-white/50 backdrop-blur-md p-1 border border-white/50">
                 <OpeningStatusBadge />
             </div>
             
             <!-- Workshop image -->
             <!-- We give the image block a heavy drop shadow and a warm filter -->
             <div class="relative rounded-3xl overflow-hidden border-8 border-white group max-w-full" style="box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);">
                <!-- Setup aspect ratio for the photo with object-cover -->
                 <img 
                    :src="WorkspaceImg.src" 
                    alt="Valentina Dubinskaya – Ihre Schneiderin in Düsseldorf-Eller seit 40 Jahren"
                    fetchpriority="high"
                    class="w-full h-[320px] sm:h-[400px] lg:h-[600px] lg:w-[500px] object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    style="border-radius: 1.5rem; filter: saturate(1.1) brightness(1.02);"
                 />
             </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import MdiTapeMeasure from '~icons/mdi/tape-measure';
import MdiStar from '~icons/mdi/star';
import MdiPackageVariantClosed from '~icons/mdi/package-variant-closed';

import HeroBackground from './HeroBackground.vue';
import OpeningStatusBadge from './OpeningStatusBadge.vue';
import WorkspaceImg from '../assets/schneiderinprofil.jpg';
</script>
