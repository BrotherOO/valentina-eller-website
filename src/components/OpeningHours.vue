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
             <!-- Morning Slot: Bold if highlight morning is true, AND it's a long day -->
             <span :class="{ 'text-[#FF91A4]': isLongDayGroup && highlightMorning }">10:00 - 13:00</span>
             <span class="text-xs text-gray-400" v-if="isLongDayGroup">&</span>
             <!-- Afternoon Slot: Bold if highlight afternoon is true -->
             <span :class="{ 'text-[#FF91A4]': isLongDayGroup && highlightAfternoon }">15:00 - 18:00</span>
        </div>
      </li>

      <!-- Wednesday -->
      <li class="flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300"
          :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isWednesday }">
        <span class="font-medium">Mittwoch</span>
        <!-- Wednesday only has morning slot. Highlight if it's Wed AND morning highlight is active -->
        <span :class="{ 'text-[#FF91A4]': isWednesday && highlightMorning }">10:00 - 13:00</span>
      </li>

      <!-- Saturday -->
      <li class="flex justify-between pt-2 transition-colors duration-300"
           :class="{ 'font-bold text-gray-900 bg-[#FFF0F3]/30 px-2 -mx-2 rounded-lg': isSaturday }">
        <span class="font-medium">Samstag</span>
        <span :class="{ 'text-[#FF91A4]': isSaturday && highlightMorning }">10:00 - 13:00</span>
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

// Day Groups
const isLongDayGroup = computed(() => [1, 2, 4, 5].includes(currentDay.value)); // Mo, Di, Do, Fr
const isWednesday = computed(() => currentDay.value === 3);
const isSaturday = computed(() => currentDay.value === 6);

// Status Logic
const status = computed(() => {
    // 1. Sunday
    if (currentDay.value === 0) {
         return { msg: "Heute geschlossen", type: "closed" };
    }

    // 2. Before 10:00 (All days)
    if (timeFloat.value < 10) {
        return { msg: "Öffnet demnächst um 10:00 Uhr", type: "soon" };
    }

    // 3. Lunch Break (Long Days: 13:00 - 15:00)
    if (isLongDayGroup.value && timeFloat.value >= 13 && timeFloat.value < 15) {
        return { msg: "Aktuell in der Mittagspause – wir öffnen wieder ab 15:00 Uhr", type: "lunch" };
    }

    // 4. Closed Early (Wed & Sat > 13:00)
    if ((isWednesday.value || isSaturday.value) && timeFloat.value >= 13) {
        return { msg: "Für heute geschlossen – wir öffnen am nächsten Werktag", type: "closed" };
    }

    // 5. Closed Evening (Long Days > 18:00)
    if (isLongDayGroup.value && timeFloat.value >= 18) {
        return { msg: "Geschlossen – öffnet morgen um 10:00 Uhr", type: "closed" };
    }

    // 6. Default Open
    return { msg: "Jetzt geöffnet", type: "open" };
});

const statusMessage = computed(() => status.value.msg);

// Slot Highlighting Logic
// Only highlight specific time slots if the store is currently OPEN or SOON to open in that slot.
// If closed for the day, NO time slot should be highlighted (just the day row).

const highlightMorning = computed(() => {
    // Highlight 10-13 if it's before 13:00 AND status is not 'closed' (unless it's 'soon' before 10)
    if (status.value.type === 'closed') return false;
    if (status.value.type === 'lunch') return false;
    return timeFloat.value < 13;
});

const highlightAfternoon = computed(() => {
    // Highlight 15-18 if it's Long Day AND (after 13:00 OR currently in lunch) AND not closed
    if (!isLongDayGroup.value) return false;
    if (status.value.type === 'closed') return false;
    // If it's morning (e.g. 11:00), we typically focus regarding the *current* open slot. 
    // User requested: "Ist es nach 15:00 Uhr, markiere nur 15:00 - 18:00 fett."
    // Also implicit: during lunch (13-15), we probably want to highlight the *next* slot (15-18).
    return timeFloat.value >= 13; 
});


const statusClasses = computed(() => {
    switch (status.value.type) {
        case 'open': return 'bg-[#FF91A4]/20 text-[#D06074] border border-[#FF91A4]/30'; 
        case 'soon': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
        case 'lunch': return 'bg-blue-50 text-blue-600 border border-blue-200';
        case 'closed': return 'bg-gray-100 text-gray-500 border border-gray-200';
        default: return 'bg-gray-50 text-gray-500';
    }
});

const statusDotClass = computed(() => {
     switch (status.value.type) {
        case 'open': return 'bg-[#D06074]'; 
        case 'soon': return 'bg-yellow-500';
        case 'lunch': return 'bg-blue-400';
        case 'closed': return 'bg-gray-400';
        default: return 'bg-gray-400';
    }
});
</script>
