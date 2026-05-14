<template>
  <section id="contact" class="section container">
    <div class="cta-card">
      <div>
        <p class="eyebrow">Ready to Roll?</p>
        <h2>Schedule Your Service Today</h2>
        <p>Send your vehicle details and we’ll reply on WhatsApp.</p>
      </div>

      <form class="contact-form" @submit.prevent="submitEnquiry">
        <input v-model="form.reg" placeholder="Car reg" required />
        <input v-model="form.makeModel" placeholder="Make / model" required />
        <textarea v-model="form.issue" placeholder="What’s the issue?" required />
        <input v-model="form.postcode" placeholder="Postcode" required />
        <input v-model="form.preferredDate" placeholder="Preferred date/time" />

        <button class="btn btn-primary" type="submit">
          Message on WhatsApp
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  reg: "",
  makeModel: "",
  issue: "",
  postcode: "",
  preferredDate: ""
});

async function submitEnquiry() {
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  if (!res.ok) {
    alert("Something went wrong. Please call or WhatsApp directly.");
    return;
  }

  const data = await res.json();
  window.location.href = data.whatsappUrl;
}
</script>