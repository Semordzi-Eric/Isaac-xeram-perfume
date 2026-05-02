<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import type { Product } from '@/types/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const categories = ref<string[]>(['All Products', 'Xeram Impressions', 'Xeram Originals'])
const selectedCategory = ref<string>('All Products')

const filteredProducts = computed<Product[]>(() => {
  if (selectedCategory.value === 'All Products') return products.value
  return products.value.filter((product) => product.category === selectedCategory.value)
})

const viewProductDetails = (product: Product, variantId: number) => {
  router.push({
    name: 'productDetails',
    params: { id: product.id, variantId: variantId },
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('revealed')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="shop-page min-h-screen bg-ivory dark:bg-obsidian pt-16 pb-32">

    <!-- Hero Header -->
    <div class="reveal-on-scroll text-center py-20 px-6 border-b border-gold/10">
      <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Xeram Collection</p>
      <h1 class="font-display text-5xl md:text-7xl font-light text-obsidian dark:text-ivory mb-6 tracking-wide">
        The Atelier
      </h1>
      <div class="gold-divider mx-auto mb-6" />
      <p class="text-sm font-light text-ash max-w-md mx-auto leading-loose">
        Every fragrance is a world unto itself. Explore and find yours.
      </p>
    </div>

    <!-- Category Filters -->
    <div class="reveal-on-scroll flex flex-wrap items-center justify-center gap-10 py-12 border-b border-gold/10 px-6">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        class="category-filter text-[10px] tracking-[0.3em] uppercase font-light transition-colors duration-300"
        :class="selectedCategory === category ? 'active' : ''"
      >
        {{ category }}
      </button>
    </div>

    <!-- Product Grid -->
    <div
      class="reveal-on-scroll mt-16 px-6 md:px-12 grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-4"
      v-auto-animate="{ duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.variant[0].id"
        class="shop-card group relative flex flex-col cursor-pointer border-r border-b border-gold/10 last:border-r-0"
        @click="viewProductDetails(product, product.variant[0].id)"
      >
        <!-- Image -->
        <div class="relative aspect-[3/4] w-full overflow-hidden bg-cream dark:bg-charcoal">
          <img
            :src="product.variant[0].image"
            :alt="product.name"
            class="h-full w-full object-contain p-6 transition-transform duration-[1.5s] group-hover:scale-110"
          />
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/10 transition-all duration-500" />
          <!-- Gold border reveal -->
          <div class="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-700 pointer-events-none" />
          <!-- CTA overlay -->
          <div class="absolute inset-x-0 bottom-0 py-5 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-obsidian/80 to-transparent">
            <div class="flex items-center justify-center gap-2">
              <span class="text-[9px] tracking-[0.3em] uppercase text-gold font-light">View Details</span>
              <span class="text-gold text-xs">→</span>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="px-5 py-6 text-center">
          <p class="text-[9px] tracking-[0.3em] uppercase text-gold/70 font-light mb-2">{{ product.category }}</p>
          <h3 class="font-display text-lg font-light text-obsidian dark:text-ivory mb-3 group-hover:text-gold transition-colors duration-300">
            {{ product.name }}
          </h3>
          <div class="gold-divider mx-auto mb-3" />
          <p class="text-sm font-light text-ash">{{ formatCurrency(product.variant[0].price) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.shop-page { }

.category-filter {
  position: relative;
  padding-bottom: 4px;
  color: #888888;
  background: none;
  border: none;
  cursor: pointer;
}
.category-filter::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.category-filter:hover,
.category-filter.active { color: #0a0a0a; }
.dark .category-filter:hover,
.dark .category-filter.active { color: #f5f0eb; }
.category-filter.active::after,
.category-filter:hover::after { transform: scaleX(1); }

.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.border-gold { border-color: rgba(201,168,76,0.1); }

.gold-divider {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
</style>
