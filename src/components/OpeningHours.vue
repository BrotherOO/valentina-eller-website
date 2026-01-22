<template>
  <div class="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border-t-8 border-[#FF91A4] flex flex-col justify-center h-full">
    <h3 id="oeffnungszeiten" class="text-3xl font-bold text-gray-900 mb-8 scroll-mt-24 flex items-center justify-between flex-wrap gap-4">
      Öffnungszeiten
      <!-- Live Status Badge -->
      <div v-if="statusMessage" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-sm transition-all duration-500"
        :class="statusClasses">
        <span class="w-2 h-2 rounded-full animate-pulse" :class="statusDotClass"></span>
        {{ statusMessage }}
      </div>
    </h3>

    <ul class="space-y-4 text-lg text-gray-600">
      <!-- Mo, Di, Do, Fr -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isLongDayGroup }">
        <span class="font-medium">Mo, Di, Do, Fr</span>
        <div class="flex flex-col text-right">
             <!-- Morning Slot: Bold if Open AND it is morning slot -->
             <span :class="{ 'text-gray-900 font-extrabold scale-105 origin-right': isLongDayGroup && isMorningOpen }">10:00 - 13:00</span>
             <!-- Afternoon Slot: Bold if Open AND it is afternoon slot -->
             <span :class="{ 'text-gray-900 font-extrabold scale-105 origin-right': isLongDayGroup && isAfternoonOpen }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Wednesday -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isWednesday }">
        <span class="font-medium">Mittwoch</span>
        <!-- Wednesday only has morning slot -->
        <span :class="{ 'text-gray-900 font-extrabold scale-105 origin-right': isWednesday && isMorningOpen }">10:00 - 13:00</span>
      </li>

      <!-- Saturday -->
      <li class="flex justify-between pt-2 transition-colors duration-300"
           :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isSaturday }">
        <span class="font-medium">Samstag</span>
        <span :class="{ 'text-gray-900 font-extrabold scale-105 origin-right': isSaturday && isMorningOpen }">10:00 - 13:00</span>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';

const now = ref(new Date());
let timer: ReturnType<typeof setInterval>;

const startTimer = () => {
    now.value = new Date();
    timer = setInterval(() => {
        now.value = new Date();
    }, 1000 * 60); // Update every minute
};

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

// Helpers
const currentDay = computed(() => now.value.getDay()); // 0=Sun, 1=Mo, ... 6=Sat
const currentHour = computed(() => now.value.getHours());
const currentMinute = computed(() => now.value.getMinutes());
const timeFloat = computed(() => currentHour.value + currentMinute.value / 60);

// Day Groups
const isLongDayGroup = computed(() => [1, 2, 4, 5].includes(currentDay.value)); // Mo, Di, Do, Fr
const isWednesday = computed(() => currentDay.value === 3);
const isSaturday = computed(() => currentDay.value === 6);
const isSunday = computed(() => currentDay.value === 0);

// Status Logic
const status = computed(() => {
    const t = timeFloat.value;

    // 0. Sunday
    if (isSunday.value) {
         return { msg: "Heute geschlossen", type: "closed" };
    }

    // 1. Long Days (Mo, Di, Do, Fr)
    if (isLongDayGroup.value) {
        if (t < 9) return { msg: "Heute geschlossen", type: "closed" };
        if (t < 10) return { msg: "Öffnet demnächst um 10:00 Uhr", type: "soon" }; // 09:00 - 09:59
        if (t < 13) return { msg: "Jetzt geöffnet", type: "open" }; // 10:00 - 12:59
        if (t < 15) return { msg: "Mittagspause – Geöffnet ab 15:00 Uhr", type: "lunch" }; // 13:00 - 14:59
        if (t < 18) return { msg: "Jetzt geöffnet", type: "open" }; // 15:00 - 17:59
        return { msg: "Heute geschlossen", type: "closed" }; // >= 18:00
    }

    // 2. Short Days (Wed, Sat)
    if (isWednesday.value || isSaturday.value) {
        if (t < 9) return { msg: "Heute geschlossen", type: "closed" };
        if (t < 10) return { msg: "Öffnet demnächst um 10:00 Uhr", type: "soon" };
        if (t < 13) return { msg: "Jetzt geöffnet", type: "open" };
        return { msg: "Heute geschlossen", type: "closed" }; // >= 13:00
    }

    return { msg: "Geschlossen", type: "closed" };
});

const statusMessage = computed(() => status.value.msg);

// Slot Highlighting Logic
// Only highlight specific time slots if the store is currently OPEN in that slot.
// If status is 'lunch', 'soon' or 'closed', no time slot should be highlighted text-wise.

const isMorningOpen = computed(() => {
    // True only if status is open AND we are in the morning block
    if (status.value.type !== 'open') return false;
    return timeFloat.value < 13.5; // Technically 13:00, but using < 13.5 ensures coverage if logic shifts slighly, but strictly < 13 is safer for "Open".
    // Wait, status 'open' for Long Days is 10-13 and 15-18.
    // If t=11, type='open', t < 13 -> True.
    // If t=16, type='open', t < 13 -> False.
    // This correctly highlights only the active slot.
});

const isAfternoonOpen = computed(() => {
    if (status.value.type !== 'open') return false;
    return timeFloat.value >= 14.5; // 15:00 onwards
});


const statusClasses = computed(() => {
    switch (status.value.type) {
        case 'open': return 'bg-green-100 text-green-700 border border-green-200'; 
        case 'soon': return 'bg-orange-100 text-orange-700 border border-orange-200';
        case 'lunch': return 'bg-orange-100 text-orange-700 border border-orange-200';
        case 'closed': return 'bg-red-100 text-red-700 border border-red-200';
        default: return 'bg-gray-50 text-gray-500';
    }
});

const statusDotClass = computed(() => {
     switch (status.value.type) {
        case 'open': return 'bg-green-500'; 
        case 'soon': return 'bg-orange-500';
        case 'lunch': return 'bg-orange-500';
        case 'closed': return 'bg-red-500';
        default: return 'bg-gray-400';
    }
});
</script>
