<template>
  <section id="team" class="py-20 relative overflow-hidden transition-all duration-500 neon:contact-section" :class="backgroundClasses">
    <!-- Enhanced Background pattern -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
    </div>
    
    <!-- Theme-specific background effects -->
    <div v-if="currentTheme === 'cyberpunk'" class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-500/10 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>
    
    <div v-if="currentTheme === 'emerald'" class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/3 right-1/3 w-56 h-56 bg-amber-500/10 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10 neon:neon-glow">
      <!-- Enhanced Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl font-bold mb-4 neon:neon-glow" :class="headingClasses">
          Meet Our <span class="text-transparent bg-clip-text bg-gradient-to-r gradient-text-neon" :class="gradientTextClasses">Team</span>
        </h2>
        <p class="text-xl max-w-2xl mx-auto" :class="subtitleClasses">
          A diverse group of passionate developers, designers, and innovators working together to create something amazing.
        </p>
      </div>

      <!-- Enhanced Team Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto neon:neon-glow">
        <div
          v-for="(member, index) in teamMembers"
          :key="member.id"
          v-motion
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1, transition: { duration: 600, delay: index * 100 } }"
        >
          <Card 
            :variant="cardVariant"
            :interactive="true" 
            :animated-border="true"
            :show-particles="currentTheme !== 'light'"
            class="group cursor-pointer neon:enhanced-card neon:neon-border neon:neon-glow"
          >
            <CardHeader class="text-center pb-4">
              <!-- Enhanced Avatar -->
              <div class="relative mx-auto mb-4">
                <div 
                  class="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-all duration-500 relative overflow-hidden"
                  :class="avatarClasses"
                >
                  {{ member.initials }}
                  <!-- Avatar glow effect -->
                  <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" :class="avatarGlow"></div>
                </div>
                
                <!-- Status indicator -->
                <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 flex items-center justify-center" :class="statusIndicatorClasses">
                  <div class="w-3 h-3 bg-current rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <!-- Enhanced Name and Role -->
              <h3 class="text-xl font-semibold mb-1 group-hover:animate-text-glow transition-all duration-300" :class="nameClasses">
                {{ member.name }}
              </h3>
              <p class="font-medium" :class="roleClasses">{{ member.role }}</p>
            </CardHeader>
            
            <CardContent>
              <!-- Enhanced Skills -->
              <div class="flex flex-wrap gap-2 mb-4 neon:neon-glow">
                <Badge
                  v-for="skill in member.skills"
                  :key="skill"
                  :variant="badgeVariant"
                  class="text-xs hover-scale transition-transform duration-200 neon:badge neon:neon-outline neon:neon-glow"
                >
                  {{ skill }}
                </Badge>
              </div>
              
              <!-- Bio with better typography -->
              <p class="text-sm mb-4 leading-relaxed neon:neon-text" :class="bioClasses">{{ member.bio }}</p>
              
              <!-- Enhanced Social Links -->
              <div class="flex justify-center space-x-4 neon:neon-glow">
                <a
                  v-if="member.github"
                  :href="member.github"
                  target="_blank"
                  class="p-2 rounded-full transition-all duration-300 hover-lift"
                  :class="socialLinkClasses"
                >
                  <Github class="h-5 w-5" />
                </a>
                <a
                  v-if="member.linkedin"
                  :href="member.linkedin"
                  target="_blank"
                  class="p-2 rounded-full transition-all duration-300 hover-lift"
                  :class="socialLinkClasses"
                >
                  <Linkedin class="h-5 w-5" />
                </a>
                <a
                  v-if="member.twitter"
                  :href="member.twitter"
                  target="_blank"
                  class="p-2 rounded-full transition-all duration-300 hover-lift"
                  :class="socialLinkClasses"
                >
                  <Twitter class="h-5 w-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Enhanced Team Stats -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
        class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      >
        <div 
          v-for="(stat, index) in teamStats" 
          :key="stat.label"
          class="text-center p-4 rounded-lg transition-all duration-300 hover-scale"
          :class="statCardClasses"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: 1000 + index * 100 } }"
        >
          <div class="text-2xl md:text-3xl font-bold mb-1 neon:neon-glow" :class="statNumberClasses">{{ stat.value }}</div>
          <div class="text-sm neon:neon-text" :class="statLabelClasses">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Github, Linkedin, Twitter } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'

// Get current theme
const currentTheme = computed(() => {
  if (document.documentElement.classList.contains('cyberpunk')) return 'cyberpunk'
  if (document.documentElement.classList.contains('emerald')) return 'emerald'
  if (document.documentElement.classList.contains('neon')) return 'neon'
  if (document.documentElement.classList.contains('light')) return 'light'
  return 'dark'
})

// Theme-based computed properties
const backgroundClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-900 to-green-800 text-amber-100'
    case 'neon':
      return 'bg-gradient-to-br from-gray-900 to-purple-900 text-cyan-100'
    case 'light':
      return 'bg-white text-gray-900'
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

const badgeVariant = computed(() => {
  return currentTheme.value === 'light' ? 'secondary' : 'outline'
})

const avatarClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gradient-to-br from-cyan-500 to-green-500'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-500 to-amber-500'
    case 'neon':
      return 'bg-gradient-to-br from-purple-500 to-pink-500'
    case 'light':
      return 'bg-gradient-to-br from-blue-400 to-purple-600'
    default:
      return 'bg-gradient-to-br from-blue-500 to-purple-600'
  }
})

const avatarGlow = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gradient-to-br from-cyan-400/50 to-green-400/50'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-400/50 to-amber-400/50'
    case 'neon':
      return 'bg-gradient-to-br from-purple-400/50 to-pink-400/50'
    default:
      return 'bg-gradient-to-br from-blue-400/50 to-purple-400/50'
  }
})

const statusIndicatorClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-green-500 border-black text-black'
    case 'emerald':
      return 'bg-amber-500 border-emerald-900 text-emerald-900'
    case 'neon':
      return 'bg-cyan-500 border-gray-900 text-gray-900'
    case 'light':
      return 'bg-green-500 border-white text-white'
    default:
      return 'bg-green-500 border-gray-900 text-white'
  }
})

const nameClasses = computed(() => {
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

const roleClasses = computed(() => {
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

const bioClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-300'
    case 'emerald':
      return 'text-amber-300'
    case 'neon':
      return 'text-cyan-300'
    case 'light':
      return 'text-gray-600'
    default:
      return 'text-gray-300'
  }
})

const socialLinkClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-400 hover:text-green-400 hover:bg-cyan-400/20'
    case 'emerald':
      return 'text-emerald-400 hover:text-amber-400 hover:bg-emerald-400/20'
    case 'neon':
      return 'text-purple-400 hover:text-pink-400 hover:bg-purple-400/20'
    case 'light':
      return 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
    default:
      return 'text-gray-400 hover:text-white hover:bg-gray-700'
  }
})

const statCardClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-900/20 border border-cyan-500/30'
    case 'emerald':
      return 'bg-emerald-900/20 border border-emerald-500/30'
    case 'neon':
      return 'bg-purple-900/20 border border-purple-500/30'
    case 'light':
      return 'bg-gray-50 border border-gray-200'
    default:
      return 'bg-gray-800/50 border border-gray-700'
  }
})

const statNumberClasses = computed(() => {
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

const statLabelClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'text-cyan-300'
    case 'emerald':
      return 'text-amber-300'
    case 'neon':
      return 'text-purple-300'
    case 'light':
      return 'text-gray-600'
    default:
      return 'text-gray-400'
  }
})

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Full-Stack Developer & Team Lead",
    initials: "AC",
    skills: ["React", "Node.js", "Python", "AWS"],
    bio: "Passionate about building scalable web applications and leading teams to success.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    initials: "SJ",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    bio: "Creating beautiful and intuitive user experiences that solve real problems.",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Backend Developer",
    initials: "MR",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    bio: "Building robust and efficient backend systems that power amazing applications.",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    id: 4,
    name: "Emily Zhang",
    role: "Frontend Developer",
    initials: "EZ",
    skills: ["Vue.js", "TypeScript", "Tailwind", "Animation"],
    bio: "Bringing designs to life with clean code and smooth animations.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: 5,
    name: "David Kim",
    role: "DevOps Engineer",
    initials: "DK",
    skills: ["Kubernetes", "CI/CD", "Monitoring", "Security"],
    bio: "Ensuring our applications run smoothly and securely in production.",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
]

const teamStats = [
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '24/7', label: 'Dedication' },
  { value: '100%', label: 'Team Spirit' }
]
</script>
