<template>
  <div class="cart-page min-h-screen bg-ivory dark:bg-obsidian pt-10 pb-32">
    <div class="max-w-7xl mx-auto px-6 md:px-12" v-auto-animate>

      <!-- Header -->
      <div class="text-center mb-16 pt-8">
        <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Your Selection</p>
        <h1 class="font-display text-4xl md:text-6xl font-light text-obsidian dark:text-ivory tracking-wide">
          Shopping Cart
        </h1>
        <div class="gold-divider mx-auto mt-6" />
      </div>

      <!-- Empty cart -->
      <div
        v-if="cartItemsCount === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
        :key="1"
      >
        <div class="empty-cart-icon mb-10">
          <UIcon name="i-lucide-shopping-bag" class="size-16 text-gold/30" />
        </div>
        <h2 class="font-display text-3xl font-light text-obsidian dark:text-ivory mb-4">Your cart is empty</h2>
        <div class="gold-divider mx-auto mb-6" />
        <p class="text-sm font-light text-ash mb-10 max-w-sm">
          Discover our curated collection of luxury fragrances.
        </p>
        <RouterLink to="/shop" class="luxury-btn">
          Explore Collection
        </RouterLink>
      </div>

      <!-- Cart with items -->
      <div v-else class="grid grid-cols-1 gap-12 lg:grid-cols-3" :key="2">

        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="gold-divider-full mb-0" />
          <TransitionGroup name="list" tag="ul" v-auto-animate>
            <li v-for="item in cartItems" :key="item.id" class="cart-item flex gap-6 py-8 border-b border-gold/10">

              <!-- Thumbnail -->
              <div
                class="cart-thumb flex-shrink-0 w-24 h-32 bg-cream dark:bg-charcoal overflow-hidden cursor-pointer border border-gold/10 hover:border-gold/30 transition-colors duration-300"
                @click="viewProductDetails(item.productId, item.id)"
              >
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain p-3" />
              </div>

              <!-- Details -->
              <div class="flex flex-1 flex-col justify-between">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-[9px] tracking-[0.3em] uppercase text-gold font-light mb-1">{{ item.size }}</p>
                    <h3
                      class="font-display text-xl font-light text-obsidian dark:text-ivory cursor-pointer hover:text-gold transition-colors duration-300"
                      @click="viewProductDetails(item.productId, item.id)"
                    >
                      {{ item.name }}
                    </h3>
                  </div>
                  <p class="font-display text-xl font-light text-obsidian dark:text-ivory">
                    {{ formatCurrency(item.price) }}
                  </p>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <!-- Quantity controls -->
                  <div class="qty-controls flex items-center gap-0 border border-gold/20">
                    <button
                      class="qty-btn w-9 h-9 flex items-center justify-center text-ash hover:text-obsidian dark:hover:text-ivory hover:bg-gold/10 transition-all duration-200"
                      :disabled="item.quantity <= 1"
                      @click="decrementQuantity(item.id)"
                    >
                      <span class="text-xs">−</span>
                    </button>
                    <span class="w-10 text-center text-xs tracking-widest text-obsidian dark:text-ivory font-light">{{ item.quantity }}</span>
                    <button
                      class="qty-btn w-9 h-9 flex items-center justify-center text-ash hover:text-obsidian dark:hover:text-ivory hover:bg-gold/10 transition-all duration-200"
                      @click="incrementQuantity(item.id)"
                    >
                      <span class="text-xs">+</span>
                    </button>
                  </div>

                  <!-- Remove -->
                  <ConfirmationModal
                    action-type="remove"
                    :item="{ name: item.name, size: item.size }"
                    @confirm="removeItemFromCart(item.id)"
                  />
                </div>
              </div>
            </li>
          </TransitionGroup>

          <!-- Bottom actions -->
          <div class="mt-8 flex items-center justify-between">
            <ConfirmationModal action-type="clear" @confirm="clearCart" />
            <RouterLink
              to="/shop"
              class="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-light text-ash hover:text-gold transition-colors duration-300"
            >
              <span>← Continue Shopping</span>
            </RouterLink>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="order-summary-panel p-8 bg-obsidian border border-gold/15">
            <h2 class="font-display text-2xl font-light text-ivory mb-8">Order Summary</h2>
            <div class="gold-divider mb-8" style="margin-left: 0;" />

            <div class="space-y-5 mb-8">
              <div class="flex justify-between">
                <p class="text-xs tracking-wide text-ash font-light">Subtotal ({{ cartItemsCount }} items)</p>
                <p class="text-sm text-ivory font-light">{{ formatCurrency(totalPrice) }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-xs tracking-wide text-ash font-light">Shipping</p>
                <p class="text-sm text-gold font-light">Complimentary</p>
              </div>
              <div class="flex justify-between">
                <p class="text-xs tracking-wide text-ash font-light">Tax</p>
                <p class="text-sm text-ivory font-light">{{ formatCurrency(0) }}</p>
              </div>
            </div>

            <div class="border-t border-gold/15 pt-6 mb-8 flex justify-between items-center">
              <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light">Total</p>
              <p class="font-display text-3xl font-light text-ivory">{{ formatCurrency(totalPrice) }}</p>
            </div>

            <button class="checkout-btn w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light mb-5">
              Proceed to Checkout
            </button>

            <div class="flex items-center justify-center gap-2 text-[9px] tracking-[0.2em] uppercase text-ash/60 font-light">
              <UIcon name="i-heroicons-lock-closed" class="size-3 text-gold/50" />
              <span>Secure & encrypted</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { formatCurrency } from '@/utils/formatCurrency'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ConfirmationModal from '@/components/shop/ConfirmationModal.vue'

const router = useRouter()
const productStore = useProductStore()
const { cartItemsCount, cartItems, totalPrice } = storeToRefs(productStore)
const { incrementQuantity, decrementQuantity, removeItemFromCart, clearCart } = productStore

const viewProductDetails = (productId: number, variantId: number) => {
  router.push(`/shop/details/${productId}/${variantId}`)
}
</script>

<style scoped>
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}

.empty-cart-icon {
  width: 80px;
  height: 80px;
  border: 1px solid rgba(201,168,76,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  border-right: 1px solid rgba(201,168,76,0.2);
}
.qty-btn:last-child { border-right: none; border-left: 1px solid rgba(201,168,76,0.2); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.order-summary-panel {
  position: sticky;
  top: 100px;
}

.checkout-btn {
  background: #c9a84c;
  color: #0a0a0a;
  border: 1px solid #c9a84c;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Inter', sans-serif;
}
.checkout-btn:hover {
  background: transparent;
  color: #c9a84c;
}

/* List transitions */
.list-enter-active,
.list-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.list-enter-from { opacity: 0; transform: translateX(-20px); }
.list-leave-to { opacity: 0; transform: translateX(20px); }
</style>
