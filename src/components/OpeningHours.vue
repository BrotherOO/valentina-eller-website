<template>
  <div class="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border-t-8 border-[#FF91A4] flex flex-col justify-center h-full">
    <h3 id="oeffnungszeiten" class="text-3xl font-bold text-gray-900 mb-8 scroll-mt-24 flex items-center justify-between flex-wrap gap-4">
      Öffnungszeiten
      <!-- Live Status Badge -->
      <OpeningStatusBadge />
    </h3>

    <ul class="space-y-4 text-lg text-gray-600">
      <!-- Montag -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'text-green-600 font-bold bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isCurrentDay(1) }">
        <span class="font-medium">Montag</span>
        <div class="flex flex-col text-right">
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(1) && isMorningOpen }">10:00 - 13:00</span>
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(1) && isAfternoonOpen }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Dienstag -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'text-green-600 font-bold bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isCurrentDay(2) }">
        <span class="font-medium">Dienstag</span>
        <div class="flex flex-col text-right">
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(2) && isMorningOpen }">10:00 - 13:00</span>
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(2) && isAfternoonOpen }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Mittwoch -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'text-green-600 font-bold bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isCurrentDay(3) }">
        <span class="font-medium">Mittwoch</span>
        <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(3) && isMorningOpen }">10:00 - 13:00</span>
      </li>

      <!-- Donnerstag -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'text-green-600 font-bold bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isCurrentDay(4) }">
        <span class="font-medium">Donnerstag</span>
        <div class="flex flex-col text-right">
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(4) && isMorningOpen }">10:00 - 13:00</span>
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(4) && isAfternoonOpen }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Freitag -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'text-green-600 font-bold bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isCurrentDay(5) }">
        <span class="font-medium">Freitag</span>
        <div class="flex flex-col text-right">
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(5) && isMorningOpen }">10:00 - 13:00</span>
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(5) && isAfternoonOpen }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Samstag -->
      <li class="flex justify-between pt-2 transition-colors duration-300"
           :class="{ 'text-green-600 font-bold bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isCurrentDay(6) }">
        <span class="font-medium">Samstag</span>
        <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isCurrentDay(6) && isMorningOpen }">10:00 - 13:00</span>
      </li>
    </ul>

    <div class="mt-8 pt-6 border-t border-gray-200">
      <p class="text-xl font-bold text-gray-900 flex items-center gap-3">
        <span class="bg-[#FF91A4]/10 p-2 rounded-full">📞</span>
        <a href="tel:021191737673" class="hover:text-[#FF91A4] transition-colors">0211 91737673</a>
      </p>
      <p class="mt-2 text-gray-500">
        Rufen Sie uns an für Terminvereinbarungen oder Fragen.
      </p>
    </div>

     <!-- Parking/Arrival Info -->
    <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex gap-4">
            <div class="text-2xl bg-blue-50 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                🚌
            </div>
            <div>
                <h4 class="font-bold text-gray-900 mb-1">Stressfreie Anfahrt</h4>
                <p class="text-sm text-gray-600 leading-relaxed">
                    Wir liegen in einer ruhigen Siedlung mit entspannter Parkplatzsituation. Auch per Bus & Bahn (Haltestelle Eller Mitte) bequem erreichbar.
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useOpeningHours } from '../composables/useOpeningHours';
import OpeningStatusBadge from './OpeningStatusBadge.vue';

const { currentDay, isMorningOpen, isAfternoonOpen } = useOpeningHours();

const isMounted = ref(false);
onMounted(() => {
    isMounted.value = true;
});

const isCurrentDay = (dayNumber: number) => isMounted.value && currentDay.value === dayNumber;
</script>
