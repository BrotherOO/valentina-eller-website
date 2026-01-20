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
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isLongDay }">
        <span class="font-medium">Mo, Di, Do, Fr</span>
        <div class="flex flex-col text-right">
             <span :class="{ 'text-[#FF91A4]': isLongDay && isMorningSlot }">10:00 - 13:00</span>
             <span class="text-xs text-gray-400" v-if="isLongDay">&</span>
             <span :class="{ 'text-[#FF91A4]': isLongDay && isAfternoonSlot }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Wednesday -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': currentDay === 3 }">
        <span class="font-medium">Mittwoch</span>
        <span :class="{ 'text-[#FF91A4]': currentDay === 3 && isMorningSlot }">10:00 - 13:00</span>
      </li>

      <!-- Saturday -->
      <li class="flex justify-between font-bold text-gray-800 pt-2 transition-colors duration-300"
           :class="{ 'text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': currentDay === 6 }">
        <span>Samstag</span>
        <span :class="{ 'text-[#FF91A4]': currentDay === 6 && isMorningSlot }">10:00 - 13:00</span>
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
    }, 60000); // Update every minute
};

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timer);
});

// Helpers
const currentDay = computed(() => now.value.getDay()); // 0=Sun, 1=Mo, ... 6=Sat
const currentHour = computed(() => now.value.getHours());
const currentMinute = computed(() => now.value.getMinutes());
const timeFloat = computed(() => currentHour.value + currentMinute.value / 60);

// Mo, Di, Do, Fr (1, 2, 4, 5)
const isLongDay = computed(() => [1, 2, 4, 5].includes(currentDay.value));
// Wed (3), Sat (6)
const isShortDay = computed(() => [3, 6].includes(currentDay.value));

// Slots Logic
const isMorningSlot = computed(() => {
    // 10:00 - 13:00
    return timeFloat.value >= 10 && timeFloat.value < 13;
});

const isAfternoonSlot = computed(() => {
    // 15:00 - 18:00 (only on Long Days)
    return isLongDay.value && timeFloat.value >= 15 && timeFloat.value < 18;
});

// Status Message Logic
const status = computed(() => {
    // 1. Before 10:00
    if (timeFloat.value < 10) {
        return { msg: "Öffnet demnächst um 10:00 Uhr", type: "soon" };
    }

    // 2. Lunch Break (Long Days only, 13:00 - 15:00)
    if (isLongDay.value && timeFloat.value >= 13 && timeFloat.value < 15) {
        return { msg: "Aktuell in der Mittagspause – wir öffnen wieder ab 15:00 Uhr", type: "lunch" };
    }

    // 3. Closed Early (Short Days > 13:00)
    if (isShortDay.value && timeFloat.value >= 13) {
        // Find next working day? Simple "Closed for today" as requested
        return { msg: "Für heute geschlossen – wir öffnen am nächsten Werktag", type: "closed" };
    }

    // 4. Closed Evening (Long Days > 18:00)
    if (isLongDay.value && timeFloat.value >= 18) {
        return { msg: "Geschlossen – öffnet morgen um 10:00 Uhr", type: "closed" };
    }
    
     // 5. Sunday
    if (currentDay.value === 0) {
         return { msg: "Heute geschlossen", type: "closed" };
    }

    // 6. Default Open
    return { msg: "Jetzt geöffnet", type: "open" };
});

const statusMessage = computed(() => status.value.msg);

const statusClasses = computed(() => {
    switch (status.value.type) {
        case 'open': return 'bg-[#FF91A4]/20 text-[#D06074] border border-[#FF91A4]/30'; // CI colors (Salmon)
        case 'soon': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
        case 'lunch': return 'bg-gray-100 text-gray-600 border border-gray-200';
        case 'closed': return 'bg-gray-100 text-gray-500 border border-gray-200';
        default: return 'bg-gray-50 text-gray-500';
    }
});

const statusDotClass = computed(() => {
     switch (status.value.type) {
        case 'open': return 'bg-[#D06074]'; 
        case 'soon': return 'bg-yellow-500';
        case 'lunch': return 'bg-gray-400';
        case 'closed': return 'bg-gray-400';
        default: return 'bg-gray-400';
    }
});
</script>
