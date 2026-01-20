<template>
  <section id="leistungen" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Unsere Dienstleistungen</h2>
        <p class="text-gray-500 max-w-2xl mx-auto">Von einfachen Anpassungen bis hin zu komplexen Reparaturen – wir kümmern uns um jedes Detail Ihrer Garderobe.</p>
      </div>

      <!-- 4-Card Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Service 1: Hosen -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-accent-warm/10 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-accent-warm/20">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-warm mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiRuler class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Hosen & Ärmel kürzen</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Perfekte Länge für den perfekten Fall. Originalsaum oder neuer Abschluss.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Schnell & sauber</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Originalsaum möglich</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Auch für Jeans</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-secondary-deep">ab 8€</span>
          </div>
        </div>

        <!-- Service 2: Änderungen & Reparaturen (Consolidated) -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-accent-warm/10 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-accent-warm/20">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-warm mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiZipper class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Änderungen & Reparaturen</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Wir passen Ihre Kleidung an oder retten Lieblingsstücke mit fachgerechten Reparaturen.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Taille & Passform</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Reißverschlüsse</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Risse & Löcher</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-secondary-deep">Individuell</span>
          </div>
        </div>

        <!-- Service 3: Heimtextilien -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-accent-warm/10 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-accent-warm/20">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-warm mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiLeather class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Heimtextilien & Mehr</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Wohnlichkeit nach Maß – wir bearbeiten Ihre Heimtextilien fachgerecht.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Gardinen kürzen</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Kissenbezüge</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Tischdecken</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-secondary-deep">Auf Anfrage</span>
          </div>
        </div>

        <!-- Service 4: DHL -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-accent-warm/10 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-accent-warm/20">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-warm mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiPackageVariantClosed class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">DHL Paketshop</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Bequemer Paket-Service direkt bei Ihrer Schneiderin.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Paketannahme</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Retouren</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>Briefmarken</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-secondary-deep">Service</span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import MdiRuler from '~icons/mdi/ruler'; 
import MdiZipper from '~icons/mdi/wrench'; 
import MdiLeather from '~icons/mdi/home'; 
import MdiPackageVariantClosed from '~icons/mdi/package-variant-closed';
</script>
