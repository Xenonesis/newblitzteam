<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background relative overflow-hidden group',
      variants[variant],
      sizes[size],
      themeSpecificClasses,
      'hover-lift interactive-hover',
      'neon:btn-primary neon:neon-glow neon:neon-border'
    ]"
    :disabled="disabled"
    @click="handleClick"
    v-bind="$attrs"
  >
    <!-- Ripple effect overlay -->
    <div 
      v-for="ripple in ripples" 
      :key="ripple.id"
      class="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
        transform: 'translate(-50%, -50%)'
      }"
    ></div>
    
    <!-- Shimmer overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    
    <!-- Button content -->
    <span class="relative z-10 flex items-center justify-center">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'sm', 'lg', 'icon'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const ripples = ref([])
let rippleId = 0

// Get current theme
const currentTheme = computed(() => {
  if (document.documentElement.classList.contains('cyberpunk')) return 'cyberpunk'
  if (document.documentElement.classList.contains('emerald')) return 'emerald'
  if (document.documentElement.classList.contains('neon')) return 'neon'
  if (document.documentElement.classList.contains('light')) return 'light'
  return 'dark'
})

const themeSpecificClasses = computed(() => {
  const theme = currentTheme.value
  const baseClasses = 'transform transition-all duration-300'
  
  switch (theme) {
    case 'cyberpunk':
      return `${baseClasses} cyberpunk:shadow-lg cyberpunk:hover:shadow-cyan-400/50 cyberpunk:hover:shadow-xl`
    case 'emerald':
      return `${baseClasses} emerald:shadow-lg emerald:hover:shadow-emerald-400/50 emerald:hover:shadow-xl`
    case 'neon':
      return `${baseClasses} neon:shadow-lg neon:hover:shadow-purple-400/50 neon:hover:shadow-xl`
    default:
      return `${baseClasses} hover:shadow-lg`
  }
})

const variants = computed(() => {
  const theme = currentTheme.value
  
  return {
    default: getVariantClasses('default', theme),
    destructive: getVariantClasses('destructive', theme),
    outline: getVariantClasses('outline', theme),
    secondary: getVariantClasses('secondary', theme),
    ghost: getVariantClasses('ghost', theme),
    link: getVariantClasses('link', theme)
    // All variants get neon glow in neon mode
    // (handled by root class binding above)
  }
})

const getVariantClasses = (variant, theme) => {
  const baseVariants = {
    default: {
      light: 'bg-primary text-primary-foreground hover:bg-primary/90',
      dark: 'bg-primary text-primary-foreground hover:bg-primary/90',
      neon: 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white hover:from-purple-500 hover:via-pink-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(139,92,246,0.6),0_0_40px_rgba(255,0,234,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8),0_0_60px_rgba(255,0,234,0.6)] border border-cyan-400 animate-neon-pulse',
      cyberpunk: 'bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]',
      emerald: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)]'
    },
    destructive: {
      light: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      dark: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      neon: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      cyberpunk: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-black shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      emerald: 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
    },
    outline: {
      light: 'border border-input hover:bg-accent hover:text-accent-foreground',
      dark: 'border border-input hover:bg-accent hover:text-accent-foreground',
      neon: 'border-2 border-cyan-400 bg-transparent text-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200 shadow-[0_0_15px_rgba(0,255,255,0.4),0_0_30px_rgba(255,0,234,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6),0_0_50px_rgba(255,0,234,0.4)] animate-neon-border-flow',
      cyberpunk: 'border border-cyan-500 text-cyan-400 hover:bg-cyan-900/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] backdrop-blur-sm',
      emerald: 'border border-emerald-500 text-emerald-400 hover:bg-emerald-900/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] backdrop-blur-sm'
    },
    secondary: {
      light: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      dark: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      neon: 'bg-gray-800/80 text-cyan-300 hover:bg-gray-700/80 border border-magenta-500/50 shadow-[0_0_15px_rgba(255,0,234,0.4),0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,0,234,0.6),0_0_50px_rgba(0,255,255,0.4)] backdrop-blur-sm',
      cyberpunk: 'bg-gray-900/80 text-green-400 border border-green-500/50 hover:bg-gray-800/80 hover:shadow-[0_0_15px_rgba(0,255,0,0.4)] backdrop-blur-sm',
      emerald: 'bg-emerald-900/80 text-amber-200 border border-amber-500/50 hover:bg-emerald-800/80 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)] backdrop-blur-sm'
    },
    ghost: {
      light: 'hover:bg-accent hover:text-accent-foreground',
      dark: 'hover:bg-accent hover:text-accent-foreground',
      neon: 'text-cyan-300 hover:bg-purple-900/30 hover:text-pink-300',
      cyberpunk: 'text-cyan-400 hover:bg-cyan-900/20 hover:text-green-400',
      emerald: 'text-emerald-400 hover:bg-emerald-900/20 hover:text-amber-400'
    },
    link: {
      light: 'underline-offset-4 hover:underline text-primary',
      dark: 'underline-offset-4 hover:underline text-primary',
      neon: 'underline-offset-4 hover:underline text-pink-400 hover:text-cyan-400',
      cyberpunk: 'underline-offset-4 hover:underline text-green-400 hover:text-cyan-400',
      emerald: 'underline-offset-4 hover:underline text-amber-400 hover:text-emerald-400'
    }
  }
  
  return baseVariants[variant][theme] || baseVariants[variant].dark
}

const sizes = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3 rounded-md text-xs',
  lg: 'h-11 px-8 rounded-md text-base',
  icon: 'h-10 w-10'
}

const handleClick = (event) => {
  if (props.disabled) return
  
  // Create ripple effect
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const size = Math.max(rect.width, rect.height) * 2
  
  const newRipple = {
    id: ++rippleId,
    x,
    y,
    size
  }
  
  ripples.value.push(newRipple)
  
  // Remove ripple after animation
  setTimeout(() => {
    ripples.value = ripples.value.filter(ripple => ripple.id !== newRipple.id)
  }, 600)
  
  emit('click', event)
}
</script>

<style scoped>
/* Button-specific animations */
@keyframes button-press {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.interactive-hover:active {
  animation: button-press 0.1s ease-out;
}

/* Enhanced focus styles */
button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Cyberpunk button effects */
.cyberpunk button {
  position: relative;
}

.cyberpunk button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyberpunk button:hover::before {
  opacity: 1;
}

/* Emerald button effects */
.emerald button {
  position: relative;
}

.emerald button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.emerald button:hover::after {
  opacity: 1;
}
</style>
