<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="container">
      <nav>
        <RouterLink to="/" class="nav-brand">Tienda Online</RouterLink>
        <div class="nav-links">
          <RouterLink to="/">Checkout</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView class="main-content" />
</template>

<style scoped>
.app-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-weight: bold;
  font-size: 1.25rem;
  color: var(--color-accent);
  text-decoration: none;
}

.nav-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--color-primary);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}
</style>
