<template>
  <section id="project" class="py-20" :class="sectionBackground">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white neon:text-cyan-100 mb-4">
          Our Hackathon Project
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 neon:text-cyan-200 max-w-3xl mx-auto">
          Introducing <span class="font-semibold text-blue-600 dark:text-blue-400 neon:text-pink-400">EcoTrack</span> -
          A revolutionary platform that helps individuals and businesses track and reduce their carbon footprint through AI-powered insights.
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
        <!-- Main Project Card -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
        >
          <Card class="mb-12 overflow-hidden" :class="cardBackground">
            <!-- Project Hero Image/Demo -->
            <div class="relative h-64 md:h-96 flex items-center justify-center" :style="{ background: projectCardGradient }">
              <div class="text-center text-white dark:text-white neon:text-cyan-100 cyberpunk:text-white emerald:text-white">
                <Leaf class="h-16 w-16 mx-auto mb-4 animate-pulse text-white dark:text-white neon:text-cyan-300 cyberpunk:text-pink-300 emerald:text-green-300" />
                <h3 class="text-2xl md:text-3xl font-bold mb-2">EcoTrack Dashboard</h3>
                <p class="text-green-100 dark:text-gray-200 neon:text-cyan-200 cyberpunk:text-pink-200 emerald:text-green-200">Live Demo Coming Soon</p>
              </div>
              <!-- Floating Elements -->
              <div class="absolute top-4 left-4 float-animation">
                <div class="w-12 h-12 bg-white/20 dark:bg-gray-700/20 neon:bg-cyan-500/20 cyberpunk:bg-pink-500/20 emerald:bg-green-500/20 rounded-full flex items-center justify-center">
                  <BarChart3 class="h-6 w-6 text-white dark:text-gray-300 neon:text-cyan-500 cyberpunk:text-pink-300 emerald:text-green-300" />
                </div>
              </div>
              <div class="absolute bottom-4 right-4 float-animation" style="animation-delay: 1s;">
                <div class="w-12 h-12 bg-white/20 dark:bg-gray-700/20 neon:bg-cyan-500/20 cyberpunk:bg-pink-500/20 emerald:bg-green-500/20 rounded-full flex items-center justify-center">
                  <Target class="h-6 w-6 text-white dark:text-gray-300 neon:text-cyan-500 cyberpunk:text-pink-300 emerald:text-green-300" />
                </div>
              </div>
            </div>

            <CardContent class="p-8">
              <div class="grid md:grid-cols-2 gap-8">
                <!-- Project Description -->
                <div>
                  <h4 class="text-2xl font-semibold text-gray-900 dark:text-white neon:text-cyan-100 mb-4">The Problem We're Solving</h4>
                  <p class="text-gray-600 dark:text-gray-300 neon:text-cyan-300 mb-6">
                    Climate change is one of the biggest challenges of our time. Many people want to reduce their carbon footprint 
                    but don't know where to start or how to measure their impact effectively.
                  </p>
                  
                  <h4 class="text-2xl font-semibold text-gray-900 dark:text-white neon:text-cyan-100 cyberpunk:text-white emerald:text-white mb-4">Our Solution</h4>
                  <p class="text-gray-600 dark:text-gray-300 neon:text-cyan-300 cyberpunk:text-gray-300 emerald:text-gray-300 mb-6">
                    EcoTrack uses AI and machine learning to analyze user behavior, provide personalized recommendations, 
                    and gamify the process of reducing environmental impact.
                  </p>

                  <div class="flex flex-wrap gap-2">
                    <Button size="sm" class="mb-2">
                      <ExternalLink class="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" class="mb-2">
                      <Github class="mr-2 h-4 w-4" />
                      Source Code
                    </Button>
                  </div>
                </div>

                <!-- Features List -->
                <div>
                  <h4 class="text-2xl font-semibold text-gray-900 dark:text-white neon:text-cyan-100 cyberpunk:text-white emerald:text-white mb-4">Key Features</h4>
                  <div class="space-y-4">
                    <div
                      v-for="(feature, index) in features"
                      :key="feature.title"
                      v-motion
                      :initial="{ opacity: 0, x: 30 }"
                      :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: index * 100 } }"
                      class="flex items-start space-x-3"
                    >
                      <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" :class="featureIconBackground">
                        <component :is="feature.icon" class="h-4 w-4" :class="featureIconColor" />
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h5>
                        <p class="text-gray-600 dark:text-gray-300 text-sm">{{ feature.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Tech Stack -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        >
          <Card :class="cardBackground">
            <CardHeader>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white neon:text-cyan-100 cyberpunk:text-white emerald:text-white text-center">Built With</h3>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div
                  v-for="(tech, index) in techStack"
                  :key="tech.name"
                  v-motion
                  :initial="{ opacity: 0, scale: 0.8 }"
                  :visible-once="{ opacity: 1, scale: 1, transition: { duration: 400, delay: index * 50 } }"
                  class="text-center group cursor-pointer"
                >
                  <div class="w-16 h-16 mx-auto mb-2 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200" :class="techStackBackground">
                    <component :is="tech.icon" class="h-8 w-8" :class="tech.color" />
                  </div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 neon:text-cyan-300 cyberpunk:text-gray-300 emerald:text-gray-300">{{ tech.name }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  Leaf, BarChart3, Target, ExternalLink, Github,
  Smartphone, Brain, Users, Award, Shield, Zap
} from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardContent from '@/components/ui/CardContent.vue'
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

// Theme-based gradient background
const projectCardGradient = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'linear-gradient(to bottom right, #ff00ea, #8b5cf6)'
    case 'emerald':
      return 'linear-gradient(to bottom right, #34d399, #10b981)'
    case 'neon':
      return 'linear-gradient(135deg, #00ff41 0%, #0080ff 100%)'
    case 'light':
      return 'linear-gradient(to bottom right, #a7f3d0, #6ee7b7)'
    default:
      return 'linear-gradient(to bottom right, #1e3a8a, #101e4a)'
  }
})

// Theme-based section background
const sectionBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-emerald-900 text-amber-100'
    case 'neon':
      return 'bg-gray-800 text-cyan-100'
    case 'light':
      return 'bg-gray-50 text-gray-900'
    default:
      return 'bg-gray-800 text-white'
  }
})

// Theme-based card background
const cardBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gray-900 border-cyan-500/30'
    case 'emerald':
      return 'bg-emerald-800 border-emerald-500/30'
    case 'neon':
      return 'bg-gray-900 border-purple-500/30'
    case 'light':
      return 'bg-white border-gray-200'
    default:
      return 'bg-gray-700 border-gray-600'
  }
})

// Theme-based feature icon background
const featureIconBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-100 dark:bg-cyan-900'
    case 'emerald':
      return 'bg-emerald-100 dark:bg-emerald-900'
    case 'neon':
      return 'bg-purple-100 dark:bg-purple-900'
    case 'light':
      return 'bg-green-100 dark:bg-green-900'
    default:
      return 'bg-green-100 dark:bg-green-900'
  }
})

// Theme-based feature icon color
const featureIconColor = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-600 dark:text-cyan-400'
    case 'emerald':
      return 'text-emerald-600 dark:text-emerald-400'
    case 'neon':
      return 'text-purple-600 dark:text-purple-400'
    case 'light':
      return 'text-green-600 dark:text-green-400'
    default:
      return 'text-green-600 dark:text-green-400'
  }
})

// Theme-based tech stack background
const techStackBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gray-100 dark:bg-gray-700'
    case 'emerald':
      return 'bg-emerald-100 dark:bg-emerald-700'
    case 'neon':
      return 'bg-purple-100 dark:bg-purple-700'
    case 'light':
      return 'bg-gray-100 dark:bg-gray-700'
    default:
      return 'bg-gray-100 dark:bg-gray-700'
  }
})

const features = [
  {
    title: "AI-Powered Insights",
    description: "Machine learning algorithms analyze your habits and provide personalized recommendations.",
    icon: Brain
  },
  {
    title: "Real-time Tracking",
    description: "Monitor your carbon footprint in real-time across transportation, energy, and consumption.",
    icon: BarChart3
  },
  {
    title: "Community Challenges",
    description: "Join eco-friendly challenges with friends and compete for sustainability goals.",
    icon: Users
  },
  {
    title: "Achievement System",
    description: "Earn badges and rewards for reaching environmental milestones.",
    icon: Award
  },
  {
    title: "Privacy First",
    description: "Your data is encrypted and never shared without your explicit consent.",
    icon: Shield
  },
  {
    title: "Mobile Optimized",
    description: "Native mobile apps for iOS and Android with offline capabilities.",
    icon: Smartphone
  }
]

const techStack = [
  { name: "Vue.js", icon: Zap, color: "text-green-500" },
  { name: "Node.js", icon: Zap, color: "text-green-600" },
  { name: "Python", icon: Zap, color: "text-blue-500" },
  { name: "TensorFlow", icon: Brain, color: "text-orange-500" },
  { name: "PostgreSQL", icon: Zap, color: "text-blue-600" },
  { name: "Docker", icon: Zap, color: "text-blue-400" }
]
</script>
