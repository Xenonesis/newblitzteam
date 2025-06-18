<template>
  <div 
    :class="[
      'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-500 relative overflow-hidden group',
      cardClasses,
      hoverEffects,
      { 'card-stack': stackEffect },
      { 'interactive-hover': interactive },
      'neon:enhanced-card neon:neon-border neon:neon-glow'
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Background glow effect -->
    <div 
      class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      :class="glowEffect"
    ></div>
    
    <!-- Animated border -->
    <div 
      v-if="animatedBorder"
      class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="borderAnimation"
    ></div>
    
    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
    
    <!-- Floating particles for enhanced themes -->
    <div 
      v-if="showParticles && (currentTheme === 'cyberpunk' || currentTheme === 'emerald' || currentTheme === 'neon')"
      class="absolute inset-0 pointer-events-none"
    >
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-particle-drift"
        :class="particle.color"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'outline', 'ghost'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: false
  },
  stackEffect: {
    type: Boolean,
    default: false
  },
  animatedBorder: {
    type: Boolean,
    default: false
  },
  showParticles: {
    type: Boolean,
    default: false
  }
})

const isHovered = ref(false)
const particles = ref([])

// Get current theme
const currentTheme = computed(() => {
  if (document.documentElement.classList.contains('cyberpunk')) return 'cyberpunk'
  if (document.documentElement.classList.contains('emerald')) return 'emerald'
  if (document.documentElement.classList.contains('neon')) return 'neon'
  if (document.documentElement.classList.contains('light')) return 'light'
  return 'dark'
})

const cardClasses = computed(() => {
  const theme = currentTheme.value
  const variant = props.variant
  
  const baseClasses = {
    default: {
      light: 'bg-white border-gray-200 text-gray-900',
      dark: 'bg-gray-900 border-gray-700 text-white',
      neon: 'bg-card border-cyan-500 text-cyan-100 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.3),0_0_40px_rgba(255,0,234,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5),0_0_60px_rgba(255,0,234,0.3)]',
      cyberpunk: 'bg-black/90 border-cyan-500/50 text-cyan-100 backdrop-blur-sm',
      emerald: 'bg-emerald-900/80 border-emerald-500/50 text-amber-100 backdrop-blur-sm'
    },
    elevated: {
      light: 'bg-white border-gray-200 text-gray-900 shadow-lg',
      dark: 'bg-gray-800 border-gray-600 text-white shadow-lg',
      neon: 'bg-card border-cyan-500 text-cyan-100 shadow-[0_0_20px_#00ffff] backdrop-blur-sm neon:enhanced-card neon:neon-border neon:neon-glow',
      cyberpunk: 'bg-gray-900/90 border-cyan-400/60 text-cyan-100 shadow-[0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-sm',
      emerald: 'bg-emerald-800/90 border-emerald-400/60 text-amber-100 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-sm'
    },
    outline: {
      light: 'bg-transparent border-gray-300 text-gray-900',
      dark: 'bg-transparent border-gray-600 text-white',
      neon: 'bg-transparent border-cyan-500 text-cyan-100 neon:enhanced-card neon:neon-border neon:neon-glow',
      cyberpunk: 'bg-transparent border-cyan-500 text-cyan-100',
      emerald: 'bg-transparent border-emerald-500 text-amber-100'
    },
    ghost: {
      light: 'bg-transparent border-transparent text-gray-900 hover:bg-gray-50',
      dark: 'bg-transparent border-transparent text-white hover:bg-gray-800/50',
      neon: 'bg-transparent border-transparent text-cyan-100 hover:bg-purple-900/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      cyberpunk: 'bg-transparent border-transparent text-cyan-100 hover:bg-cyan-900/20',
      emerald: 'bg-transparent border-transparent text-amber-100 hover:bg-emerald-900/20'
    }
  }
  
  return baseClasses[variant][theme] || baseClasses[variant].dark
})

const hoverEffects = computed(() => {
  const theme = currentTheme.value
  
  const effects = {
    light: 'hover:shadow-lg hover:-translate-y-1',
    dark: 'hover:shadow-xl hover:-translate-y-1',
    neon: 'hover:shadow-[0_0_40px_#00ffff] hover:-translate-y-2 hover:scale-[1.04] neon:neon-glow neon:neon-border',
    cyberpunk: 'hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:-translate-y-2 hover:scale-[1.02]',
    emerald: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-2 hover:scale-[1.02]'
  }
  
  return effects[theme] || effects.dark
})

const glowEffect = computed(() => {
  const theme = currentTheme.value
  
  const glows = {
    light: 'bg-gradient-to-br from-blue-50 to-purple-50',
    dark: 'bg-gradient-to-br from-blue-900/20 to-purple-900/20',
    neon: 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 neon:neon-glow',
    cyberpunk: 'bg-gradient-to-br from-cyan-900/30 to-green-900/30',
    emerald: 'bg-gradient-to-br from-emerald-900/30 to-amber-900/30'
  }
  
  return glows[theme] || glows.dark
})

const borderAnimation = computed(() => {
  const theme = currentTheme.value
  
  const animations = {
    light: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5',
    dark: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-0.5',
    neon: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 p-0.5 animate-pulse neon:neon-glow',
    cyberpunk: 'bg-gradient-to-r from-cyan-500 via-green-500 to-purple-500 p-0.5 animate-pulse',
    emerald: 'bg-gradient-to-r from-emerald-500 via-green-500 to-amber-500 p-0.5 animate-pulse'
  }
  
  return animations[theme] || animations.dark
})

const generateParticles = () => {
  particles.value = []
  const particleCount = 6
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      color: getParticleColor()
    })
  }
}

const getParticleColor = () => {
  const theme = currentTheme.value
  
  const colors = {
    neon: ['bg-purple-400 neon:neon-glow', 'bg-pink-400 neon:neon-glow', 'bg-cyan-400 neon:neon-glow'],
    cyberpunk: ['bg-cyan-400', 'bg-green-400', 'bg-purple-400'],
    emerald: ['bg-emerald-400', 'bg-amber-400', 'bg-green-400']
  }
  
  const themeColors = colors[theme] || colors.neon
  return themeColors[Math.floor(Math.random() * themeColors.length)]
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.showParticles) {
    generateParticles()
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

onMounted(() => {
  if (props.showParticles) {
    generateParticles()
  }
})
</script>

<style scoped>
/* Enhanced card animations */
.card-stack {
  transform-style: preserve-3d;
}

/* Particle drift animation */
@keyframes particle-drift {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--drift-x, 50px), var(--drift-y, -50px)) scale(0);
    opacity: 0;
  }
}

.animate-particle-drift {
  animation: particle-drift 3s ease-out infinite;
  --drift-x: 25px;
  --drift-y: -25px;
}

/* Theme-specific card enhancements */
.neon .group:hover {
  filter: brightness(1.1);
}

.cyberpunk .group:hover {
  filter: brightness(1.2) saturate(1.2);
}

.emerald .group:hover {
  filter: brightness(1.1) saturate(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .interactive-hover:hover {
    transform: translateY(-1px) scale(1.01);
  }
}
</style>
