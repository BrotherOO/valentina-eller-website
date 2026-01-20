<template>
  <section class="py-20 bg-gradient-to-br from-[#FFF5F2] to-white overflow-hidden">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-12">Was unsere Kunden sagen</h2>

         <!-- Slides -->
         <div 
            class="relative min-h-[420px] flex items-center justify-center"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
           <Transition name="fade" mode="out-in">
             <div :key="currentIndex" class="w-full">
                <div class="bg-white p-8 md:p-12 rounded-3xl shadow-lg relative mx-4 md:mx-0 text-center flex flex-col items-center">
                     <!-- Quote Icon -->
                     <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-highlight rounded-full flex items-center justify-center text-4xl text-accent-warm font-serif shadow-sm">
                        &rdquo;
                     </div>
                     
                     <!-- Stars (Centered) -->
                     <div class="flex justify-center gap-1 mb-6 text-yellow-400 mt-4 w-full">
                        <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                        </svg>
                     </div>
    
                     <p class="text-lg md:text-2xl text-gray-700 italic mb-8 leading-relaxed max-w-2xl mx-auto min-h-[80px] flex items-center justify-center">
                        {{ reviews[currentIndex].text }}
                     </p>
                     
                     <div class="flex flex-col items-center w-full">
                        <div class="w-16 h-16 bg-gray-200 rounded-full mb-3 overflow-hidden shadow-sm">
                             <img :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${reviews[currentIndex].name}`" alt="Avatar" class="w-full h-full object-cover" />
                        </div>
                        <p class="font-bold text-gray-900 text-lg">{{ reviews[currentIndex].name }}</p>
                        <p class="text-sm text-gray-500 uppercase tracking-widest">{{ reviews[currentIndex].type }}</p>
                     </div>
                </div>
             </div>
           </Transition>
         </div>

         <!-- Controls Below Card -->
         <div class="flex flex-col items-center gap-6 mt-0">
             <div class="flex justify-center gap-3">
                <button v-for="(_, index) in reviews" :key="index" @click="currentIndex = index" :class="['h-3 rounded-full transition-all duration-300', currentIndex === index ? 'bg-accent-warm w-8' : 'w-3 bg-gray-300 hover:bg-[#F8A08C]/50']" :aria-label="'Gehe zu Bewertung ' + (index + 1)">
                </button>
             </div>
             
             <div class="flex gap-4">
                 <button @click="prevSlide" class="p-3 rounded-full bg-white shadow-md text-gray-600 hover:text-accent-warm hover:scale-110 transition-all border border-gray-100" aria-label="Vorherige Bewertung">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                     </svg>
                 </button>
                 <button @click="nextSlide" class="p-3 rounded-full bg-white shadow-md text-gray-600 hover:text-accent-warm hover:scale-110 transition-all border border-gray-100" aria-label="Nächste Bewertung">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                     </svg>
                 </button>
             </div>
         </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const reviews = [
    { text: "Mein Brautkleid war ein Erbstück und eigentlich unrettbar. Valentina hat es mit so viel Gefühl modernisiert. Ich habe geweint vor Glück.", name: "Lisa K.", type: "Braut" },
    { text: "Als Biker ist mir Sicherheit wichtig. Der neue Reißverschluss an meiner Lederjacke ist robuster als das Original. Top Arbeit!", name: "Markus W.", type: "Leder-Spezialist" },
    { text: "Montag Hose gebracht, Dienstag abgeholt. Der Express-Service ist der Wahnsinn für Düsseldorf. Danke!", name: "Sophie T.", type: "Express" },
    { text: "Ich komme seit 20 Jahren hierher. Egal ob Gardinen oder Mantel – Valentina ist eine Institution des Vertrauens.", name: "Renate B.", type: "Stammkundin" },
    { text: "Mein Business-Anzug musste perfekt sitzen. Jetzt tut er es. Die Beratung zur Passform war exzellent.", name: "Jan P.", type: "Business" }
];

const currentIndex = ref(0);
let interval: ReturnType<typeof setInterval>;

// Swipe Logic
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e: TouchEvent) => {
    touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.value = e.changedTouches[0].screenX;
    handleSwipe();
};

const handleSwipe = () => {
    if (touchEndX.value < touchStartX.value - 50) {
        nextSlide(); // Swipe Left -> Next
        resetTimer();
    }
    if (touchEndX.value > touchStartX.value + 50) {
        prevSlide(); // Swipe Right -> Prev
        resetTimer();
    }
};

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % reviews.length;
};

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + reviews.length) % reviews.length;
};

const resetTimer = () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 8000); 
};

onMounted(() => {
    interval = setInterval(nextSlide, 8000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>
