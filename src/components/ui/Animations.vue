<template>
  <div class="animations-showcase">
    <!-- Hover Effect Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="group relative overflow-hidden bg-white dark:bg-gray-800 neon:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 neon:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
        @mouseenter="handleCardHover(card.id)"
        @mouseleave="handleCardLeave(card.id)"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
      >
        <!-- Card Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <!-- Animated Border -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-0.5">
          <div class="w-full h-full bg-white dark:bg-gray-800 neon:bg-gray-900 rounded-2xl"></div>
        </div>
        
        <!-- Card Content -->
        <div class="relative p-6 z-10">
          <!-- Icon with animation -->
          <div class="mb-4 relative">
            <div 
              class="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              :class="card.iconBg"
            >
              <component 
                :is="card.icon" 
                class="h-6 w-6 transition-all duration-300 group-hover:scale-110"
                :class="card.iconColor"
              />
            </div>
            
            <!-- Floating particles -->
            <div 
              v-for="i in 3" 
              :key="i"
              class="absolute w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000"
              :style="{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`
              }"
              :class="hoveredCard === card.id ? 'animate-float-up' : ''"
            ></div>
          </div>
          
          <!-- Title with shimmer effect -->
          <h3 class="text-lg font-semibold text-foreground mb-2 relative overflow-hidden">
            {{ card.title }}
            <div 
              class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"
            ></div>
          </h3>
          
          <!-- Description -->
          <p class="text-muted-foreground text-sm leading-relaxed">{{ card.description }}</p>
          
          <!-- Progress bar animation -->
          <div class="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
              :style="{ width: hoveredCard === card.id ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
        
        <!-- Corner decoration -->
        <div class="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>
    </div>

    <!-- Interactive Buttons -->
    <div class="flex flex-wrap gap-4 mb-12">
      <!-- Ripple Button -->
      <Button 
        class="relative overflow-hidden group"
        @click="triggerRipple"
        ref="rippleButton"
      >
        <span class="relative z-10">Ripple Effect</span>
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
      </Button>
      
      <!-- Bounce Button -->
      <Button 
        variant="outline"
        class="transition-transform duration-200 hover:scale-105 active:scale-95"
        @click="triggerBounce"
        :class="{ 'animate-bounce': isBouncing }"
      >
        <Zap class="mr-2 h-4 w-4" />
        Bounce Animation
      </Button>
      
      <!-- Pulse Button -->
      <Button 
        variant="secondary"
        class="transition-all duration-300"
        @click="triggerPulse"
        :class="{ 'animate-pulse scale-105': isPulsing }"
      >
        <Heart class="mr-2 h-4 w-4" />
        Pulse Effect
      </Button>
      
      <!-- Shake Button -->
      <Button 
        variant="destructive"
        @click="triggerShake"
        :class="{ 'animate-shake': isShaking }"
      >
        <AlertTriangle class="mr-2 h-4 w-4" />
        Shake Alert
      </Button>
    </div>

    <!-- Morphing Icons -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div
        v-for="morph in morphingIcons"
        :key="morph.id"
        class="text-center group cursor-pointer"
        @click="toggleMorph(morph.id)"
      >
        <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="scale-0 rotate-180"
            enter-to-class="scale-100 rotate-0"
            leave-active-class="transition-all duration-300"
            leave-from-class="scale-100 rotate-0"
            leave-to-class="scale-0 rotate-180"
            mode="out-in"
          >
            <component 
              :is="morph.isToggled ? morph.iconB : morph.iconA" 
              :key="morph.isToggled ? 'b' : 'a'"
              class="h-8 w-8 text-primary"
            />
          </Transition>
        </div>
        <p class="text-sm font-medium text-foreground">{{ morph.label }}</p>
      </div>
    </div>

    <!-- Loading Animations -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <!-- Spinner Variations -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto mb-3 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin"></div>
        <p class="text-sm text-muted-foreground">Classic Spinner</p>
      </div>
      
      <div class="text-center">
        <div class="w-12 h-12 mx-auto mb-3 relative">
          <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          <div class="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin-reverse"></div>
        </div>
        <p class="text-sm text-muted-foreground">Dual Ring</p>
      </div>
      
      <div class="text-center">
        <div class="flex justify-center items-center space-x-1 mb-3">
          <div 
            v-for="i in 3" 
            :key="i"
            class="w-3 h-3 bg-primary rounded-full animate-bounce"
            :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
          ></div>
        </div>
        <p class="text-sm text-muted-foreground">Bouncing Dots</p>
      </div>
      
      <div class="text-center">
        <div class="flex justify-center items-end space-x-1 mb-3">
          <div 
            v-for="i in 5" 
            :key="i"
            class="w-1 h-8 bg-primary rounded-full animate-wave"
            :style="{ animationDelay: `${(i - 1) * 0.1}s` }"
          ></div>
        </div>
        <p class="text-sm text-muted-foreground">Wave Bars</p>
      </div>
    </div>

    <!-- Progress Animations -->
    <div class="space-y-6">
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-foreground">Progress Animation</span>
          <span class="text-sm text-muted-foreground">{{ progressValue }}%</span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
            :style="{ width: `${progressValue}%` }"
          >
            <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <Button size="sm" @click="animateProgress" class="mt-2">
          Animate Progress
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  Code, Palette, Rocket, Shield, Zap, Heart, AlertTriangle,
  Play, Pause, ThumbsUp, ThumbsDown, Sun, Moon, Volume, VolumeX
} from 'lucide-vue-next'
import Button from './Button.vue'

const hoveredCard = ref(null)
const ripples = ref([])
const rippleButton = ref(null)
const isBouncing = ref(false)
const isPulsing = ref(false)
const isShaking = ref(false)
const progressValue = ref(0)

const cards = [
  {
    id: 1,
    title: 'Interactive Design',
    description: 'Engaging user interfaces with smooth animations and micro-interactions.',
    icon: Palette,
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400'
  },
  {
    id: 2,
    title: 'Performance Optimized',
    description: 'Lightning-fast loading times and efficient resource management.',
    icon: Rocket,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 3,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with robust error handling and validation.',
    icon: Shield,
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  }
]

const morphingIcons = reactive([
  {
    id: 1,
    label: 'Play/Pause',
    iconA: Play,
    iconB: Pause,
    isToggled: false
  },
  {
    id: 2,
    label: 'Like/Dislike',
    iconA: ThumbsUp,
    iconB: ThumbsDown,
    isToggled: false
  },
  {
    id: 3,
    label: 'Day/Night',
    iconA: Sun,
    iconB: Moon,
    isToggled: false
  },
  {
    id: 4,
    label: 'Sound Toggle',
    iconA: Volume,
    iconB: VolumeX,
    isToggled: false
  }
])

const handleCardHover = (cardId) => {
  hoveredCard.value = cardId
}

const handleCardLeave = (cardId) => {
  hoveredCard.value = null
}

const triggerRipple = (event) => {
  const button = rippleButton.value?.$el || rippleButton.value
  const rect = button.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const size = Math.max(rect.width, rect.height)
  
  const ripple = {
    id: Date.now(),
    x,
    y,
    size
  }
  
  ripples.value.push(ripple)
  
  setTimeout(() => {
    const index = ripples.value.findIndex(r => r.id === ripple.id)
    if (index > -1) {
      ripples.value.splice(index, 1)
    }
  }, 600)
}

const triggerBounce = () => {
  isBouncing.value = true
  setTimeout(() => {
    isBouncing.value = false
  }, 1000)
}

const triggerPulse = () => {
  isPulsing.value = true
  setTimeout(() => {
    isPulsing.value = false
  }, 2000)
}

const triggerShake = () => {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 600)
}

const toggleMorph = (id) => {
  const morph = morphingIcons.find(m => m.id === id)
  if (morph) {
    morph.isToggled = !morph.isToggled
  }
}

const animateProgress = () => {
  progressValue.value = 0
  const interval = setInterval(() => {
    progressValue.value += Math.random() * 15
    if (progressValue.value >= 100) {
      progressValue.value = 100
      clearInterval(interval)
      setTimeout(() => {
        progressValue.value = 0
      }, 1000)
    }
  }, 100)
}
</script>

<style scoped>
@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

@keyframes float-up {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px) scale(1);
    opacity: 0;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes wave {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-ripple {
  animation: ripple 0.6s linear;
}

.animate-float-up {
  animation: float-up 1s ease-out forwards;
}

.animate-shake {
  animation: shake 0.6s ease-in-out;
}

.animate-wave {
  animation: wave 1.2s ease-in-out infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 1s linear infinite;
}
</style>