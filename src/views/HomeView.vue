<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const links = ref([
  { to: '/shop/all-products', label: 'All Products' },
  { to: '/impressions', label: 'Xeram Impressions' },
  { to: '/originals', label: 'Xeram Originals' },
])

const products = ref([
  {
    image: 'https://framerusercontent.com/images/ug0vkWyQY3f0lCoBGqtMyZOOX8.png',
    label: '50ml Collection',
    subtitle: 'The Intimate',
  },
  {
    image: 'https://framerusercontent.com/images/M9w1f2fEVtJVeeq8GvA4qKno.png',
    label: '80ml Collection',
    subtitle: 'The Classic',
  },
  {
    image: 'https://framerusercontent.com/images/P7Vm4OSclayi0pb1ozvC9h3W64.png',
    label: '100ml Collection',
    subtitle: 'The Statement',
  },
])

// Scroll reveal
const heroRef = ref<HTMLElement | null>(null)
const parallaxOffset = ref(0)

const onScroll = () => {
  parallaxOffset.value = window.scrollY * 0.45
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  // Intersection observer for scroll reveals
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.15 },
  )

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="home-page flex w-full flex-col items-center">

    <!-- ═══════════════ HERO SECTION ═══════════════ -->
    <section ref="heroRef" class="hero-section relative w-full overflow-hidden" style="height: 100svh; min-height: 640px;">

      <!-- Parallax Image -->
      <div
        class="absolute inset-0 w-full h-full"
        :style="{ transform: `translateY(${parallaxOffset}px) scale(1.15)`, transformOrigin: 'center top' }"
      >
        <img
          src="/hero.png"
          alt="Xeram Premium Perfume"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Overlay gradients -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

      <!-- Gold particle shimmer overlay -->
      <div class="shimmer-overlay absolute inset-0 pointer-events-none" />

      <!-- Hero Content -->
      <div class="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

        <!-- Eyebrow label -->
        <p class="hero-eyebrow mb-6 text-[10px] tracking-[0.5em] text-gold font-light uppercase opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
          Xeram Original Collection
        </p>

        <!-- Main headline -->
        <h1 class="hero-headline font-display opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.45s_forwards]">
          <span class="block text-ivory">Signature</span>
          <span class="block italic text-gold-shimmer">Scents</span>
        </h1>

        <!-- Gold divider -->
        <div class="gold-divider my-8 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.75s_forwards]" />

        <!-- Subheadline -->
        <p class="hero-sub mb-10 text-xs tracking-[0.25em] uppercase text-ivory/70 font-light opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.9s_forwards]">
          Crafted for the connoisseur
        </p>

        <!-- CTA Button -->
        <div class="opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.05s_forwards]">
          <RouterLink to="/shop/all-products" class="luxury-btn">
            Explore Collection
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.4s_forwards]">
        <span class="text-[9px] tracking-[0.4em] uppercase text-ivory/50 font-light">Scroll</span>
        <div class="scroll-line" />
      </div>
    </section>

    <!-- ═══════════════ CATEGORY NAVIGATION ═══════════════ -->
    <section class="reveal-on-scroll w-full py-14 border-b border-gold/10 bg-ivory dark:bg-obsidian">
      <div class="flex flex-wrap items-center justify-center gap-10">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="cat-link text-[10px] tracking-[0.3em] uppercase font-light text-ash hover:text-obsidian dark:hover:text-ivory transition-colors duration-300"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </section>

    <!-- ═══════════════ COLLECTION GRID ═══════════════ -->
    <section class="reveal-on-scroll w-full grid grid-cols-1 md:grid-cols-3">
      <div
        v-for="(product, i) in products"
        :key="product.label"
        class="product-card group relative overflow-hidden cursor-pointer"
        :style="{ animationDelay: `${i * 0.15}s` }"
      >
        <!-- Image -->
        <div class="aspect-[3/4] w-full overflow-hidden bg-cream dark:bg-charcoal">
          <img
            decoding="async"
            loading="lazy"
            :src="product.image"
            :alt="product.label"
            class="h-full w-full object-contain p-10 mix-blend-multiply dark:mix-blend-lighten transition-transform duration-[1.5s] group-hover:scale-110"
          />
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-all duration-700" />

        <!-- Gold shimmer border on hover -->
        <div class="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none" />

        <!-- Label -->
        <div class="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div class="bg-ivory/90 dark:bg-obsidian/90 backdrop-blur-sm p-6 text-center border-t border-gold/20">
            <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-1">{{ product.subtitle }}</p>
            <p class="font-display text-lg font-light text-obsidian dark:text-ivory tracking-wide">{{ product.label }}</p>
            <div class="mt-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span class="text-[9px] tracking-[0.3em] uppercase text-gold font-light">View Collection</span>
              <span class="text-gold text-xs">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section components -->
    <WhyChooseUs />
    <CollectionSection />
    <DeliveryText />
    <FAQ />
  </div>
</template>

<style scoped>
.home-page {
  background-color: var(--color-ivory, #f5f0eb);
}
.dark .home-page {
  background-color: var(--color-obsidian, #0a0a0a);
}

/* Shimmer particle overlay */
.shimmer-overlay {
  background-image:
    radial-gradient(circle at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(232,213,163,0.03) 0%, transparent 60%);
}

/* Hero headline */
.hero-headline {
  font-size: clamp(3.5rem, 12vw, 9rem);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 0;
}

.text-ivory { color: #f5f0eb; }
.text-gold { color: #c9a84c; }
.text-ash { color: #888888; }

.text-gold-shimmer {
  background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 40%, #a07830 80%, #c9a84c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Scroll line */
.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(180deg, rgba(201,168,76,0.8), transparent);
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.7); opacity: 0.5; }
}

/* Category links */
.cat-link {
  position: relative;
  padding-bottom: 4px;
}
.cat-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cat-link:hover::after { transform: scaleX(1); }

/* Product card border on grid */
.product-card {
  border-right: 1px solid rgba(201,168,76,0.1);
  border-bottom: 1px solid rgba(201,168,76,0.1);
}
.product-card:last-child { border-right: none; }

/* Color tokens */
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.border-gold { border-color: #c9a84c; }
.dark .bg-obsidian { background-color: #0a0a0a; }
</style>
