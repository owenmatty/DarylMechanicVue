<template>
  <section id="contact" class="section container">
    <div class="cta-card">

      <div>
        <div>
  <p class="eyebrow">Ready to Roll?</p>

  <h2>Schedule Your Service Today</h2>

  <p>
    Send your vehicle details and we’ll contact you on WhatsApp to arrange a booking.
  </p>

  <p class="contact-direct">
    Or call us directly on
    <a href="tel:077777777">07777 77777</a>
  </p>
</div>
      </div>

      <form class="contact-form" @submit.prevent="submitEnquiry">

        <!-- REG -->
        <input v-model="form.reg" placeholder="Car reg" @blur="lookupReg" class="reg-input" required />

        <!-- VEHICLE -->
        <input v-model="form.makeModel" placeholder="Make / model"
          :readonly="!vehicleLookupFailed && !!form.makeModel" />

        <!-- LOOKUP STATUS -->
        <p v-if="loadingVehicle" class="lookup-status">
          Looking up vehicle...
        </p>

        <p v-if="vehicleLookupFailed" class="lookup-error">
          Vehicle lookup failed. Please enter manually.
        </p>

        <!-- ISSUE -->
        <textarea v-model="form.issue" placeholder="What’s the issue?" required></textarea>

        <!-- POSTCODE -->
        <input v-model="form.postcode" placeholder="Postcode" required />

        <!-- SUBMIT -->
        <button class="btn btn-primary" type="submit" :disabled="loading">
          {{ loading ? "Loading..." : "Message on WhatsApp" }}
        </button>

      </form>

    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

const loading = ref(false);

const loadingVehicle = ref(false);

const vehicleLookupFailed = ref(false);

const form = reactive({
  reg: "",
  makeModel: "",
  issue: "",
  postcode: "",
});

async function lookupReg() {

  if (!form.reg) return;

  loadingVehicle.value = true;

  vehicleLookupFailed.value = false;

  try {

    const res = await fetch("/api/lookupReg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reg: form.reg
      })
    });

    if (!res.ok) {

      vehicleLookupFailed.value = true;

      return;
    }

    const data = await res.json();

    form.makeModel = data.makeModel;

  } catch (err) {

    console.error(err);

    vehicleLookupFailed.value = true;

  } finally {

    loadingVehicle.value = false;
  }
}

async function submitEnquiry() {

  loading.value = true;

  try {

    // Clean inputs
    form.reg = form.reg.trim();
    form.issue = form.issue.trim();
    form.postcode = form.postcode.trim();

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (!res.ok) {

      alert(
        "Something went wrong. Please call or WhatsApp directly."
      );

      return;
    }

    const data = await res.json();

    window.location.href = data.whatsappUrl;

  } catch (err) {

    console.error(err);

    alert(
      "Something went wrong. Please call or WhatsApp directly."
    );

  } finally {

    loading.value = false;
  }
}
</script>

<style scoped>
.contact-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.contact-form textarea {
  min-height: 120px;
  resize: vertical;
  grid-column: span 2;
}

.contact-form textarea,
.contact-form input {
  width: 100%;
  padding: 0.9rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  box-sizing: border-box;
}

.contact-form button {
  grid-column: span 2;
}

.reg-input {
  text-transform: uppercase;
}

.lookup-status {
  grid-column: span 2;
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.lookup-error {
  grid-column: span 2;
  margin: 0;
  font-size: 0.9rem;
  color: #ffb3b3;
}

@media (max-width: 768px) {

  .contact-form {
    grid-template-columns: 1fr;
  }

  .contact-form textarea,
  .contact-form button,
  .lookup-status,
  .lookup-error {
    grid-column: span 1;
  }
}
</style>