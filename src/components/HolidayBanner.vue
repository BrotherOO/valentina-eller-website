<template>
  <div v-if="activeHoliday" class="w-full bg-primary-action text-white py-3 px-4 shadow-md z-50 text-center font-sans">
    <div class="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <span>
        Wir haben am <strong>{{ formattedDate }}</strong> leider aufgrund von <strong>{{ activeHoliday.name }}</strong> geschlossen.
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const activeHoliday = ref(null);

// Sie können hier jederzeit weitere Tage eintragen (Monat ist 0-basiert: 0=Januar, 1=Februar, ..., 11=Dezember)
const customSchliesstage = [
  // Beispiel: { date: new Date(2026, 4, 15), name: 'Betriebsferien' }
];

function getNRWHolidays(year) {
  // Feste Feiertage
  const fixed = [
    { date: new Date(year, 0, 1), name: 'Neujahr' },
    { date: new Date(year, 4, 1), name: 'Tag der Arbeit' },
    { date: new Date(year, 9, 3), name: 'Tag der Deutschen Einheit' },
    { date: new Date(year, 10, 1), name: 'Allerheiligen' },
    { date: new Date(year, 11, 25), name: '1. Weihnachtstag' },
    { date: new Date(year, 11, 26), name: '2. Weihnachtstag' }
  ];

  // Dynamische Feiertage (Osterformel)
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const k = Math.floor(year / 100);
  const p = Math.floor((13 + 8 * k) / 25);
  const q = Math.floor(k / 4);
  const M = (15 - p + k - q) % 30;
  const N = (4 + k - q) % 7;
  const d = (19 * a + M) % 30;
  const e = (2 * b + 4 * c + 6 * d + N) % 7;
  
  let easterDay = 22 + d + e;
  let easterMonth = 2; // März (0-basiert)
  
  if (easterDay > 31) {
    easterDay = d + e - 9;
    easterMonth = 3; // April
    if (easterDay === 26) easterDay = 19;
    if (easterDay === 25 && d === 28 && e === 6 && a > 10) easterDay = 18;
  }
  
  const easterDate = new Date(year, easterMonth, easterDay);
  
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const dynamic = [
    { date: addDays(easterDate, -2), name: 'Karfreitag' },
    { date: addDays(easterDate, 1), name: 'Ostermontag' },
    { date: addDays(easterDate, 39), name: 'Christi Himmelfahrt' },
    { date: addDays(easterDate, 50), name: 'Pfingstmontag' },
    { date: addDays(easterDate, 60), name: 'Fronleichnam' }
  ];

  return [...fixed, ...dynamic];
}

onMounted(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Nur das Datum betrachten, Uhrzeit ignorieren
  
  const currentYear = today.getFullYear();
  // Alle Feiertage für dieses und nächstes Jahr laden, plus eventuelle benutzerdefinierte Tage
  let allHolidays = [
    ...getNRWHolidays(currentYear),
    ...getNRWHolidays(currentYear + 1),
    ...customSchliesstage
  ];

  // Feiertage sortieren und normalisieren
  allHolidays = allHolidays.map(h => {
    const d = new Date(h.date);
    d.setHours(0, 0, 0, 0);
    return { ...h, date: d };
  }).sort((a, b) => a.date - b.date);

  // Nächsten Feiertag finden, der in die 3-Tage-Regel fällt
  for (const holiday of allHolidays) {
    const diffTime = holiday.date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Wenn Feiertag in genau 3 Tagen oder weniger ist (und nicht in der Vergangenheit)
    if (diffDays >= 0 && diffDays <= 3) {
      activeHoliday.value = holiday;
      break;
    }
  }
});

const formattedDate = computed(() => {
  if (!activeHoliday.value) return '';
  return activeHoliday.value.date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
});
</script>
