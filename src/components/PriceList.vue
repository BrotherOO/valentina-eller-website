<template>
  <section id="preise" class="py-24 bg-white scroll-mt-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-4">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Faire Festpreise für Ihr Handwerk</h2>
        <p class="text-gray-500">Transparente Preise für erstklassiges Handwerk. Alle Preise sind Richtwerte und können je nach Aufwand variieren.</p>
      </div>

      <div class="max-w-3xl mx-auto">
        <!-- Express Badge -->
        <div class="mb-8 flex justify-center">
            <span class="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-1.5 rounded-full font-medium text-xs border border-amber-100/50">
                <span class="text-base">⚡</span>
                Express-Service (Same-Day) nach Absprache möglich
            </span>
        </div>

        <!-- Desktop Table (Hidden on mobile) -->
        <div class="hidden md:block bg-neutral-50 rounded-3xl p-8 shadow-sm border border-neutral-100">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="py-4 font-bold text-gray-700">Dienstleistung</th>
                <th class="py-4 font-bold text-gray-700">Preis ab</th>
                <th class="py-4 font-bold text-gray-700">Dauer (ca.)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in prices" :key="item.name" class="group hover:bg-white transition-colors">
                <td class="py-4 font-medium text-gray-800 group-hover:text-primary transition-colors">{{ item.name }}</td>
                <td class="py-4 font-bold text-accent-warm">{{ item.price }}</td>
                <td class="py-4 text-gray-500 text-sm">{{ item.duration }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Accordion -->
        <div class="md:hidden space-y-3">
            <div v-for="(item, index) in prices" :key="index" class="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
                <button @click="toggle(index)" class="w-full flex justify-between items-center p-4 text-left focus:outline-none">
                    <span class="font-bold text-gray-800">{{ item.name }}</span>
                    <span class="text-secondary-deep font-bold bg-accent-warm/10 px-2 py-1 rounded text-sm">{{ item.price }}</span>
                </button>
                <div v-show="activeIndex === index" class="px-4 pb-4 text-sm text-gray-500 bg-white pt-2 border-t border-gray-100">
                    <p>Bearbeitungsdauer: {{ item.duration }}</p>
                    <p class="mt-1 opacity-70">Je nach Auftragslage und Umfang kann der Preis variieren.</p>
                </div>
            </div>
        </div>
        
        <div class="mt-8 text-center text-xs text-gray-400">
            * Preise inkl. MwSt. Endgültiger Preis nach Begutachtung vor Ort.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const prices = [
  { name: 'Hose kürzen / enger machen', price: 'ab 8,00 €', duration: '1 Tag' },
  { name: 'Kleid / Abendmode anpassen', price: 'ab 20,00 €', duration: 'Nach Aufwand' },
  { name: 'Reißverschluss austauschen (Jacke/Hose)', price: 'ab 14,00 €', duration: '1-2 Tage' },
  { name: 'Rock kürzen', price: 'ab 16,00 €', duration: '1-2 Tage' },
  { name: 'Jacke Ärmel kürzen', price: 'ab 18,00 €', duration: '2 Tage' },
  { name: 'Sakko Ärmel kürzen', price: 'ab 16,00 €', duration: '2 Tage' },
  { name: 'Decke kürzen (pro m)', price: 'ab 10,00 €', duration: '2 Tage' },
  { name: 'DHL Paketshop', price: 'Service', duration: 'Sofort' },
  { name: 'Reinigung & Wäscherei', price: 'Auf Anfrage', duration: 'Variiert' },
  { name: 'Flicken / Riss reparieren', price: 'Auf Anfrage', duration: 'Variiert' },
  { name: 'Knopf annähen / wechseln', price: 'Auf Anfrage', duration: 'Variiert' },
];

const activeIndex = ref<number | null>(null);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>
