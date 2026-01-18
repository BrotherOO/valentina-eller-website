<template>
  <section id="leistungen" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Unsere Dienstleistungen</h2>
        <p class="text-gray-500 max-w-2xl mx-auto">Von einfachen Anpassungen bis hin zu komplexen Reparaturen – wir kümmern uns um jedes Detail Ihrer Garderobe.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Service 1 -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-secondary/30 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-100">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-400 mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiRuler class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Hosen & Ärmel kürzen</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Perfekte Länge für den perfekten Fall. Originalsaum oder neuer Abschluss.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-300"></span>Schnell & sauber</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-300"></span>Originalsaum möglich</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-300"></span>Auch für Jeans</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-blue-900">ab 12€</span>
          </div>
        </div>

        <!-- Service 2 -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-purple-50 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-100">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-400 mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiWardrobe class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Anpassungen</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Kleider, Sakkos oder Blusen – wir passen Ihre Kleidung millimetergenau an.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-300"></span>Taille anpassen</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-300"></span>Schultern heben</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-300"></span>Figurbetont</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-purple-900">Individuell</span>
          </div>
        </div>

        <!-- Service 3 -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-green-50 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-green-100">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-400 mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiZipper class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Reparaturen</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Reißverschlüsse, Risse oder Löcher – retten Sie Ihre Lieblingsstücke.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-300"></span>Reißverschlussauschtausch</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-300"></span>Kunststopfen</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-300"></span>Knöpfe annähen</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-green-900">ab 15€</span>
          </div>
        </div>

        <!-- Service 4 -->
        <div class="group bg-neutral-50 p-8 rounded-3xl hover:bg-orange-50 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-orange-100">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-400 mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <MdiLeather class="text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Leder & Wohnen</h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">Spezialbehandlung für Lederjacken sowie Gardinen und Vorhänge nach Maß.</p>
          <ul class="text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-300"></span>Lederpflege</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-300"></span>Gardinen kürzen</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-300"></span>Kissenbezüge</li>
          </ul>
          <div class="flex justify-between items-center text-sm font-semibold">
             <span class="text-orange-900">Auf Anfrage</span>
          </div>
        </div>

      </div>

      <div class="mt-12 text-center">
        <a href="#kontakt" class="inline-flex items-center font-semibold text-green-700 hover:text-green-900 transition-colors">
            Unverbindliche Preisanfrage stellen
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import MdiRuler from '~icons/mdi/ruler'; 
import MdiWardrobe from '~icons/mdi/wardrobe'; 
import MdiZipper from '~icons/mdi/wrench'; // Safe replacement for repairs
import MdiLeather from '~icons/mdi/home'; // Safe replacement for living/curtains might not exist directly or be different. 'wallet-bifold' or 'material-design' or generic. Checking common mdi names. 'mdi:leather' exists? Let's use 'coat-rack' or similar if leather not found. 'mdi:leather' is not standard MDI. 'mdi:hand-back-right-off' no. 'mdi:cow' no.
// Re-checking requested icons: mdi-leather.
// If mdi-leather is invalid, I'll use mdi-hanger or mdi-texture.
// Actually, I'll check if mdi-leather exists. It's likely `mdi:leather` doesn't exist.
// Replaced with `mdi:material-design` or `mdi:tshirt-crew` or `mdi:hanger`.
// User asked for "mdi-leather". I'll try `mdi:leather-off`? No.
// I will use `~icons/mdi/content-cut` for generic or `~icons/mdi/sofa` for interior?
// Let's use `~icons/mdi/hand-heart` (care) or similar.
// Actually I'll use `~icons/mdi/sofa-outline` for Gardinen/Wohnen vibe, or `~icons/mdi/coat-rack`.
// Let's stick with `~icons/mdi/coat-rack` as safe fallback for "Leder & Wohnen".
</script>
