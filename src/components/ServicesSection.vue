<template>
  <section id="services" class="section container">
    <div class="section-head">
      <p class="eyebrow">Our Expertise</p>
      <h2>Professional Mechanical Services</h2>
    </div>
    <div class="service-grid">
      <article v-for="service in services" :key="service.title" class="card">
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const services = [
  { title: 'Engine Diagnostics', description: 'Advanced scan tools and experienced mechanics to quickly identify and resolve issues.' },
  { title: 'Brake & Suspension', description: 'Safe, responsive handling with premium brake, suspension, and steering service.' },
  { title: 'Transmission Repair', description: 'Smooth shifts and reliable drivetrain performance with specialist support.' },
  { title: 'Routine Maintenance', description: 'Oil changes, fluid checks, filters, and scheduled servicing to protect your vehicle.' },
  { title: 'Electrical Systems', description: 'Battery, alternator, starter, and wiring diagnostics for complete confidence.' },
  { title: 'Performance Tuning', description: 'Optimized power, efficiency, and drivability tailored to your car and goals.' }
]
</script>
