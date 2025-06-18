<template>
  <div class="loading-states">
    <!-- Page Loading Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isPageLoading"
        class="fixed inset-0 z-[100] bg-white/80 dark:bg-gray-900/80 neon:bg-gray-900/90 backdrop-blur-xl flex items-center justify-center"
        role="dialog"
        aria-label="Loading content"
        aria-live="polite"
      >
        <div class="text-center">
          <!-- Animated Logo -->
          <div class="relative mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <span class="text-white font-bold text-2xl">B</span>
            </div>
            <!-- Rotating rings -->
            <div class="absolute inset-0 rounded-2xl border-4 border-transparent border-t-blue-500 animate-spin"></div>
            <div class="absolute inset-2 rounded-xl border-2 border-transparent border-r-purple-500 animate-spin animate-reverse" style="animation-duration: 1.5s;"></div>
          </div>

          <!-- Loading Text -->
          <h2 class="text-2xl font-bold text-foreground mb-2">Team Blitz</h2>
          <p class="text-muted-foreground mb-6">{{ loadingMessage }}</p>

          <!-- Progress Bar -->
          <div class="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${loadingProgress}%` }"
            ></div>
          </div>

          <!-- Loading percentage -->
          <div class="text-sm text-muted-foreground">
            {{ Math.round(loadingProgress) }}% Complete
          </div>
        </div>
      </div>
    </Transition>

    <!-- Skeleton Loaders -->
    <div v-if="showSkeleton" class="space-y-6">
      <!-- Hero Skeleton -->
      <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse">
        <div class="container mx-auto px-4 pt-32">
          <div class="text-center space-y-4">
            <div class="h-16 bg-gray-300 dark:bg-gray-700 rounded-lg w-96 mx-auto"></div>
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div class="flex justify-center space-x-4 mt-8">
              <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
              <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Skeletons -->
      <div class="container mx-auto px-4 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="i in 6"
            :key="i"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-pulse"
          >
            <div class="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inline Loading Spinner -->
    <div v-if="showInlineSpinner" class="flex items-center justify-center py-8">
      <div class="relative">
        <!-- Main spinner -->
        <div class="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin"></div>
        <!-- Inner dot -->
        <div class="absolute inset-2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
      </div>
    </div>

    <!-- Button Loading States -->
    <div v-if="showButtonLoading" class="space-y-4">
      <!-- Loading button -->
      <Button disabled class="relative overflow-hidden">
        <div class="flex items-center">
          <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
          <span>Loading...</span>
        </div>
        <!-- Shimmer effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
      </Button>

      <!-- Success state -->
      <Button variant="outline" class="border-green-500 text-green-500">
        <Check class="w-4 h-4 mr-2" />
        Success!
      </Button>

      <!-- Error state -->
      <Button variant="destructive" disabled>
        <X class="w-4 h-4 mr-2" />
        Failed to load
      </Button>
    </div>

    <!-- Progress Ring -->
    <div v-if="showProgressRing" class="flex items-center justify-center">
      <div class="relative w-16 h-16">
        <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <!-- Background circle -->
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            class="text-gray-200 dark:text-gray-700"
          />
          <!-- Progress circle -->
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            class="text-primary transition-all duration-300 ease-out"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circumference - (progressRingValue / 100) * circumference"
          />
        </svg>
        <!-- Percentage text -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-sm font-semibold text-foreground">{{ progressRingValue }}%</span>
        </div>
      </div>
    </div>

    <!-- Dots Loading Animation -->
    <div v-if="showDotsLoader" class="flex items-center justify-center space-x-2">
      <div
        v-for="i in 3"
        :key="i"
        class="w-3 h-3 bg-primary rounded-full animate-bounce"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      ></div>
    </div>

    <!-- Wave Loading Animation -->
    <div v-if="showWaveLoader" class="flex items-center justify-center space-x-1">
      <div
        v-for="i in 5"
        :key="i"
        class="w-1 bg-primary rounded-full animate-wave"
        :style="{ 
          height: `${Math.random() * 20 + 10}px`,
          animationDelay: `${(i - 1) * 0.1}s` 
        }"
      ></div>
    </div>

    <!-- Pulse Grid -->
    <div v-if="showPulseGrid" class="grid grid-cols-3 gap-2 w-16 h-16">
      <div
        v-for="i in 9"
        :key="i"
        class="bg-primary rounded animate-pulse"
        :style="{ animationDelay: `${(i - 1) * 0.1}s` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Check, X } from 'lucide-vue-next'
import Button from './Button.vue'

const props = defineProps({
  isPageLoading: {
    type: Boolean,
    default: false
  },
  showSkeleton: {
    type: Boolean,
    default: false
  },
  showInlineSpinner: {
    type: Boolean,
    default: false
  },
  showButtonLoading: {
    type: Boolean,
    default: false
  },
  showProgressRing: {
    type: Boolean,
    default: false
  },
  progressRingValue: {
    type: Number,
    default: 0
  },
  showDotsLoader: {
    type: Boolean,
    default: false
  },
  showWaveLoader: {
    type: Boolean,
    default: false
  },
  showPulseGrid: {
    type: Boolean,
    default: false
  }
})

const loadingProgress = ref(0)
const loadingMessage = ref('Initializing...')

const circumference = computed(() => {
  return 2 * Math.PI * 28 // radius = 28
})

const loadingMessages = [
  'Initializing...',
  'Loading components...',
  'Preparing interface...',
  'Almost ready...',
  'Finalizing...'
]

let loadingInterval

const simulateLoading = () => {
  let progress = 0
  let messageIndex = 0
  
  loadingInterval = setInterval(() => {
    progress += Math.random() * 15
    
    if (progress >= 100) {
      progress = 100
      loadingMessage.value = 'Complete!'
      clearInterval(loadingInterval)
    } else {
      messageIndex = Math.floor((progress / 100) * loadingMessages.length)
      loadingMessage.value = loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]
    }
    
    loadingProgress.value = progress
  }, 200)
}

onMounted(() => {
  if (props.isPageLoading) {
    simulateLoading()
  }
})

onUnmounted(() => {
  if (loadingInterval) {
    clearInterval(loadingInterval)
  }
})
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes wave {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}

@keyframes reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-wave {
  animation: wave 1.2s infinite ease-in-out;
}

.animate-reverse {
  animation: reverse 2s linear infinite;
}
</style>