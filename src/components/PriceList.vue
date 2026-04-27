<template>
  <section id="preise" class="py-24 bg-white scroll-mt-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Faire Festpreise für Ihr Handwerk</h2>
        <p class="text-gray-500">Transparente Preise für erstklassiges Handwerk. Alle Preise sind Richtwerte und können je nach Aufwand variieren.</p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Express Badge -->
        <div class="mb-10 flex justify-center">
            <span class="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-1.5 rounded-full font-medium text-xs border border-amber-100/50">
                <span class="text-base">⚡</span>
                Express-Service (Same-Day) nach Absprache möglich
            </span>
        </div>

        <div class="space-y-12">
            <!-- Iterate over Categories -->
            <div v-for="(category, catIndex) in priceCategories" :key="catIndex">
                <h3 class="text-2xl font-bold text-[#122738] mb-6 flex items-center gap-3">
                    <span class="bg-[#e94470]/10 text-[#e94470] p-2 rounded-lg text-xl" aria-hidden="true">{{ category.icon }}</span>
                    {{ category.title }}
                </h3>
                
                <!-- Desktop Table -->
                <div class="hidden md:block bg-neutral-50 rounded-2xl p-6 shadow-sm border border-neutral-100">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="py-3 font-bold text-gray-700 w-1/2">Dienstleistung</th>
                                <th class="py-3 font-bold text-gray-700 text-right">Preis ab</th>
                                <th class="py-3 font-bold text-gray-700 text-right">Dauer (ca.)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="item in category.items" :key="item.name" class="group hover:bg-white transition-colors">
                                <td class="py-4 font-medium text-gray-800 group-hover:text-[#e94470] transition-colors">{{ item.name }}</td>
                                <td class="py-4 font-bold text-[#e94470] text-right">{{ item.price }}</td>
                                <td class="py-4 text-gray-500 text-sm text-right">{{ item.duration }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div class="md:hidden space-y-3">
                    <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-bold text-gray-800">{{ item.name }}</span>
                            <span class="text-[#e94470] font-bold bg-[#e94470]/10 px-2 py-1 rounded text-sm whitespace-nowrap ml-4">{{ item.price }}</span>
                        </div>
                        <div class="text-sm text-gray-500 flex items-center gap-1">
                            <span>⏱️</span> {{ item.duration }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-12 text-center text-sm text-gray-500 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <strong>Wichtiger Hinweis:</strong> Alle Preise sind Mindestpreise. Der genaue Preis wird immer kostenlos vor Ort besprochen. <br/>Kein Termin nötig – einfach vorbeikommen.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const priceCategories = [
  {
    title: 'Hosen & Röcke',
    icon: '👖',
    items: [
      { name: 'Hose kürzen standard', price: 'ab 8,00 €', duration: '1 Tag' },
      { name: 'Hose kürzen – mit Stoßband (Anzughose)', price: 'ab 18,00 €', duration: '1 Tag' },
      { name: 'Hose kürzen – mit Umschlag', price: 'ab 16,00 €', duration: '1 Tag' },
      { name: 'Hose kürzen – mit Schlitz', price: 'ab 16,00 €', duration: '1 Tag' },
      { name: 'Hose weiter machen (Bund + Beine)', price: '18,00 €', duration: '1–2 Tage' },
      { name: 'Rock kürzen', price: 'ab 16,00 €', duration: '1–2 Tage' },
    ]
  },
  {
    title: 'Jacken, Mäntel & Sakkos',
    icon: '🧥',
    items: [
      { name: 'Sakko enger nähen + kürzen', price: 'ab 18,00 €', duration: '2 Tage' },
      { name: 'Sakko – neues Futter', price: 'ab 22,00 €', duration: '2 Tage' },
      { name: 'Mantel kürzen', price: 'ab 25,00 €', duration: '2 Tage' },
      { name: 'Mantel – neues Futter', price: 'ab 35,00 €', duration: '2–3 Tage' },
      { name: 'Lederjacke – neues Futter', price: 'ab 30,00 €', duration: '2 Tage' },
    ]
  },
  {
    title: 'Kleider',
    icon: '👗',
    items: [
      { name: 'Kleid / Abendmode enger nähen', price: 'ab 14,00 €', duration: 'Nach Aufwand' },
    ]
  },
  {
    title: 'Reißverschlüsse',
    icon: '🤐',
    items: [
      { name: 'Kleid – Reißverschluss erneuern', price: 'ab 18,00 €', duration: '1–2 Tage' },
      { name: 'Reißverschluss erneuern (Stoff)', price: 'ab 18,00 €', duration: '1–2 Tage' },
      { name: 'Reißverschluss erneuern (Leder)', price: 'ab 35,00 €', duration: '1–2 Tage' },
      { name: 'Lederjacke – Reißverschluss erneuern', price: 'ab 35,00 €', duration: '1–2 Tage' },
    ]
  },
  {
    title: 'Weitere Services',
    icon: '✨',
    items: [
      { name: 'Flicken / Riss reparieren', price: 'Auf Anfrage', duration: 'Variiert' },
      { name: 'Knopf annähen / wechseln', price: 'Auf Anfrage', duration: 'Variiert' },
      { name: 'Hemd waschen & von Hand bügeln', price: '3,50 €', duration: 'Sofort / 1 Tag' },
      { name: 'Reinigung & Wäscherei', price: 'Auf Anfrage', duration: 'Variiert' },
      { name: 'DHL Paketshop', price: 'Service', duration: 'Sofort' },
    ]
  }
];
</script>
