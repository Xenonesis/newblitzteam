<template>
  <div class="relative" ref="dropdownRef">
    <!-- Theme Toggle Button -->
    <button
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      aria-label="Select theme"
      class="group relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
    >
      <component 
        :is="currentThemeIcon" 
        class="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" 
        :class="currentThemeIconColor"
      />
      <span class="hidden sm:inline text-foreground">{{ currentTheme.label }}</span>
      <ChevronDown class="h-3 w-3 transition-transform duration-200 text-muted-foreground" :class="{ 'rotate-180': isOpen }" />
      
      <!-- Active theme indicator -->
      <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 backdrop-blur-xl rounded-xl shadow-2xl z-50 overflow-hidden"
        :style="{
          backgroundColor: 'hsl(var(--background) / 0.95)',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border) / 0.2)'
        }"
        role="menu"
        aria-orientation="vertical"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <h3 class="text-sm font-semibold text-foreground">Choose Theme</h3>
          <p class="text-xs text-muted-foreground mt-1">Select your preferred visual style</p>
        </div>

        <!-- Theme Options -->
        <div class="p-2 space-y-1">
          <button
            v-for="theme in themes"
            :key="theme.value"
            @click="selectTheme(theme.value)"
            :class="[
              'w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group relative overflow-hidden',
              currentThemeValue === theme.value 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-foreground'
            ]"
            role="menuitem"
          >
            <!-- Theme Preview -->
            <div class="relative flex-shrink-0">
              <div :class="[
                'w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-transform duration-200 group-hover:scale-110',
                theme.preview.border,
                theme.preview.bg
              ]">
                <component 
                  :is="theme.icon" 
                  :class="['h-5 w-5', theme.preview.iconColor]"
                />
              </div>
              
              <!-- Active indicator -->
              <div 
                v-if="currentThemeValue === theme.value"
                class="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center"
              >
                <Check class="h-2 w-2 text-primary-foreground" />
              </div>
            </div>

            <!-- Theme Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium truncate">{{ theme.label }}</h4>
                <Badge 
                  v-if="theme.isNew" 
                  variant="secondary" 
                  class="text-xs px-1.5 py-0.5"
                >
                  New
                </Badge>
              </div>
              <p class="text-xs text-muted-foreground mt-0.5">{{ theme.description }}</p>
              
              <!-- Color palette preview -->
              <div class="flex space-x-1 mt-2">
                <div 
                  v-for="color in theme.palette" 
                  :key="color"
                  :class="['w-3 h-3 rounded-full', color]"
                ></div>
              </div>
            </div>

            <!-- Hover effect overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-foreground">Auto-save enabled</span>
            <button
              @click="resetToSystem"
              class="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Reset to System
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, Sun, Moon, Sparkles, Check, Palette } from 'lucide-vue-next'
import Badge from './Badge.vue'

const props = defineProps({
  currentTheme: {
    type: String,
    default: 'dark'
  }
})

const emit = defineEmits(['theme-change'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const themes = [
  {
    value: 'light',
    label: 'Light Mode',
    description: 'Clean and bright interface',
    icon: Sun,
    preview: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      border: 'border-blue-200',
      iconColor: 'text-amber-500'
    },
    palette: ['bg-white', 'bg-blue-500', 'bg-gray-200', 'bg-amber-400']
  },
  {
    value: 'dark',
    label: 'Dark Mode',
    description: 'Easy on the eyes',
    icon: Moon,
    preview: {
      bg: 'bg-gradient-to-br from-gray-800 to-gray-900',
      border: 'border-gray-600',
      iconColor: 'text-blue-400'
    },
    palette: ['bg-gray-900', 'bg-blue-600', 'bg-gray-700', 'bg-purple-500']
  },
  {
    value: 'neon',
    label: 'Neon Mode',
    description: 'Vibrant cyberpunk aesthetics',
    icon: Sparkles,
    isNew: true,
    preview: {
      bg: 'bg-gradient-to-br from-purple-900 to-pink-900',
      border: 'border-purple-500',
      iconColor: 'text-cyan-400'
    },
    palette: ['bg-purple-900', 'bg-cyan-500', 'bg-pink-600', 'bg-green-400']
  },
  {
    value: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Dark futuristic with neon accents',
    icon: Palette,
    isNew: true,
    preview: {
      bg: 'bg-gradient-to-br from-black to-purple-900',
      border: 'border-cyan-500',
      iconColor: 'text-green-400'
    },
    palette: ['bg-black', 'bg-cyan-500', 'bg-purple-700', 'bg-pink-500']
  },
  {
    value: 'emerald',
    label: 'Emerald',
    description: 'Natural green tones with gold accents',
    icon: Sparkles,
    isNew: true,
    preview: {
      bg: 'bg-gradient-to-br from-emerald-800 to-green-900',
      border: 'border-emerald-500',
      iconColor: 'text-amber-400'
    },
    palette: ['bg-emerald-900', 'bg-emerald-500', 'bg-green-600', 'bg-amber-400']
  }
]

const currentThemeValue = ref(props.currentTheme)

const currentTheme = computed(() => {
  return themes.find(t => t.value === currentThemeValue.value) || themes[1]
})

const currentThemeIcon = computed(() => currentTheme.value.icon)
const currentThemeIconColor = computed(() => currentTheme.value.preview.iconColor)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (themeValue) => {
  currentThemeValue.value = themeValue
  emit('theme-change', themeValue)
  isOpen.value = false
}

const resetToSystem = () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  selectTheme(systemTheme)
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  currentThemeValue.value = props.currentTheme
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>