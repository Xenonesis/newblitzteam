<template>
  <section id="demo" class="py-20 relative overflow-hidden transition-all duration-500" :class="sectionBackground">
    <!-- Background Effects -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
    </div>
    
    <!-- Theme-specific background effects -->
    <div v-if="currentTheme === 'neon'" class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl font-bold mb-4" :class="headingClasses">
          Live <span class="text-transparent bg-clip-text bg-gradient-to-r" :class="gradientTextClasses">Demo</span>
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :class="subtitleClasses">
          Experience our project in action. See how EcoTrack transforms environmental consciousness into meaningful action.
        </p>
      </div>

      <!-- Demo Content Grid -->
      <div class="max-w-6xl mx-auto">
        <!-- Main Demo Video/Preview -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
          class="mb-12"
        >
          <Card 
            :variant="cardVariant"
            :interactive="true"
            :animated-border="true"
            class="overflow-hidden group"
          >
            <!-- Demo Preview -->
            <div class="relative h-64 md:h-96 flex items-center justify-center" :class="demoPreviewBackground">
              <div class="text-center" :class="demoContentClasses">
                <!-- Play Button -->
                <button
                  @click="playDemo"
                  :disabled="isLoading"
                  class="relative group/play mb-6 transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50 rounded-full"
                  :aria-label="isLoading ? 'Loading demo' : 'Play demo video'"
                >
                  <div class="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300" :class="playButtonClasses">
                    <Play v-if="!isLoading && !isPlaying" class="h-8 w-8 ml-1" />
                    <Pause v-else-if="isPlaying" class="h-8 w-8" />
                    <div v-else class="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <!-- Ripple effect -->
                  <div class="absolute inset-0 rounded-full border-2 border-current opacity-30 animate-ping group-hover/play:animate-none"></div>
                </button>
                
                <h3 class="text-2xl md:text-3xl font-bold mb-4">Interactive Demo</h3>
                <p class="text-lg opacity-90 max-w-2xl mx-auto">
                  {{ demoStatus }}
                </p>
              </div>
              
              <!-- Demo Statistics Overlay -->
              <div class="absolute top-4 left-4 space-y-2">
                <div
                  v-for="(stat, index) in demoStats"
                  :key="stat.label"
                  v-motion
                  :initial="{ opacity: 0, x: -20 }"
                  :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 200 + index * 100 } }"
                  class="px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  :class="statCardClasses"
                >
                  <div class="text-sm font-semibold" :class="statValueClasses">{{ stat.value }}</div>
                  <div class="text-xs opacity-80">{{ stat.label }}</div>
                </div>
              </div>
            </div>

            <CardContent class="p-8">
              <!-- Demo Features -->
              <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div
                  v-for="(feature, index) in demoFeatures"
                  :key="feature.title"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
                  class="text-center group cursor-pointer transition-all duration-300 hover:scale-105"
                  @click="selectFeature(feature)"
                  :class="{ 'opacity-50': selectedFeature && selectedFeature.id !== feature.id }"
                >
                  <div class="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg" :class="featureIconBackground">
                    <component :is="feature.icon" class="h-8 w-8" :class="featureIconColor" />
                  </div>
                  <h4 class="font-semibold mb-2" :class="featureTextClasses">{{ feature.title }}</h4>
                  <p class="text-sm" :class="featureDescClasses">{{ feature.description }}</p>
                </div>
              </div>

              <!-- Interactive Demo Panel -->
              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="selectedFeature" class="border-t pt-8" :class="borderClasses">
                  <h5 class="text-xl font-semibold mb-4" :class="panelTitleClasses">
                    {{ selectedFeature.title }} Demo
                  </h5>
                  <div class="grid md:grid-cols-2 gap-6">
                    <!-- Feature Description -->
                    <div>
                      <p class="mb-4" :class="panelTextClasses">{{ selectedFeature.longDescription }}</p>
                      <div class="space-y-2">
                        <div
                          v-for="step in selectedFeature.steps"
                          :key="step"
                          class="flex items-start space-x-3"
                        >
                          <div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold" :class="stepIndicatorClasses">
                            {{ selectedFeature.steps.indexOf(step) + 1 }}
                          </div>
                          <span class="text-sm" :class="stepTextClasses">{{ step }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Interactive Elements -->
                    <div class="space-y-4">
                      <div class="p-4 rounded-lg" :class="interactiveAreaClasses">
                        <div class="text-center">
                          <component :is="selectedFeature.icon" class="h-12 w-12 mx-auto mb-4" :class="largeIconClasses" />
                          <Button
                            @click="runFeatureDemo"
                            :disabled="isFeatureLoading"
                            class="relative overflow-hidden"
                          >
                            <span v-if="!isFeatureLoading" class="flex items-center">
                              <Zap class="mr-2 h-4 w-4" />
                              Try {{ selectedFeature.title }}
                            </span>
                            <span v-else class="flex items-center">
                              <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                              Running...
                            </span>
                          </Button>
                        </div>
                      </div>
                      
                      <!-- Results Display -->
                      <Transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="transform translate-y-4 opacity-0"
                        enter-to-class="transform translate-y-0 opacity-100"
                      >
                        <div v-if="featureResult" class="p-4 rounded-lg border" :class="resultClasses">
                          <div class="flex items-start space-x-3">
                            <CheckCircle class="h-5 w-5 flex-shrink-0 mt-0.5 text-green-500" />
                            <div>
                              <p class="font-medium text-sm">Demo Complete!</p>
                              <p class="text-xs mt-1 opacity-80">{{ featureResult }}</p>
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
              </Transition>
            </CardContent>
          </Card>
        </div>

        <!-- Quick Actions -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
          class="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card
            v-for="(action, index) in quickActions"
            :key="action.title"
            :variant="cardVariant"
            :interactive="true"
            class="text-center group cursor-pointer"
            @click="performQuickAction(action)"
          >
            <CardContent class="p-6">
              <component :is="action.icon" class="h-12 w-12 mx-auto mb-4 transition-all duration-300 group-hover:scale-110" :class="actionIconClasses" />
              <h4 class="font-semibold mb-2" :class="actionTitleClasses">{{ action.title }}</h4>
              <p class="text-sm" :class="actionDescClasses">{{ action.description }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg backdrop-blur-sm"
        :class="toastClasses"
      >
        <div class="flex items-center space-x-3">
          <CheckCircle class="h-5 w-5 text-green-400" />
          <span class="font-medium">{{ toastMessage }}</span>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Play, Pause, Zap, CheckCircle, BarChart3, Users, Leaf, Shield, Smartphone, Target } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'

// Reactive state
const isLoading = ref(false)
const isPlaying = ref(false)
const isFeatureLoading = ref(false)
const selectedFeature = ref(null)
const featureResult = ref('')
const showToast = ref(false)
const toastMessage = ref('')

// Get current theme
const currentTheme = computed(() => {
  if (document.documentElement.classList.contains('cyberpunk')) return 'cyberpunk'
  if (document.documentElement.classList.contains('emerald')) return 'emerald'
  if (document.documentElement.classList.contains('neon')) return 'neon'
  if (document.documentElement.classList.contains('light')) return 'light'
  return 'dark'
})

// Theme-based styling
const sectionBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-900 to-green-800 text-amber-100'
    case 'neon':
      return 'bg-gradient-to-br from-gray-900 to-purple-900 text-cyan-100'
    case 'light':
      return 'bg-gray-50 text-gray-900'
    default:
      return 'bg-gray-900 text-white'
  }
})

const headingClasses = computed(() => {
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

const gradientTextClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'from-cyan-400 via-green-400 to-purple-400'
    case 'emerald':
      return 'from-emerald-400 via-green-400 to-amber-400'
    case 'neon':
      return 'from-purple-400 via-pink-400 to-cyan-400'
    case 'light':
      return 'from-blue-600 via-purple-500 to-indigo-600'
    default:
      return 'from-blue-400 via-purple-400 to-indigo-400'
  }
})

const subtitleClasses = computed(() => {
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

const cardVariant = computed(() => {
  return currentTheme.value === 'light' ? 'default' : 'elevated'
})

const demoPreviewBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gradient-to-br from-black via-gray-900 to-cyan-900'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-800 via-green-700 to-amber-800'
    case 'neon':
      return 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900'
    case 'light':
      return 'bg-gradient-to-br from-blue-50 to-indigo-100'
    default:
      return 'bg-gradient-to-br from-gray-800 to-gray-900'
  }
})

const demoContentClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-gray-900'
    default:
      return 'text-white'
  }
})

const playButtonClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30'
    case 'emerald':
      return 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-500/30'
    case 'neon':
      return 'bg-purple-500/20 border-2 border-purple-400 text-purple-400 hover:bg-purple-500/30'
    case 'light':
      return 'bg-blue-100 border-2 border-blue-500 text-blue-600 hover:bg-blue-200'
    default:
      return 'bg-blue-500/20 border-2 border-blue-400 text-blue-400 hover:bg-blue-500/30'
  }
})

// Demo status computed
const demoStatus = computed(() => {
  if (isLoading.value) return 'Loading interactive demo...'
  if (isPlaying.value) return 'Demo is running - see EcoTrack in action!'
  return 'Click play to see our carbon tracking platform in action'
})

// Demo data
const demoStats = [
  { label: 'CO₂ Saved', value: '2.3t' },
  { label: 'Active Users', value: '150+' },
  { label: 'Daily Tips', value: '12' }
]

const demoFeatures = [
  {
    id: 1,
    title: 'Carbon Tracking',
    description: 'Real-time carbon footprint monitoring',
    longDescription: 'Track your daily carbon emissions across transportation, energy consumption, and lifestyle choices with AI-powered insights.',
    icon: BarChart3,
    steps: [
      'Connect your daily activities',
      'AI analyzes carbon impact',
      'Get personalized insights',
      'Track progress over time'
    ]
  },
  {
    id: 2,
    title: 'Community Challenges',
    description: 'Join eco-friendly challenges',
    longDescription: 'Participate in community-driven environmental challenges and compete with friends to reduce your carbon footprint.',
    icon: Users,
    steps: [
      'Browse available challenges',
      'Join challenges that interest you',
      'Track your progress',
      'Celebrate achievements with community'
    ]
  },
  {
    id: 3,
    title: 'Impact Visualization',
    description: 'See your environmental impact',
    longDescription: 'Visualize your environmental impact through interactive charts and see how your actions contribute to global sustainability.',
    icon: Leaf,
    steps: [
      'View comprehensive dashboard',
      'Analyze impact trends',
      'Compare with global averages',
      'Share your progress'
    ]
  }
]

const quickActions = [
  {
    title: 'Try Live Demo',
    description: 'Experience the full application',
    icon: Smartphone,
    action: 'demo'
  },
  {
    title: 'View Source Code',
    description: 'Explore our implementation',
    icon: Shield,
    action: 'source'
  },
  {
    title: 'Download App',
    description: 'Get the mobile application',
    icon: Target,
    action: 'download'
  }
]

// Additional computed styles
const statCardClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-900/30 border border-cyan-500/50 text-cyan-100'
    case 'emerald':
      return 'bg-emerald-900/30 border border-emerald-500/50 text-amber-100'
    case 'neon':
      return 'bg-purple-900/30 border border-purple-500/50 text-purple-100'
    case 'light':
      return 'bg-white/80 border border-gray-200 text-gray-900'
    default:
      return 'bg-gray-800/50 border border-gray-600 text-white'
  }
})

const statValueClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-400'
    case 'emerald':
      return 'text-emerald-400'
    case 'neon':
      return 'text-purple-400'
    case 'light':
      return 'text-blue-600'
    default:
      return 'text-blue-400'
  }
})

const featureIconBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-100 dark:bg-cyan-900'
    case 'emerald':
      return 'bg-emerald-100 dark:bg-emerald-900'
    case 'neon':
      return 'bg-purple-100 dark:bg-purple-900'
    case 'light':
      return 'bg-blue-100'
    default:
      return 'bg-blue-100 dark:bg-blue-900'
  }
})

const featureIconColor = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-600 dark:text-cyan-400'
    case 'emerald':
      return 'text-emerald-600 dark:text-emerald-400'
    case 'neon':
      return 'text-purple-600 dark:text-purple-400'
    case 'light':
      return 'text-blue-600'
    default:
      return 'text-blue-600 dark:text-blue-400'
  }
})

const featureTextClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-gray-900'
    default:
      return 'text-white'
  }
})

const featureDescClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-gray-600'
    default:
      return 'text-gray-300'
  }
})

const borderClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'border-gray-200'
    default:
      return 'border-gray-700'
  }
})

const panelTitleClasses = computed(() => featureTextClasses.value)
const panelTextClasses = computed(() => featureDescClasses.value)

const stepIndicatorClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-500 text-black'
    case 'emerald':
      return 'bg-emerald-500 text-white'
    case 'neon':
      return 'bg-purple-500 text-white'
    case 'light':
      return 'bg-blue-500 text-white'
    default:
      return 'bg-blue-500 text-white'
  }
})

const stepTextClasses = computed(() => featureDescClasses.value)

const interactiveAreaClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gray-900/50 border border-cyan-500/30'
    case 'emerald':
      return 'bg-emerald-900/50 border border-emerald-500/30'
    case 'neon':
      return 'bg-purple-900/50 border border-purple-500/30'
    case 'light':
      return 'bg-gray-50 border border-gray-200'
    default:
      return 'bg-gray-800/50 border border-gray-600/30'
  }
})

const largeIconClasses = computed(() => featureIconColor.value)

const resultClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bg-green-50 border-green-200 text-green-800'
    default:
      return 'bg-green-900/20 border-green-500/30 text-green-200'
  }
})

const actionIconClasses = computed(() => featureIconColor.value)
const actionTitleClasses = computed(() => featureTextClasses.value)
const actionDescClasses = computed(() => featureDescClasses.value)

const toastClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bg-white border border-gray-200 text-gray-900'
    default:
      return 'bg-gray-800 border border-gray-700 text-white'
  }
})

// Methods
const playDemo = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  try {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))
    isPlaying.value = true
    showToastMessage('Demo started successfully!')
    
    // Auto-stop after 10 seconds
    setTimeout(() => {
      isPlaying.value = false
    }, 10000)
    
  } catch (error) {
    console.error('Demo failed to start:', error)
    showToastMessage('Failed to start demo. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const selectFeature = (feature) => {
  selectedFeature.value = selectedFeature.value?.id === feature.id ? null : feature
  featureResult.value = ''
}

const runFeatureDemo = async () => {
  if (!selectedFeature.value || isFeatureLoading.value) return
  
  isFeatureLoading.value = true
  
  try {
    // Simulate feature demo
    await new Promise(resolve => setTimeout(resolve, 1500))
    featureResult.value = `${selectedFeature.value.title} demo completed successfully! You can see how this feature helps users track and reduce their environmental impact.`
    showToastMessage(`${selectedFeature.value.title} demo completed!`)
  } catch (error) {
    console.error('Feature demo failed:', error)
    featureResult.value = 'Demo failed. Please try again.'
  } finally {
    isFeatureLoading.value = false
  }
}

const performQuickAction = (action) => {
  switch (action.action) {
    case 'demo':
      showToastMessage('Opening live demo...')
      // Simulate opening demo
      break
    case 'source':
      showToastMessage('Opening source code...')
      window.open('https://github.com', '_blank')
      break
    case 'download':
      showToastMessage('Download started...')
      // Simulate download
      break
  }
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Lifecycle
onMounted(() => {
  // Auto-select first feature after a delay
  setTimeout(() => {
    if (!selectedFeature.value) {
      selectedFeature.value = demoFeatures[0]
    }
  }, 2000)
})
</script>

<style scoped>
/* Additional animations for demo section */
@keyframes demo-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.demo-highlight {
  animation: demo-pulse 2s ease-in-out infinite;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .demo-highlight {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .backdrop-blur-sm {
    backdrop-filter: none;
    background-color: hsl(var(--background));
  }
}
</style>