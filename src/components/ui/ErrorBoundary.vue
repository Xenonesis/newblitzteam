<template>
  <div v-if="hasError" class="min-h-screen flex items-center justify-center p-4" :class="errorBackgroundClasses">
    <div class="max-w-md w-full text-center">
      <Card :variant="cardVariant" class="p-8">
        <CardContent>
          <!-- Error Icon -->
          <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" :class="iconBackgroundClasses">
            <AlertTriangle class="h-8 w-8" :class="iconClasses" />
          </div>
          
          <!-- Error Title -->
          <h1 class="text-2xl font-bold mb-4" :class="titleClasses">
            Oops! Something went wrong
          </h1>
          
          <!-- Error Message -->
          <p class="mb-6" :class="messageClasses">
            {{ errorMessage || 'We encountered an unexpected error. Please try again.' }}
          </p>
          
          <!-- Error Details (Development Only) -->
          <details v-if="isDevelopment && errorDetails" class="mb-6 text-left">
            <summary class="cursor-pointer text-sm font-medium mb-2" :class="detailsClasses">
              Technical Details
            </summary>
            <pre class="text-xs p-3 rounded bg-gray-100 dark:bg-gray-800 overflow-auto" :class="codeClasses">{{ errorDetails }}</pre>
          </details>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Button @click="retryOperation" :disabled="isRetrying">
              <RotateCcw v-if="!isRetrying" class="mr-2 h-4 w-4" />
              <div v-else class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              {{ isRetrying ? 'Retrying...' : 'Try Again' }}
            </Button>
            
            <Button variant="outline" @click="goHome">
              <Home class="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
          
          <!-- Support Contact -->
          <div class="mt-6 pt-6 border-t" :class="borderClasses">
            <p class="text-sm" :class="supportTextClasses">
              Still having trouble? 
              <a href="mailto:support@teamblitz.dev" class="underline hover:no-underline" :class="linkClasses">
                Contact Support
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup>
import { ref, computed, onErrorCaptured, onMounted } from 'vue'
import { AlertTriangle, RotateCcw, Home } from 'lucide-vue-next'
import Card from './Card.vue'
import CardContent from './CardContent.vue'
import Button from './Button.vue'

const emit = defineEmits(['error', 'retry'])

const hasError = ref(false)
const errorMessage = ref('')
const errorDetails = ref('')
const isRetrying = ref(false)
const retryCount = ref(0)
const maxRetries = 3

// Get current theme
const currentTheme = computed(() => {
  if (document.documentElement.classList.contains('cyberpunk')) return 'cyberpunk'
  if (document.documentElement.classList.contains('emerald')) return 'emerald'
  if (document.documentElement.classList.contains('neon')) return 'neon'
  if (document.documentElement.classList.contains('light')) return 'light'
  return 'dark'
})

const isDevelopment = computed(() => import.meta.env.DEV)

// Theme-based styling
const errorBackgroundClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-emerald-900 text-amber-100'
    case 'neon':
      return 'bg-gray-900 text-cyan-100'
    case 'light':
      return 'bg-gray-50 text-gray-900'
    default:
      return 'bg-gray-900 text-white'
  }
})

const cardVariant = computed(() => {
  return currentTheme.value === 'light' ? 'default' : 'elevated'
})

const iconBackgroundClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-red-900/50 border border-red-500/50'
    case 'emerald':
      return 'bg-red-900/50 border border-red-500/50'
    case 'neon':
      return 'bg-red-900/50 border border-red-500/50'
    case 'light':
      return 'bg-red-100 border border-red-200'
    default:
      return 'bg-red-900/50 border border-red-500/50'
  }
})

const iconClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-red-600'
    default:
      return 'text-red-400'
  }
})

const titleClasses = computed(() => {
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

const messageClasses = computed(() => {
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

const detailsClasses = computed(() => messageClasses.value)
const codeClasses = computed(() => messageClasses.value)
const supportTextClasses = computed(() => messageClasses.value)

const borderClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'border-gray-200'
    default:
      return 'border-gray-700'
  }
})

const linkClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-400 hover:text-cyan-300'
    case 'emerald':
      return 'text-emerald-400 hover:text-emerald-300'
    case 'neon':
      return 'text-purple-400 hover:text-purple-300'
    case 'light':
      return 'text-blue-600 hover:text-blue-700'
    default:
      return 'text-blue-400 hover:text-blue-300'
  }
})

// Error handling
onErrorCaptured((err, instance, info) => {
  console.error('Error captured by ErrorBoundary:', err)
  
  hasError.value = true
  errorMessage.value = err.message || 'An unexpected error occurred'
  
  if (isDevelopment.value) {
    errorDetails.value = `${err.stack}\n\nComponent: ${info}`
  }
  
  // Emit error event for external handling
  emit('error', { error: err, instance, info })
  
  // Prevent the error from propagating
  return false
})

// Methods
const retryOperation = async () => {
  if (retryCount.value >= maxRetries) {
    errorMessage.value = 'Maximum retry attempts reached. Please refresh the page or contact support.'
    return
  }
  
  isRetrying.value = true
  retryCount.value++
  
  try {
    // Wait a moment before retrying
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset error state
    hasError.value = false
    errorMessage.value = ''
    errorDetails.value = ''
    isRetrying.value = false
    
    // Emit retry event
    emit('retry', { attempt: retryCount.value })
    
    // Force component re-render
    await new Promise(resolve => {
      // Trigger reactivity
      setTimeout(() => {
        resolve()
      }, 100)
    })
    
  } catch (error) {
    console.error('Retry failed:', error)
    errorMessage.value = 'Retry failed. Please try again or contact support.'
    isRetrying.value = false
  }
}

const goHome = () => {
  // Reset error state
  hasError.value = false
  errorMessage.value = ''
  errorDetails.value = ''
  retryCount.value = 0
  
  // Navigate to home
  window.location.href = '/'
}

// Global error handling
onMounted(() => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    hasError.value = true
    errorMessage.value = 'A network or processing error occurred'
    
    if (isDevelopment.value) {
      errorDetails.value = event.reason?.stack || event.reason?.toString() || 'Unknown error'
    }
    
    // Prevent the default browser error page
    event.preventDefault()
  })
  
  // Handle runtime errors
  window.addEventListener('error', (event) => {
    console.error('Runtime error:', event.error)
    
    hasError.value = true
    errorMessage.value = event.message || 'A runtime error occurred'
    
    if (isDevelopment.value) {
      errorDetails.value = `${event.error?.stack || event.error}\n\nFile: ${event.filename}\nLine: ${event.lineno}\nColumn: ${event.colno}`
    }
  })
})

// Expose methods for external use
defineExpose({
  setError: (message, details = '') => {
    hasError.value = true
    errorMessage.value = message
    errorDetails.value = details
  },
  clearError: () => {
    hasError.value = false
    errorMessage.value = ''
    errorDetails.value = ''
    retryCount.value = 0
  },
  hasError: () => hasError.value
})
</script>

<style scoped>
/* Error boundary specific styles */
pre {
  white-space: pre-wrap;
  word-break: break-word;
}

details summary {
  outline: none;
}

details[open] summary {
  margin-bottom: 0.5rem;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .border {
    border-color: currentColor;
  }
}
</style>