<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { onClickOutside, useColorMode } from '@vueuse/core'
import type { MenuItems } from '@/types/types'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const mode = useColorMode()
const productStore = useProductStore()
const { cartItemsCount } = storeToRefs(productStore)

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const menuItems = ref<NavigationMenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reviews', to: '/reviews' },
])

const mobileMenuItems = ref<MenuItems[]>([
  { label: 'Home', route: { name: 'home' } },
  { label: 'Shop', route: { name: 'shop' } },
  { label: 'About', route: { name: 'about' } },
  { label: 'Contact', route: { name: 'contact' } },
  { label: 'Reviews', route: { name: 'reviews' } },
])

const mobileMenuOpen = ref<boolean>(false)
const activeLink = ref<string | null>('home')
const setActiveLink = () => {
  activeLink.value = (router.currentRoute.value.name as string) ?? 'home'
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const mobileNav = useTemplateRef<HTMLElement>('mobileNav')

onClickOutside(mobileNav, (event) => {
  if (window.innerWidth <= 768 && mobileMenuOpen.value) {
    const clickedInsideMobileNav =
      mobileNav.value &&
      mobileNav.value instanceof HTMLElement &&
      mobileNav.value.contains(event.target as Node)
    if (!clickedInsideMobileNav) {
      mobileMenuOpen.value = false
    }
  }
})

const displayCartItemCount = computed(() => {
  return cartItemsCount.value > 99 ? '99+' : cartItemsCount.value.toString()
})

watch(
  () => router.currentRoute.value.name,
  () => {
    setActiveLink()
    mobileMenuOpen.value = false
  },
  { immediate: true },
)

onMounted(() => {
  setActiveLink()
})
</script>

<template>
  <header
    class="navbar-luxury sticky top-0 z-50 w-full transition-all duration-500"
    :class="scrolled ? 'scrolled' : ''"
  >
    <nav class="flex w-full items-center justify-between px-6 py-4 md:py-5 relative">

      <!-- Mobile Nav -->
      <MobileNav
        ref="mobileNav"
        :mobile-menu-open="mobileMenuOpen"
        :menu-items="mobileMenuItems"
        :active-link="activeLink as string"
        :set-active-link="setActiveLink"
        @toggleMobileMenu="toggleMobileMenu"
      />

      <!-- Desktop: Left nav links -->
      <section class="hidden flex-1 md:flex">
        <nav class="flex items-center gap-8">
          <RouterLink
            v-for="item in menuItems.slice(0, 3)"
            :key="item.label as string"
            :to="(item.to as string)"
            class="nav-link-luxury text-[10px] tracking-[0.25em] uppercase font-light"
            :class="activeLink === (item.label as string).toLowerCase() ? 'active' : ''"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </section>

      <!-- Center: Logo -->
      <section class="flex items-center justify-center flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
        <LogoComponent />
      </section>

      <!-- Right: Cart + dark mode -->
      <section class="flex flex-1 items-center justify-end gap-3 md:gap-5">
        <!-- Desktop right links -->
        <nav class="hidden items-center gap-8 md:flex">
          <RouterLink
            v-for="item in menuItems.slice(3)"
            :key="item.label as string"
            :to="(item.to as string)"
            class="nav-link-luxury text-[10px] tracking-[0.25em] uppercase font-light"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Cart Icon -->
        <UButton
          variant="link"
          to="/cart"
          color="neutral"
          class="relative cursor-pointer p-2 hover:bg-transparent"
        >
          <UIcon name="i-lucide-shopping-bag" class="size-5 nav-icon-luxury transition-colors" />
          <span
            v-if="cartItemsCount > 0"
            class="cart-badge absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full text-[9px] font-medium"
          >
            {{ displayCartItemCount }}
          </span>
        </UButton>

        <!-- Dark Mode Toggle -->
        <UButton
          color="neutral"
          variant="ghost"
          @click="mode = mode === 'dark' ? 'light' : 'dark'"
          class="rounded-none hover:bg-transparent p-2"
        >
          <SunIcon v-if="mode === 'light'" class="size-4 nav-icon-luxury" />
          <MoonIcon v-else class="size-4 nav-icon-luxury" />
        </UButton>
      </section>
    </nav>

    <!-- Gold bottom border -->
    <div class="gold-divider-full transition-opacity duration-500" :style="{ opacity: scrolled ? 1 : 0 }" />
  </header>
</template>

<style scoped>
.navbar-luxury {
  background: rgba(245, 240, 235, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(201, 168, 76, 0);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.dark .navbar-luxury {
  background: rgba(10, 10, 10, 0.85);
}

.navbar-luxury.scrolled {
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

/* Nav links */
.nav-link-luxury {
  color: #888888;
  position: relative;
  transition: color 0.3s ease;
  text-decoration: none;
}

.nav-link-luxury::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-gold, #c9a84c);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link-luxury:hover,
.nav-link-luxury.active {
  color: #0a0a0a;
}

.dark .nav-link-luxury:hover,
.dark .nav-link-luxury.active {
  color: #f5f0eb;
}

.nav-link-luxury:hover::after,
.nav-link-luxury.active::after {
  transform: scaleX(1);
}

/* Nav icons */
.nav-icon-luxury {
  color: #888888;
  transition: color 0.3s ease;
}
:deep(.nav-icon-luxury:hover) { color: #c9a84c; }

/* Cart badge */
.cart-badge {
  background: #c9a84c;
  color: #0a0a0a;
  font-family: 'Inter', sans-serif;
}
</style>
