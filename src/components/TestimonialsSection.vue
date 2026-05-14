<template>
  <section class="section testimonials">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Client Feedback</p>
        <h2>What Drivers Say</h2>
      </div>
      <div class="testimonial-grid">
        <article v-for="quote in quotes" :key="quote.name" class="card quote-card">
          <p class="quote">“{{ quote.text }}”</p>
          <p class="author">{{ quote.name }} · {{ quote.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const quotes = [
  { name: 'Michael R.', detail: 'BMW Owner', text: 'Transparent pricing, fast turnaround, and dealership-level quality. My go-to shop.' },
  { name: 'Sophia L.', detail: 'Fleet Manager', text: 'They keep our vehicles road-ready with minimal downtime and clear updates.' },
  { name: 'Jamal T.', detail: 'Sports Car Enthusiast', text: 'The tuning and diagnostics work transformed the way my car drives.' }
]
</script>
