<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.table(formData.value)
    successMessage.value = 'Thank you. Your message has been received.'
    formData.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="contact-page min-h-screen grid grid-cols-1 md:grid-cols-2">

    <!-- LEFT: Dark panel with image -->
    <div class="relative overflow-hidden bg-obsidian min-h-[50vh] md:min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        alt="Xeram Boutique"
        class="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-[3s] hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-obsidian/30" />

      <!-- Content over image -->
      <div class="relative z-10 flex flex-col justify-between h-full p-12 md:p-16 min-h-[50vh] md:min-h-screen">
        <div>
          <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Reach Out</p>
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-light text-ivory mb-6 leading-tight">
            Let's Connect
          </h1>
          <div class="gold-divider mb-8" />
          <p class="text-sm font-light text-ash/80 max-w-sm leading-loose">
            Whether you're seeking your signature scent, a bespoke gift, or simply have a question — we're here.
          </p>
        </div>

        <div class="space-y-6 mt-12">
          <div class="gold-divider-full" />

          <div class="pt-4">
            <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-2">Location</p>
            <p class="text-sm font-light text-ivory/70">123 Fragrance Lane, Scent City SC 45678</p>
          </div>
          <div>
            <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-2">Contact</p>
            <p class="text-sm font-light text-ivory/70">support@xeramperfumes.com</p>
            <p class="text-sm font-light text-ivory/70">(555) 123-4567</p>
          </div>
          <div>
            <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-2">Hours</p>
            <p class="text-sm font-light text-ivory/70">Mon – Fri: 8:00 AM – 5:00 PM</p>
            <p class="text-sm font-light text-ivory/70">Saturday: 9:00 AM – 1:00 PM</p>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Form panel -->
    <div class="flex flex-col justify-center px-10 py-16 md:px-16 md:py-24 bg-charcoal">

      <div class="max-w-md w-full mx-auto">
        <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Send a Message</p>
        <h2 class="font-display text-3xl font-light text-ivory mb-8 leading-tight">We'd love to hear from you</h2>
        <div class="gold-divider mb-10" style="margin-left: 0;" />

        <form @submit.prevent="handleSubmit" class="space-y-10">

          <!-- Name -->
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Your name"
              required
              autocomplete="name"
              class="luxury-input"
            />
          </div>

          <!-- Email -->
          <div class="form-field">
            <label class="form-label">Email Address</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="your@email.com"
              required
              autocomplete="email"
              class="luxury-input"
            />
          </div>

          <!-- Message -->
          <div class="form-field">
            <label class="form-label">Message</label>
            <textarea
              v-model="formData.message"
              placeholder="Tell us how we can help..."
              required
              rows="4"
              class="luxury-input resize-none"
            />
          </div>

          <!-- Feedback -->
          <div v-if="successMessage" class="text-[10px] tracking-[0.2em] text-gold font-light">
            ✦ {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="text-[10px] tracking-[0.2em] text-red-400/80 font-light">
            {{ errorMessage }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="contact-submit-btn w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Send Message</span>
            <span v-else class="flex items-center justify-center gap-3">
              <span class="loading-dot" /><span class="loading-dot" style="animation-delay: 0.2s"/><span class="loading-dot" style="animation-delay: 0.4s"/>
            </span>
          </button>
        </form>

        <!-- Map -->
        <div class="mt-14 overflow-hidden border border-gold/15" style="height: 240px;">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.725547217631!2d-0.21527881284178213!3d5.6505620000000265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeabe93%3A0xd78257e67498c1a0!2sUniversity%20of%20Ghana!5e0!3m2!1sen!2sgh!4v1744121281177!5m2!1sen!2sgh"
            class="w-full h-full border-0 opacity-80"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.contact-page { }

.bg-obsidian { background-color: #0a0a0a; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}

.form-label {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.7);
  font-weight: 300;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
}

.luxury-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 0;
  padding: 0.75rem 0;
  color: #f5f0eb;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.03em;
  outline: none;
  transition: border-color 0.3s ease;
}
.luxury-input:focus {
  border-bottom-color: #c9a84c;
}
.luxury-input::placeholder {
  color: rgba(232, 213, 163, 0.25);
  font-size: 0.75rem;
}

.contact-submit-btn {
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.4);
  color: #c9a84c;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.contact-submit-btn:not(:disabled):hover {
  background: #c9a84c;
  color: #0a0a0a;
}
.contact-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.loading-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c9a84c;
  animation: dot-pulse 1.2s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
</style>
