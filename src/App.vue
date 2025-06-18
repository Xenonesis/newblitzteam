<template>
  <ErrorBoundary @error="handleError" @retry="handleRetry">
    <div class="min-h-screen transition-all duration-500">
      <!-- Background Animations -->
      <BackgroundAnimations :current-theme="currentTheme" />
      
      <!-- Loading States -->
      <LoadingStates
        :is-page-loading="isPageLoading"
        :show-skeleton="false"
      />

      <!-- Enhanced Navigation -->
      <Navigation
        :current-theme="currentTheme"
        @theme-change="handleThemeChange"
      />

      <!-- Main Content -->
      <main class="relative z-10">
        <HeroSection />
        <TeamMembers />
        <ProjectShowcase />
        <DemoShowcase />
        <ContactSection @submit="handleFormSubmit" />
      </main>

    <!-- Enhanced Footer -->
    <footer class="py-12 relative overflow-hidden" :class="footerBackground">
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <!-- Brand Section -->
          <div class="text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-110">
                <span class="text-white font-bold text-sm">B</span>
              </div>
              <span class="font-bold text-xl text-gradient">Team Blitz</span>
            </div>
            <p class="text-gray-400 text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="text-center">
            <h4 class="font-semibold text-white mb-4">Quick Links</h4>
            <div class="space-y-2">
              <a
                v-for="item in navItems"
                :key="item.name"
                @click="scrollToSection(item.href.substring(1))"
                class="block text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {{ item.name }}
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="text-center md:text-right">
            <h4 class="font-semibold text-white mb-4">Connect</h4>
            <p class="text-gray-400 text-sm mb-2">team@blitz.dev</p>
            <div class="flex justify-center md:justify-end space-x-4">
              <a
                v-for="social in socialLinks.slice(0, 3)"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <component :is="social.icon" class="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 pt-8">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <p class="text-gray-400 text-sm text-center md:text-left">
              © 2025 Team Blitz. Built with ❤️ for Hackathon 2025
            </p>
            <p class="text-gray-500 text-xs mt-2 md:mt-0">
              Vue.js • Tailwind CSS • TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Enhanced Scroll to Top Button -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-0 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-0 opacity-0"
    >
      <button
        v-if="showScrollToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center z-40 group hover-lift hover-glow"
        aria-label="Scroll to top"
      >
        <ChevronUp class="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
    </Transition>

    <!-- Performance Metrics Display (Development Only) -->
    <div 
      v-if="showMetrics && isDevelopment" 
      class="fixed top-20 right-4 glass rounded-lg p-3 text-xs text-muted-foreground z-50"
    >
      <div>Load Time: {{ loadTime }}ms</div>
      <div>Components: {{ componentCount }}</div>
      <div>Theme: {{ currentTheme }}</div>
    </div>
    </div>
  </ErrorBoundary>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronUp, Github, Linkedin, Twitter, Instagram } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Navigation from '@/components/ui/Navigation.vue'
import LoadingStates from '@/components/ui/LoadingStates.vue'
import BackgroundAnimations from '@/components/ui/BackgroundAnimations.vue'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'
import HeroSection from '@/components/HeroSection.vue'
import TeamMembers from '@/components/TeamMembers.vue'
import ProjectShowcase from '@/components/ProjectShowcase.vue'
import DemoShowcase from '@/components/DemoShowcase.vue'
import ContactSection from '@/components/ContactSection.vue'
import { setTheme } from './main'

// Reactive state
const isPageLoading = ref(true)
const showScrollToTop = ref(false)
const currentTheme = ref(localStorage.getItem('theme') || 'dark')
const loadTime = ref(0)
const showMetrics = ref(false)

// Computed properties
const isDevelopment = computed(() => import.meta.env.DEV)
const componentCount = computed(() => 8) // Approximate component count

// Navigation items
const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Team', href: '#team' },
  { name: 'Project', href: '#project' },
  { name: 'Demo', href: '#demo' },
  { name: 'Contact', href: '#contact' }
]

// Social links
const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' }
]

// Initialize theme
setTheme(currentTheme.value)

// Theme-based computed properties
const contactSectionBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-emerald-900 text-amber-100'
    case 'neon':
      return 'bg-gray-900 text-cyan-100'
    case 'light':
      return 'bg-gray-100 text-gray-900'
    default:
      return 'bg-gray-900 text-white'
  }
})

const footerBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-emerald-900 text-amber-100'
    case 'neon':
      return 'bg-gray-900 text-cyan-100'
    case 'light':
      return 'bg-gray-200 text-gray-900'
    default:
      return 'bg-gray-900 text-white'
  }
})

// Methods
const handleThemeChange = (theme) => {
  currentTheme.value = theme
  setTheme(theme)
  
  // Add visual feedback for theme change
  document.body.style.transition = 'all 0.5s ease'
  setTimeout(() => {
    document.body.style.transition = ''
  }, 500)
}

const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 300
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

const handleFormSubmit = (formData) => {
  console.log('Form submitted:', formData)
  // Here you would typically send the data to your backend
}

const handleError = (errorInfo) => {
  console.error('Application error:', errorInfo)
  // You could send error reports to a logging service here
}

const handleRetry = (retryInfo) => {
  console.log('Retry attempt:', retryInfo)
  // Handle retry logic if needed
}

// Lifecycle hooks
onMounted(() => {
  const startTime = performance.now()
  
  // Simulate page loading
  setTimeout(() => {
    isPageLoading.value = false
    loadTime.value = Math.round(performance.now() - startTime)
  }, 1500)

  // Event listeners
  window.addEventListener('scroll', handleScroll)
  
  // Keyboard shortcuts
  const handleKeydown = (event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'k':
          event.preventDefault()
          scrollToTop()
          break
        case 'm':
          event.preventDefault()
          showMetrics.value = !showMetrics.value
          break
      }
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  // Performance monitoring
  if (isDevelopment.value) {
    console.log('🚀 Team Blitz App loaded')
    console.log('📊 Performance metrics available (Ctrl/Cmd + M)')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Component-specific styles */
.gradient-animation {
  background: none;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  animation: none;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .gradient-animation {
    animation: none;
    background-color: hsl(var(--background));
  }
}
</style>
