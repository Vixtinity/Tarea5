<script setup lang="ts">
import TimeSlotSelector from './components/TimeSlotSelector.vue';
import RestaurantLayout from './components/RestaurantLayout.vue';
</script>

<template>
  <div class="app-container">
    <header>
      <h1>🍽️ Reserva tu Mesa</h1>
      <p>Sistema de gestión de reservas de restaurante.</p>
    </header>

    <main>
      <TimeSlotSelector />
      <RestaurantLayout />
    </main>

    <footer>
      <p>&copy; 2026 Ejercicio-3 Restaurant System</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 3rem;
  text-align: center;
}

h1 {
  color: var(--text-main);
  margin-bottom: 0.75rem;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(to right, var(--primary-color), #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

main {
  flex: 1;
}

footer {
  margin-top: 5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}
</style>
