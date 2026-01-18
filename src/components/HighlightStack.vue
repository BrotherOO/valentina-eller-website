<template>
  <div ref="container" class="relative w-full z-10" :style="{ height: totalHeight + 'vh' }">
    <div class="sticky top-0 h-screen overflow-hidden flex items-start justify-center pt-32 md:pt-40">
      <!-- Background Elements (Optional) -->
      <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-bg/20 rounded-full blur-3xl"></div>
          <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-warm/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Cards Stack -->
      <div class="relative w-full max-w-lg mx-auto px-4 perspective-1000">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="absolute top-0 left-0 w-full bg-white rounded-3xl p-8 md:p-12 border border-accent-warm/40 shadow-[0_10px_40px_rgba(194,17,121,0.1)] transition-all duration-100 ease-out origin-top"
          :style="getCardStyle(index)"
        >
          <!-- Icon -->
          <div class="mb-6 inline-flex p-4 rounded-full bg-primary-bg/20 text-4xl" :class="card.iconColor">
            <component :is="card.icon" />
          </div>
          <!-- Content -->
          <h3 class="text-2xl md:text-3xl font-serif font-bold text-secondary-deep mb-4">
            {{ card.headline }}
          </h3>
          <p class="text-lg text-slate-700 leading-relaxed">
            {{ card.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import MdiLeaf from '~icons/mdi/leaf';
import MdiNeedle from '~icons/mdi/needle';
import MdiPiggyBankOutline from '~icons/mdi/piggy-bank-outline';
import MdiHeartOutline from '~icons/mdi/heart-outline';
import MdiMagicStaff from '~icons/mdi/magic-staff';

const container = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);

const cards = [
  {
    headline: 'Reparieren statt Wegwerfen',
    text: 'Jede Reparatur spart Ressourcen. Durch das Ändern Ihrer Kleidung reduzieren Sie Textilmüll und den CO2-Fußabdruck um bis zu 70% im Vergleich zum Neukauf.',
    icon: MdiLeaf,
    iconColor: 'text-green-600'
  },
  {
    headline: '40 Jahre Präzision',
    text: 'Keine Naht ist Zufall. Valentina verbindet traditionelles Handwerk mit modernster Technik. Was hier genäht wird, hält – oft länger als das Original.',
    icon: MdiNeedle,
    iconColor: 'text-primary-action'
  },
  {
    headline: 'Investition in Langlebigkeit',
    text: 'Gute Kleidung ist teuer. Eine professionelle Änderung kostet nur einen Bruchteil einer Neuanschaffung und lässt Ihr Lieblingsstück wieder wie neu aussehen.',
    icon: MdiPiggyBankOutline,
    iconColor: 'text-accent-warm'
  },
  {
    headline: 'Wie in der Familie',
    text: 'Bei uns sind Sie keine Nummer. Wir kennen Ihre Vorlieben, hören zu und finden Lösungen, wo andere aufgeben. Ein Kaffee und ein Lächeln inklusive.',
    icon: MdiHeartOutline,
    iconColor: 'text-primary-action'
  },
  {
    headline: 'Leder, Seide & Co.',
    text: 'Wir trauen uns an das, was schwierig ist. Ob zartes Brautkleid oder robuste Lederjacke – wir haben die Spezialmaschinen und das Know-how dafür.',
    icon: MdiMagicStaff,
    iconColor: 'text-yellow-500' // Gold substitute
  }
];

const totalHeight = 400; // 300vh for scroll + some buffer

const handleScroll = () => {
  if (!container.value) return;
  const rect = container.value.getBoundingClientRect();
  const winHeight = window.innerHeight;
  const totalDist = rect.height - winHeight;
  
  // Progress 0 when top touches top, 1 when bottom touches bottom
  // Actually we want start when container top hits viewport top (sticky starts)
  
  // rect.top is position relative to viewport.
  // When rect.top <= 0, sticky is active.
  
  let progress = -rect.top / totalDist;
  progress = Math.max(0, Math.min(1, progress));
  
  scrollProgress.value = progress * cards.length;
};

const getCardStyle = (index: number) => {
    // Current active index float
    const active = scrollProgress.value;
    
    // Calculate relative position
    // Card should enter from bottom or be stacked?
    // "Karten stapeln sich beim Scrollen übereinander" -> New card covers old.
    
    // Logic: 
    // Card i is "active" when active >= i
    // Card i entering: active is between i-1 and i? or i and i+1?
    
    // Let's say we have 5 cards. Total progress 0..5
    // Card 0 is always visible initially? Or enters?
    // Let's assume Card 0 is base.
    
    // Design: Cards stack.
    // Card 0: Static at top.
    // Card 1: Enters from bottom as progress goes 0->1.
    // Card 2: Enters from bottom as progress goes 1->2.
    
    // Scale effect:
    // When Card 1 enters (covering Card 0), Card 0 scales down.
    
    const i = index;
    const currentPhase = active; // 0..5
    
    // Transition for entry (Y position)
    // Card i enters when phase is between i-1 and i
    // But Card 0 is always there (i=0).
    
    let y = 0
    let scale = 1;
    let opacity = 1;
    let blur = 0;
    
    if (i === 0) {
        // Base card. Scales down as 1 enters (phase > 0)
        const progress = Math.max(0, currentPhase - 0); // 0..infinity
        // Scale down until covered (progress 0->1)
        scale = 1 - Math.min(1, progress) * 0.1; // Scale down to 0.9
        opacity = 1 - Math.min(1, progress) * 0.2; // Fade slightly
        blur = Math.min(1, progress) * 2;
    } else {
        // Entering card
        // Enters from phase i-1 to i
        const enterProgress = Math.max(0, Math.min(1, currentPhase - (i - 1)));
        
        // enterProgress 0 (bottom) -> 1 (center)
        y = (1 - enterProgress) * 250; // Increased offset to ensure hidden
        
        // As next card enters (phase > i), this card scales down
        const exitProgress = Math.max(0, currentPhase - i);
        scale = 1 - Math.min(1, exitProgress) * 0.1;
        opacity = enterProgress; // Fade in as it slides up
        blur = Math.min(1, exitProgress) * 2;
    }
    
    return {
        transform: `translateY(${y}%) scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: index + 1
    };
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}
</style>
