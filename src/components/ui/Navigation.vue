<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
    :class="[
      isScrolled 
        ? 'backdrop-blur-xl shadow-lg'
        : ''
    ]"
    :style="{
      backgroundColor: isScrolled ? 'hsl(var(--background) / 0.9)' : 'hsl(var(--background) / 0.7)',
      borderBottom: isScrolled ? '1px solid hsl(var(--border) / 0.3)' : 'none',
      boxShadow: isScrolled ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
    }"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo with enhanced animation -->
        <div class="flex items-center space-x-3">
          <button
            @click="scrollToTop"
            class="group flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1 transition-all duration-300"
            aria-label="Go to top"
          >
            <div class="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              <span class="text-white font-bold text-lg">B</span>
              <!-- Glow effect -->
              <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            </div>
            <div class="hidden sm:block">
              <h1 class="font-bold text-xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 neon:from-cyan-400 neon:via-purple-400 neon:to-pink-400 bg-clip-text text-transparent">
                Team Blitz
              </h1>
              <p class="text-xs text-muted-foreground -mt-1">Hackathon 2025</p>
            </div>
          </button>
        </div>

        <!-- Breadcrumbs (Desktop) -->
        <div class="hidden lg:flex items-center space-x-2 text-sm">
          <span class="text-muted-foreground">You are here:</span>
          <nav aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li v-for="(crumb, index) in breadcrumbs" :key="crumb.name" class="flex items-center">
                <button
                  v-if="index < breadcrumbs.length - 1"
                  @click="scrollToSection(crumb.id)"
                  class="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  :aria-label="`Go to ${crumb.name}`"
                >
                  {{ crumb.name }}
                </button>
                <span v-else class="text-foreground font-medium">{{ crumb.name }}</span>
                <ChevronRight v-if="index < breadcrumbs.length - 1" class="h-3 w-3 mx-2 text-muted-foreground" />
              </li>
            </ol>
          </nav>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="handleNavClick(item)"
            :class="[
              'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isActiveSection(item.id)
                ? 'text-primary bg-primary/10 dark:bg-primary/20 neon:bg-cyan-500/20 neon:text-cyan-300 neon:shadow-[0_0_10px_rgba(0,255,255,0.3)]'
                : 'text-foreground hover:text-primary hover:bg-primary/5 neon:hover:text-cyan-300 neon:hover:shadow-[0_0_8px_rgba(0,255,255,0.2)]'
            ]"
            :aria-current="isActiveSection(item.id) ? 'page' : false"
          >
            <component :is="item.icon" class="inline h-4 w-4 mr-2" />
            {{ item.name }}
            
            <!-- Active indicator -->
            <div 
              v-if="isActiveSection(item.id)"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
            ></div>
            
            <!-- Hover effect -->
            <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <!-- Theme Dropdown -->
          <ThemeDropdown 
            :current-theme="currentTheme" 
            @theme-change="handleThemeChange"
            class="ml-4"
          />

          <!-- CTA Button -->
          <Button 
            size="sm" 
            @click="scrollToSection('contact')"
            class="ml-4 relative overflow-hidden group"
          >
            <span class="relative z-10 flex items-center">
              <MessageCircle class="mr-2 h-4 w-4" />
              Contact Us
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          class="md:hidden relative p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div class="relative w-6 h-6">
            <!-- Animated hamburger icon -->
            <span 
              :class="[
                'absolute block h-0.5 w-6 bg-current transform transition-all duration-300',
                isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
              ]"
            ></span>
            <span 
              :class="[
                'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3',
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              ]"
            ></span>
            <span 
              :class="[
                'absolute block h-0.5 w-6 bg-current transform transition-all duration-300',
                isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
              ]"
            ></span>
          </div>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-full opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-full opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          id="mobile-menu"
          class="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 neon:border-cyan-500/50 bg-white/95 dark:bg-gray-900/95 neon:bg-gray-900/90 backdrop-blur-xl neon:shadow-[0_0_20px_rgba(0,255,255,0.1)]"
          role="menu"
          aria-orientation="vertical"
        >
          <div class="px-4 py-6 space-y-4">
            <!-- Mobile Theme Selector -->
            <div class="pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <ThemeDropdown 
                :current-theme="currentTheme" 
                @theme-change="handleThemeChange"
              />
            </div>

            <!-- Mobile Nav Items -->
            <div class="space-y-2">
              <button
                v-for="item in navItems"
                :key="item.name"
                @click="handleMobileNavClick(item)"
                :class="[
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group',
                  isActiveSection(item.id) 
                    ? 'text-primary bg-primary/10 border border-primary/20' 
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                ]"
                role="menuitem"
              >
                <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
                <span class="font-medium">{{ item.name }}</span>
                <ChevronRight class="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <!-- Mobile CTA -->
            <div class="pt-4">
              <Button 
                @click="handleMobileNavClick({ id: 'contact' })"
                size="lg" 
                class="w-full justify-center"
              >
                <MessageCircle class="mr-2 h-5 w-5" />
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Progress Indicator -->
    <div 
      class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 transition-all duration-300 ease-out"
      :style="{ width: `${scrollProgress}%` }"
      role="progressbar"
      :aria-valuenow="scrollProgress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Page scroll progress"
    ></div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronRight, MessageCircle, Home, Users, FolderOpen, Mail, Play } from 'lucide-vue-next'
import Button from './Button.vue'
import ThemeDropdown from './ThemeDropdown.vue'

const props = defineProps({
  currentTheme: {
    type: String,
    default: 'dark'
  }
})

const emit = defineEmits(['theme-change'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const scrollProgress = ref(0)
const activeSection = ref('hero')

const navItems = [
  { name: 'Home', href: '#hero', id: 'hero', icon: Home },
  { name: 'Team', href: '#team', id: 'team', icon: Users },
  { name: 'Project', href: '#project', id: 'project', icon: FolderOpen },
  { name: 'Demo', href: '#demo', id: 'demo', icon: Play },
  { name: 'Contact', href: '#contact', id: 'contact', icon: Mail }
]

const breadcrumbs = computed(() => {
  const currentItem = navItems.find(item => item.id === activeSection.value)
  if (!currentItem) return [{ name: 'Home', id: 'hero' }]
  
  const crumbs = [{ name: 'Home', id: 'hero' }]
  if (currentItem.id !== 'hero') {
    crumbs.push({ name: currentItem.name, id: currentItem.id })
  }
  return crumbs
})

const isActiveSection = (sectionId) => {
  return activeSection.value === sectionId
}

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  
  isScrolled.value = scrollTop > 50
  scrollProgress.value = Math.min((scrollTop / docHeight) * 100, 100)

  // Update active section based on scroll position
  const sections = navItems.map(item => item.id)
  let currentSection = 'hero'

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section
        break
      }
    }
  }

  activeSection.value = currentSection
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else if (sectionId === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavClick = (item) => {
  scrollToSection(item.id)
}

const handleMobileNavClick = (item) => {
  scrollToSection(item.id)
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleThemeChange = (theme) => {
  emit('theme-change', theme)
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('#mobile-menu') && !event.target.closest('[aria-expanded]')) {
    isMobileMenuOpen.value = false
  }
}

// Close mobile menu on escape key
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
  handleScroll() // Initialize values
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>