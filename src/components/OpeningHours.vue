<template>
  <div class="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border-t-8 border-[#FF91A4] flex flex-col justify-center h-full">
    <h3 id="oeffnungszeiten" class="text-3xl font-bold text-gray-900 mb-8 scroll-mt-24 flex items-center justify-between flex-wrap gap-4">
      Öffnungszeiten
      <!-- Live Status Badge -->
      <OpeningStatusBadge />
    </h3>

    <ul class="space-y-4 text-lg text-gray-600">
      <!-- Mo, Di, Do, Fr -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isLongDayGroup }">
        <span class="font-medium">Mo, Di, Do, Fr</span>
        <div class="flex flex-col text-right">
             <!-- Morning Slot: Bold if Open AND it is morning slot -->
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isLongDayGroup && isMorningOpen }">10:00 - 13:00</span>
             <!-- Afternoon Slot: Bold if Open AND it is afternoon slot -->
             <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isLongDayGroup && isAfternoonOpen }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Wednesday -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isWednesday }">
        <span class="font-medium">Mittwoch</span>
        <!-- Wednesday only has morning slot -->
        <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isWednesday && isMorningOpen }">10:00 - 13:00</span>
      </li>

      <!-- Saturday -->
      <li class="flex justify-between pt-2 transition-colors duration-300"
           :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isSaturday }">
        <span class="font-medium">Samstag</span>
        <span :class="{ 'text-green-600 font-extrabold scale-105 origin-right': isSaturday && isMorningOpen }">10:00 - 13:00</span>
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
import { useOpeningHours } from '../composables/useOpeningHours';
import OpeningStatusBadge from './OpeningStatusBadge.vue';

const { isLongDayGroup, isWednesday, isSaturday, isMorningOpen, isAfternoonOpen } = useOpeningHours();
</script>
