<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <!-- Animated Gradient Background -->
    <div 
      class="absolute inset-0 opacity-40"
      :class="backgroundGradientClass"
    ></div>
    
    <!-- Floating Particles -->
    <div class="absolute inset-0">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute rounded-full opacity-60 animate-float"
        :class="particle.color"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`
        }"
      ></div>
    </div>
    
    <!-- Grid Pattern Overlay -->
    <div 
      class="absolute inset-0 opacity-20"
      :class="gridPatternClass"
    ></div>
    
    <!-- Animated Shapes for Cyberpunk Theme -->
    <div v-if="currentTheme === 'cyberpunk'" class="absolute inset-0">
      <!-- Animated Lines -->
      <div
        v-for="line in cyberpunkLines"
        :key="line.id"
        class="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
        :style="{
          left: `${line.x}%`,
          top: `${line.y}%`,
          width: `${line.width}px`,
          height: '1px',
          transform: `rotate(${line.rotation}deg)`,
          animation: `slide-${line.direction} ${line.duration}s linear infinite`
        }"
      ></div>
      
      <!-- Glitch Rectangles -->
      <div
        v-for="rect in glitchRects"
        :key="rect.id"
        class="absolute border border-cyan-400 opacity-30 animate-pulse"
        :style="{
          left: `${rect.x}%`,
          top: `${rect.y}%`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          animationDuration: `${rect.duration}s`
        }"
      ></div>
    </div>
    
    <!-- Emerald Theme Nature Elements -->
    <div v-if="currentTheme === 'emerald'" class="absolute inset-0">
      <!-- Leaves -->
      <div
        v-for="leaf in leaves"
        :key="leaf.id"
        class="absolute opacity-40"
        :style="{
          left: `${leaf.x}%`,
          top: `${leaf.y}%`,
          transform: `rotate(${leaf.rotation}deg)`,
          animation: `leaf-fall ${leaf.duration}s linear infinite`
        }"
      >
        <div class="w-3 h-6 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full transform rotate-45"></div>
      </div>
      
      <!-- Golden Sparkles -->
      <div
        v-for="sparkle in sparkles"
        :key="sparkle.id"
        class="absolute w-1 h-1 bg-amber-400 rounded-full opacity-70 animate-pulse"
        :style="{
          left: `${sparkle.x}%`,
          top: `${sparkle.y}%`,
          animationDuration: `${sparkle.duration}s`,
          animationDelay: `${sparkle.delay}s`
        }"
      ></div>
    </div>
    
    <!-- Neon Theme Effects -->
    <div v-if="currentTheme === 'neon'" class="absolute inset-0">
      <!-- Neon Orbs -->
      <div
        v-for="orb in neonOrbs"
        :key="orb.id"
        class="absolute rounded-full opacity-60 animate-float"
        :class="orb.color"
        :style="{
          left: `${orb.x}%`,
          top: `${orb.y}%`,
          width: `${orb.size}px`,
          height: `${orb.size}px`,
          boxShadow: `0 0 ${orb.glow}px currentColor`,
          animationDuration: `${orb.duration}s`,
          animationDelay: `${orb.delay}s`
        }"
      ></div>
      
      <!-- Lightning Effects -->
      <svg
        v-for="lightning in lightningBolts"
        :key="lightning.id"
        class="absolute opacity-40 animate-pulse"
        :style="{
          left: `${lightning.x}%`,
          top: `${lightning.y}%`,
          width: `${lightning.width}px`,
          height: `${lightning.height}px`,
          animationDuration: `${lightning.duration}s`
        }"
        viewBox="0 0 100 100"
      >
        <path
          :d="lightning.path"
          stroke="url(#neonGradient)"
          stroke-width="2"
          fill="none"
        />
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ec4899;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
    <!-- Mouse Trail Effect -->
    <div 
      v-if="showMouseTrail && mouseTrail.length > 0"
      class="absolute inset-0"
    >
      <div
        v-for="(trail, index) in mouseTrail"
        :key="trail.id"
        class="absolute rounded-full pointer-events-none"
        :class="mouseTrailColor"
        :style="{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: `${Math.max(2, 8 - index)}px`,
          height: `${Math.max(2, 8 - index)}px`,
          opacity: Math.max(0.1, 1 - index * 0.15),
          transform: 'translate(-50%, -50%)'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  currentTheme: {
    type: String,
    default: 'dark'
  }
})

// Reactive data
const particles = ref([])
const cyberpunkLines = ref([])
const glitchRects = ref([])
const leaves = ref([])
const sparkles = ref([])
const neonOrbs = ref([])
const lightningBolts = ref([])
const mouseTrail = ref([])
const showMouseTrail = ref(true)

// Computed properties
const backgroundGradientClass = computed(() => {
  switch (props.currentTheme) {
    case 'cyberpunk':
      return 'bg-gradient-to-br from-black via-gray-900 to-cyan-900 animate-pulse'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 gradient-animation'
    case 'neon':
      return 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 gradient-animation'
    case 'dark':
      return 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 gradient-animation'
    case 'light':
      return 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 gradient-animation'
    default:
      return 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 gradient-animation'
  }
})

const gridPatternClass = computed(() => {
  return props.currentTheme === 'light' ? 'bg-grid-slate-100' : 'bg-grid-slate-700'
})

const mouseTrailColor = computed(() => {
  switch (props.currentTheme) {
    case 'cyberpunk':
      return 'bg-cyan-400'
    case 'emerald':
      return 'bg-emerald-400'
    case 'neon':
      return 'bg-purple-400'
    default:
      return 'bg-blue-400'
  }
})

// Utility functions
const random = (min, max) => Math.random() * (max - min) + min
const getRandomColor = (theme) => {
  const colors = {
    cyberpunk: ['bg-cyan-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400'],
    emerald: ['bg-emerald-400', 'bg-green-400', 'bg-amber-400', 'bg-lime-400'],
    neon: ['bg-purple-400', 'bg-pink-400', 'bg-cyan-400', 'bg-blue-400'],
    dark: ['bg-blue-400', 'bg-purple-400', 'bg-indigo-400', 'bg-cyan-400'],
    light: ['bg-blue-300', 'bg-purple-300', 'bg-indigo-300', 'bg-cyan-300']
  }
  const themeColors = colors[theme] || colors.dark
  return themeColors[Math.floor(Math.random() * themeColors.length)]
}

// Initialize particles
const initializeParticles = () => {
  particles.value = []
  const particleCount = window.innerWidth < 768 ? 15 : 25
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      size: random(2, 8),
      color: getRandomColor(props.currentTheme),
      duration: random(8, 15),
      delay: random(0, 5)
    })
  }
}

// Initialize cyberpunk elements
const initializeCyberpunkElements = () => {
  cyberpunkLines.value = []
  glitchRects.value = []
  
  // Animated lines
  for (let i = 0; i < 8; i++) {
    cyberpunkLines.value.push({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      width: random(50, 200),
      rotation: random(0, 360),
      direction: Math.random() > 0.5 ? 'horizontal' : 'vertical',
      duration: random(5, 12)
    })
  }
  
  // Glitch rectangles
  for (let i = 0; i < 5; i++) {
    glitchRects.value.push({
      id: i,
      x: random(10, 80),
      y: random(10, 80),
      width: random(30, 100),
      height: random(20, 60),
      duration: random(2, 4)
    })
  }
}

// Initialize emerald elements
const initializeEmeraldElements = () => {
  leaves.value = []
  sparkles.value = []
  
  // Falling leaves
  for (let i = 0; i < 12; i++) {
    leaves.value.push({
      id: i,
      x: random(0, 100),
      y: random(-20, 100),
      rotation: random(0, 360),
      duration: random(10, 20)
    })
  }
  
  // Golden sparkles
  for (let i = 0; i < 20; i++) {
    sparkles.value.push({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      duration: random(1, 3),
      delay: random(0, 2)
    })
  }
}

// Initialize neon elements
const initializeNeonElements = () => {
  neonOrbs.value = []
  lightningBolts.value = []
  
  // Neon orbs
  const orbColors = ['bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-blue-500']
  for (let i = 0; i < 8; i++) {
    neonOrbs.value.push({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      size: random(15, 30),
      color: orbColors[Math.floor(Math.random() * orbColors.length)],
      glow: random(20, 40),
      duration: random(6, 12),
      delay: random(0, 3)
    })
  }
  
  // Lightning bolts
  for (let i = 0; i < 4; i++) {
    lightningBolts.value.push({
      id: i,
      x: random(10, 80),
      y: random(10, 80),
      width: random(60, 120),
      height: random(80, 150),
      path: generateLightningPath(),
      duration: random(1, 2)
    })
  }
}

// Generate lightning path
const generateLightningPath = () => {
  const points = []
  let currentX = 10
  let currentY = 10
  
  for (let i = 0; i < 5; i++) {
    points.push(`${currentX},${currentY}`)
    currentX += random(-15, 15)
    currentY += random(10, 20)
  }
  
  return `M ${points.join(' L ')}`
}

// Mouse trail effect
let mouseTrailId = 0
const handleMouseMove = (event) => {
  if (!showMouseTrail.value) return
  
  mouseTrail.value.unshift({
    id: ++mouseTrailId,
    x: event.clientX,
    y: event.clientY
  })
  
  // Limit trail length
  if (mouseTrail.value.length > 8) {
    mouseTrail.value.pop()
  }
  
  // Clear trail after a delay
  setTimeout(() => {
    mouseTrail.value = mouseTrail.value.filter(trail => trail.id !== mouseTrailId)
  }, 1000)
}

// Performance optimization
const shouldReduceMotion = ref(false)
const checkReducedMotion = () => {
  shouldReduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Initialize based on theme
const initializeThemeElements = () => {
  initializeParticles()
  
  switch (props.currentTheme) {
    case 'cyberpunk':
      initializeCyberpunkElements()
      break
    case 'emerald':
      initializeEmeraldElements()
      break
    case 'neon':
      initializeNeonElements()
      break
  }
}

// Lifecycle hooks
onMounted(() => {
  checkReducedMotion()
  initializeThemeElements()
  
  if (!shouldReduceMotion.value) {
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
  }
  
  // Listen for reduced motion changes
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', checkReducedMotion)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})

// Watch for theme changes
watch(() => props.currentTheme, () => {
  initializeThemeElements()
}, { immediate: false })
</script>

<style scoped>
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  25% { 
    transform: translateY(-20px) rotate(5deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(-5deg); 
  }
  75% { 
    transform: translateY(-30px) rotate(3deg); 
  }
}

@keyframes slide-horizontal {
  0% { transform: translateX(-100px) rotate(var(--rotation, 0deg)); }
  100% { transform: translateX(calc(100vw + 100px)) rotate(var(--rotation, 0deg)); }
}

@keyframes slide-vertical {
  0% { transform: translateY(-100px) rotate(var(--rotation, 0deg)); }
  100% { transform: translateY(calc(100vh + 100px)) rotate(var(--rotation, 0deg)); }
}

@keyframes leaf-fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 50px)) rotate(360deg);
    opacity: 0;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse,
  .gradient-animation {
    animation: none;
  }
  
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
