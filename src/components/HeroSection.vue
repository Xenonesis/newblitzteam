<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-500" :class="backgroundClasses">
    <!-- Enhanced Background Animation -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Dynamic gradient background -->
      <div class="absolute inset-0" :class="gradientBackground"></div>
      
      <!-- Animated background elements -->
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0.8, rotate: 0 }"
        :enter="{ opacity: backgroundOpacity, scale: 1, rotate: 45, transition: { duration: 3000 } }"
        class="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-screen neon:mix-blend-screen cyberpunk:mix-blend-screen emerald:mix-blend-screen filter blur-xl animate-pulse"
        :class="primaryBlobClass"
      ></div>
      
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0.8, rotate: 0 }"
        :enter="{ opacity: backgroundOpacity, scale: 1, rotate: -45, transition: { duration: 3000, delay: 500 } }"
        class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-screen neon:mix-blend-screen cyberpunk:mix-blend-screen emerald:mix-blend-screen filter blur-xl animate-pulse"
        :class="secondaryBlobClass"
      ></div>
      
      <!-- Additional themed elements -->
      <div 
        v-for="(element, index) in floatingElements" 
        :key="index"
        v-motion
        :initial="{ opacity: 0, scale: 0.5, rotate: 0 }"
        :enter="{ opacity: element.opacity, scale: 1, rotate: element.rotate, transition: { duration: 2000, delay: 800 + index * 200 } }"
        class="absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-lg float-animation"
        :class="element.class"
        :style="{
          top: element.top,
          left: element.left,
          width: element.size,
          height: element.size,
          animationDelay: `${element.delay}s`,
          animationDuration: `${element.duration}s`
        }"
      ></div>
      
      <!-- Theme-specific decorative elements -->
      <div v-if="currentTheme === 'cyberpunk'" class="absolute inset-0">
        <!-- Cyberpunk grid lines -->
        <div class="absolute inset-0 opacity-20">
          <div class="h-full w-full" style="background-image: linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
        <!-- Scanning line effect -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line opacity-60"></div>
        </div>
      </div>
      
      <div v-if="currentTheme === 'emerald'" class="absolute inset-0">
        <!-- Emerald nature particles -->
        <div 
          v-for="i in 8" 
          :key="`nature-${i}`"
          class="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-40 animate-float"
          :style="{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
            boxShadow: '0 0 10px currentColor'
          }"
        ></div>
      </div>
      
      <!-- Particle system -->
      <div v-for="i in particleCount"
        :key="`particle-${i}`"
        class="absolute rounded-full opacity-30 dark:opacity-50 filter blur-sm float-animation"
        :class="particleClass"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 6}px`,
          height: `${2 + Math.random() * 6}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${8 + Math.random() * 12}s`
        }"
      ></div>
    </div>

    <div class="container mx-auto px-4 text-center relative z-10">
      <!-- Enhanced Main Heading with typewriter effect -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <h1 class="text-5xl md:text-7xl font-bold mb-6" :class="headingTextClass">
          Team <span class="text-transparent bg-clip-text bg-gradient-to-r pulse-glow" :class="gradientTextClass">Blitz</span>
        </h1>
      </div>

      <!-- Enhanced Subtitle with better theming -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" :class="subtitleClass">
          Building the future, one line of code at a time. We're a passionate team of developers competing in
          <span class="font-semibold" :class="accentTextClass">Hackathon 2025</span>
        </p>
      </div>

      <!-- Enhanced Stats with animations -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        class="flex flex-wrap justify-center gap-8 mb-12"
      >
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="text-center group hover-scale cursor-pointer"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 600 + index * 100 } }"
        >
          <div class="text-3xl font-bold transition-all duration-300 group-hover:scale-110" :class="stat.color">
            {{ stat.value }}
          </div>
          <div class="text-sm md:text-base" :class="statLabelClass">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Enhanced CTA Buttons -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
        class="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button 
          size="lg" 
          class="pulse-glow hover-lift btn-glow" 
          @click="scrollToSection('team')"
          :class="primaryButtonClass"
        >
          <Users class="mr-2 h-5 w-5" />
          Meet Our Team
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          @click="scrollToSection('project')"
          class="hover-lift btn-glow"
          :class="secondaryButtonClass"
        >
          <Code class="mr-2 h-5 w-5" />
          View Our Project
        </Button>
      </div>
    </div>

    <!-- Enhanced Scroll Indicator -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { duration: 1000, delay: 1000 } }"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <div class="animate-bounce p-2 rounded-full" :class="scrollIndicatorClass">
        <ChevronDown class="h-6 w-6" :class="scrollIconClass" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Users, Code, ChevronDown } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

// Get current theme from document classes
const currentTheme = ref('dark')
const updateTheme = () => {
  if (document.documentElement.classList.contains('cyberpunk')) currentTheme.value = 'cyberpunk'
  else if (document.documentElement.classList.contains('emerald')) currentTheme.value = 'emerald'
  else if (document.documentElement.classList.contains('neon')) currentTheme.value = 'neon'
  else if (document.documentElement.classList.contains('light')) currentTheme.value = 'light'
  else currentTheme.value = 'dark'
}

// Watch for theme changes
const observer = new MutationObserver(updateTheme)
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
updateTheme()

// Theme-based computed properties
const backgroundClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-900 to-green-800 text-amber-100'
    case 'neon':
      return 'bg-gradient-to-br from-gray-900 via-purple-900 to-black text-cyan-100 relative overflow-hidden'
    case 'light':
      return 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    default:
      return 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
  }
})

const gradientBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gradient-to-br from-black via-gray-900 to-cyan-900 opacity-90'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 opacity-90'
    case 'neon':
      return 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 opacity-95'
    case 'light':
      return 'bg-gradient-to-br from-blue-50 to-indigo-100 opacity-90'
    default:
      return 'bg-gradient-to-br from-gray-900 to-gray-800 opacity-90'
  }
})

const backgroundOpacity = computed(() => currentTheme.value === 'light' ? 0.3 : 0.15)

const primaryBlobClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-500'
    case 'emerald':
      return 'bg-emerald-500'
    case 'neon':
      return 'bg-cyan-500'
    case 'light':
      return 'bg-blue-400'
    default:
      return 'bg-blue-600'
  }
})

const secondaryBlobClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-purple-500'
    case 'emerald':
      return 'bg-amber-500'
    case 'neon':
      return 'bg-pink-500'
    case 'light':
      return 'bg-purple-400'
    default:
      return 'bg-purple-600'
  }
})

const headingTextClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-100'
    case 'emerald':
      return 'text-amber-100'
    case 'neon':
      return 'text-cyan-100'
    case 'light':
      return 'text-gray-900'
    default:
      return 'text-white'
  }
})

const gradientTextClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'from-cyan-400 via-green-400 to-purple-400'
    case 'emerald':
      return 'from-emerald-400 via-green-400 to-amber-400'
    case 'neon':
      return 'from-cyan-400 via-purple-400 to-pink-400'
    case 'light':
      return 'from-blue-600 via-purple-500 to-indigo-600'
    default:
      return 'from-blue-400 via-purple-400 to-indigo-400'
  }
})

const subtitleClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-200'
    case 'emerald':
      return 'text-amber-200'
    case 'neon':
      return 'text-cyan-200'
    case 'light':
      return 'text-gray-600'
    default:
      return 'text-gray-300'
  }
})

const accentTextClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-green-400'
    case 'emerald':
      return 'text-amber-400'
    case 'neon':
      return 'text-pink-400'
    case 'light':
      return 'text-blue-600'
    default:
      return 'text-blue-400'
  }
})

const statLabelClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-400'
    case 'emerald':
      return 'text-emerald-400'
    case 'neon':
      return 'text-purple-400'
    case 'light':
      return 'text-gray-600'
    default:
      return 'text-gray-400'
  }
})

const primaryButtonClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400'
    case 'emerald':
      return 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400'
    case 'neon':
      return 'bg-purple-600 hover:bg-purple-500 border-purple-400'
    default:
      return ''
  }
})

const secondaryButtonClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
    case 'emerald':
      return 'border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-emerald-900'
    case 'neon':
      return 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-purple-900'
    case 'light':
      return 'border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white'
    default:
      return 'border-white text-white hover:bg-white hover:text-gray-900'
  }
})

const scrollIndicatorClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-500/20 border border-cyan-400/30'
    case 'emerald':
      return 'bg-emerald-500/20 border border-emerald-400/30'
    case 'neon':
      return 'bg-purple-500/20 border border-purple-400/30'
    case 'light':
      return 'bg-gray-200/50 border border-gray-300/50'
    default:
      return 'bg-gray-800/50 border border-gray-600/30'
  }
})

const scrollIconClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-400'
    case 'emerald':
      return 'text-emerald-400'
    case 'neon':
      return 'text-purple-400'
    case 'light':
      return 'text-gray-600'
    default:
      return 'text-gray-400'
  }
})

const particleClass = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-400'
    case 'emerald':
      return 'bg-emerald-400'
    case 'neon':
      return 'bg-purple-400'
    case 'light':
      return 'bg-blue-400'
    default:
      return 'bg-blue-400'
  }
})

const particleCount = computed(() => window.innerWidth < 768 ? 8 : 12)

// Dynamic floating elements
const floatingElements = computed(() => [
  {
    top: '25%',
    left: '20%',
    size: '160px',
    opacity: currentTheme.value === 'light' ? 0.15 : 0.1,
    rotate: 30,
    delay: 0,
    duration: 12,
    class: currentTheme.value === 'cyberpunk' ? 'bg-green-400' : 
           currentTheme.value === 'emerald' ? 'bg-green-500' :
           currentTheme.value === 'neon' ? 'bg-pink-400' :
           currentTheme.value === 'light' ? 'bg-green-300' : 'bg-green-500'
  },
  {
    top: '60%',
    left: '75%',
    size: '120px',
    opacity: currentTheme.value === 'light' ? 0.15 : 0.1,
    rotate: -30,
    delay: 1,
    duration: 10,
    class: currentTheme.value === 'cyberpunk' ? 'bg-purple-400' :
           currentTheme.value === 'emerald' ? 'bg-amber-400' :
           currentTheme.value === 'neon' ? 'bg-blue-400' :
           currentTheme.value === 'light' ? 'bg-yellow-300' : 'bg-yellow-500'
  },
  {
    top: '40%',
    left: '5%',
    size: '100px',
    opacity: currentTheme.value === 'light' ? 0.1 : 0.08,
    rotate: 60,
    delay: 2,
    duration: 15,
    class: currentTheme.value === 'cyberpunk' ? 'bg-pink-400' :
           currentTheme.value === 'emerald' ? 'bg-lime-400' :
           currentTheme.value === 'neon' ? 'bg-green-400' :
           currentTheme.value === 'light' ? 'bg-purple-300' : 'bg-purple-500'
  }
])

// Stats data
const stats = computed(() => [
  {
    value: '5',
    label: 'Team Members',
    color: currentTheme.value === 'cyberpunk' ? 'text-cyan-400' :
           currentTheme.value === 'emerald' ? 'text-emerald-400' :
           currentTheme.value === 'neon' ? 'text-purple-400' :
           currentTheme.value === 'light' ? 'text-blue-600' : 'text-blue-400'
  },
  {
    value: '48',
    label: 'Hours to Code',
    color: currentTheme.value === 'cyberpunk' ? 'text-green-400' :
           currentTheme.value === 'emerald' ? 'text-amber-400' :
           currentTheme.value === 'neon' ? 'text-pink-400' :
           currentTheme.value === 'light' ? 'text-purple-600' : 'text-purple-400'
  },
  {
    value: '∞',
    label: 'Possibilities',
    color: currentTheme.value === 'cyberpunk' ? 'text-purple-400' :
           currentTheme.value === 'emerald' ? 'text-green-400' :
           currentTheme.value === 'neon' ? 'text-cyan-400' :
           currentTheme.value === 'light' ? 'text-green-600' : 'text-green-400'
  }
])

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
@keyframes scan-line {
  0% {
    top: -2px;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.animate-scan-line {
  animation: scan-line 3s linear infinite;
}
</style>
