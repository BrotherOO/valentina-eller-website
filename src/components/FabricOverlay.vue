<template>
  <div class="fabric-overlay" />
</template>

<style scoped>
.fabric-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='2' height='2' fill='%23c47060'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23c47060'/%3E%3Crect width='2' height='4' fill='none' stroke='%23a05040' stroke-width='0.4'/%3E%3Crect width='4' height='2' fill='none' stroke='%23a05040' stroke-width='0.4'/%3E%3C/svg%3E");
  background-size: 4px 4px;
  animation: fabricDrift 12s linear infinite;
}

@keyframes fabricDrift {
  0%   { background-position: 0 0; }
  100% { background-position: 4px 4px; }
}
</style>
