import { ref, computed, onMounted, onUnmounted } from 'vue';

// Global state so all components sync identically across the client
const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | null = null;
let subscribers = 0;

export function useOpeningHours() {
    const startTimer = () => {
        if (subscribers === 0) {
            now.value = new Date();
            timer = setInterval(() => {
                now.value = new Date();
            }, 1000 * 60); // Update every minute
        }
        subscribers++;
    };

    const stopTimer = () => {
        subscribers--;
        if (subscribers <= 0 && timer) {
            clearInterval(timer);
            timer = null;
            subscribers = 0;
        }
    };

    onMounted(() => {
        startTimer();
    });

    onUnmounted(() => {
        stopTimer();
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
    const getNextWorkdayText = (d: number): string => {
        if (d === 5) return ", öffnet am Samstag";   // Freitag nach 18h → Sa
        if (d === 6) return " – öffnet am Montag";    // Samstag → Mo
        if (d === 3) return " – öffnet morgen";       // Mittwoch → Do
        return " – öffnet morgen";
    };

    const status = computed(() => {
        const t = timeFloat.value;
        const d = currentDay.value;

        // 0. Sunday
        if (isSunday.value) {
             return { msg: "Heute geschlossen – öffnet am Montag", type: "closed" };
        }

        // 1. Long Days (Mo, Di, Do, Fr)
        if (isLongDayGroup.value) {
            if (t < 10) return { msg: "Öffnet heute um 10:00 Uhr", type: "soon" };
            if (t < 13) return { msg: "Jetzt geöffnet – bis 13:00 Uhr", type: "open" };
            if (t < 15) return { msg: "Mittagspause – öffnet um 15:00 Uhr", type: "lunch" };
            if (t < 18) return { msg: "Jetzt geöffnet – bis 18:00 Uhr", type: "open" };
            return { msg: `Heute bereits geschlossen${getNextWorkdayText(d)}`, type: "closed" };
        }

        // 2. Short Days (Wed, Sat)
        if (isWednesday.value || isSaturday.value) {
            if (t < 10) return { msg: "Öffnet heute um 10:00 Uhr", type: "soon" };
            if (t < 13) return { msg: "Jetzt geöffnet – bis 13:00 Uhr", type: "open" };
            return { msg: `Heute bereits geschlossen${getNextWorkdayText(d)}`, type: "closed" };
        }

        return { msg: "Geschlossen", type: "closed" };
    });

    const statusMessage = computed(() => status.value.msg);

    const isMorningOpen = computed(() => {
        if (status.value.type !== 'open') return false;
        return timeFloat.value < 13.5; 
    });

    const isAfternoonOpen = computed(() => {
        if (status.value.type !== 'open') return false;
        return timeFloat.value >= 14.5;
    });

    const statusStyle = computed(() => {
        const map: Record<string, string> = {
            open:   'background:#dcfce7; color:#15803d; border:1px solid #bbf7d0',
            soon:   'background:#ffedd5; color:#c2410c; border:1px solid #fed7aa',
            lunch:  'background:#ffedd5; color:#c2410c; border:1px solid #fed7aa',
            closed: 'background:#fee2e2; color:#b91c1c; border:1px solid #fecaca',
        };
        return map[status.value.type] ?? 'background:#f9fafb; color:#6b7280; border:1px solid #e5e7eb';
    });

    const statusDotStyle = computed(() => {
        const map: Record<string, string> = {
            open:   'background:#22c55e',
            soon:   'background:#f97316',
            lunch:  'background:#f97316',
            closed: 'background:#ef4444',
        };
        return map[status.value.type] ?? 'background:#9ca3af';
    });

    return {
        now,
        isLongDayGroup,
        isWednesday,
        isSaturday,
        isSunday,
        status,
        statusMessage,
        isMorningOpen,
        isAfternoonOpen,
        statusStyle,
        statusDotStyle
    };
}
