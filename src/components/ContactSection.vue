<template>
  <section id="contact" class="py-20 relative overflow-hidden transition-all duration-500" :class="contactSectionBackground">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
    <div class="absolute inset-0 bg-grid-slate-700 opacity-20"></div>
    
    <!-- Theme-specific background effects -->
    <div v-if="currentTheme === 'neon'" class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
    </div>
    
    <div v-if="currentTheme === 'cyberpunk'" class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/3 left-1/3 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
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
          Let's <span class="text-transparent bg-clip-text bg-gradient-to-r" :class="gradientTextClasses">Connect</span>
        </h2>
        <p class="text-xl max-w-2xl mx-auto" :class="subtitleClasses">
          Ready to collaborate or have questions about our project? We'd love to hear from you!
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
          >
            <Card 
              :variant="cardVariant"
              :interactive="true"
              :animated-border="true"
              class="h-full"
            >
              <CardContent class="p-8">
                <h3 class="text-2xl font-semibold mb-6" :class="cardTitleClasses">Get in Touch</h3>
                
                <!-- Contact Methods -->
                <div class="space-y-6 mb-8">
                  <div
                    v-for="(contact, index) in contactMethods"
                    :key="contact.type"
                    v-motion
                    :initial="{ opacity: 0, x: -20 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 200 + index * 100 } }"
                    class="flex items-center space-x-4 group transition-all duration-300 hover:scale-105"
                  >
                    <div class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg" :class="contact.iconBg">
                      <component :is="contact.icon" class="h-6 w-6" :class="contact.iconColor" />
                    </div>
                    <div>
                      <p class="font-medium" :class="contactLabelClasses">{{ contact.label }}</p>
                      <a 
                        :href="contact.href" 
                        class="transition-colors duration-300 hover:underline"
                        :class="contactValueClasses"
                        :aria-label="`Contact us via ${contact.label}`"
                      >
                        {{ contact.value }}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Availability Status -->
                <div class="p-4 rounded-lg mb-6" :class="statusCardClasses">
                  <div class="flex items-center space-x-3">
                    <div class="relative">
                      <div class="w-3 h-3 rounded-full animate-pulse" :class="statusIndicatorClasses"></div>
                      <div class="absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75" :class="statusIndicatorClasses"></div>
                    </div>
                    <div>
                      <p class="font-medium text-sm" :class="statusTextClasses">{{ availabilityStatus.title }}</p>
                      <p class="text-xs opacity-80" :class="statusTextClasses">{{ availabilityStatus.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Social Links -->
                <div>
                  <h4 class="text-lg font-medium mb-4" :class="socialTitleClasses">Follow Our Journey</h4>
                  <div class="flex space-x-4">
                    <a
                      v-for="social in socialLinks"
                      :key="social.name"
                      :href="social.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group hover-lift transform hover:scale-110"
                      :class="socialLinkClasses"
                      :aria-label="`Follow us on ${social.name}`"
                    >
                      <component :is="social.icon" class="h-5 w-5 transition-colors group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Enhanced Contact Form -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
          >
            <Card 
              :variant="cardVariant"
              :interactive="true"
              :animated-border="true"
              class="h-full"
            >
              <CardContent class="p-8">
                <h3 class="text-2xl font-semibold mb-6" :class="cardTitleClasses">Send us a Message</h3>
                
                <!-- Contact Form -->
                <form @submit.prevent="handleFormSubmit" class="space-y-6" novalidate>
                  <!-- Name Field -->
                  <div class="form-field">
                    <label 
                      for="contact-name" 
                      class="block text-sm font-medium mb-2"
                      :class="{ 'text-destructive': formErrors.name, [labelClasses]: !formErrors.name }"
                    >
                      Full Name *
                    </label>
                    <div class="relative">
                      <input
                        id="contact-name"
                        v-model="form.name"
                        type="text"
                        required
                        autocomplete="name"
                        :aria-invalid="formErrors.name ? 'true' : 'false'"
                        :aria-describedby="formErrors.name ? 'name-error' : 'name-help'"
                        class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        :class="[
                          formErrors.name 
                            ? 'border-destructive bg-destructive/5 text-destructive focus:ring-destructive focus:border-destructive' 
                            : inputClasses
                        ]"
                        placeholder="Enter your full name"
                        @blur="validateField('name')"
                        @input="clearError('name')"
                      />
                      
                      <!-- Field Status Icons -->
                      <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check v-if="!formErrors.name && form.name && isValidName" class="h-5 w-5 text-green-500" />
                        <X v-if="formErrors.name" class="h-5 w-5 text-destructive" />
                      </div>
                    </div>
                    
                    <!-- Error Message -->
                    <Transition
                      enter-active-class="transition duration-200 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-150 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <p v-if="formErrors.name" id="name-error" class="mt-2 text-sm text-destructive flex items-center">
                        <AlertCircle class="h-4 w-4 mr-1" />
                        {{ formErrors.name }}
                      </p>
                    </Transition>
                    
                    <p v-if="!formErrors.name" id="name-help" class="mt-1 text-xs" :class="helpTextClasses">
                      Your name will help us personalize our response
                    </p>
                  </div>

                  <!-- Email Field -->
                  <div class="form-field">
                    <label 
                      for="contact-email" 
                      class="block text-sm font-medium mb-2"
                      :class="{ 'text-destructive': formErrors.email, [labelClasses]: !formErrors.email }"
                    >
                      Email Address *
                    </label>
                    <div class="relative">
                      <input
                        id="contact-email"
                        v-model="form.email"
                        type="email"
                        required
                        autocomplete="email"
                        :aria-invalid="formErrors.email ? 'true' : 'false'"
                        :aria-describedby="formErrors.email ? 'email-error' : 'email-help'"
                        class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        :class="[
                          formErrors.email 
                            ? 'border-destructive bg-destructive/5 text-destructive focus:ring-destructive focus:border-destructive' 
                            : inputClasses
                        ]"
                        placeholder="your.email@example.com"
                        @blur="validateField('email')"
                        @input="clearError('email')"
                      />
                      
                      <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check v-if="!formErrors.email && form.email && isValidEmail" class="h-5 w-5 text-green-500" />
                        <X v-if="formErrors.email" class="h-5 w-5 text-destructive" />
                      </div>
                    </div>
                    
                    <Transition
                      enter-active-class="transition duration-200 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-150 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <p v-if="formErrors.email" id="email-error" class="mt-2 text-sm text-destructive flex items-center">
                        <AlertCircle class="h-4 w-4 mr-1" />
                        {{ formErrors.email }}
                      </p>
                    </Transition>
                    
                    <p v-if="!formErrors.email" id="email-help" class="mt-1 text-xs" :class="helpTextClasses">
                      We'll never share your email with third parties
                    </p>
                  </div>

                  <!-- Subject Field -->
                  <div class="form-field">
                    <label 
                      for="contact-subject" 
                      class="block text-sm font-medium mb-2"
                      :class="labelClasses"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      v-model="form.subject"
                      class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="inputClasses"
                      @change="clearError('subject')"
                    >
                      <option value="">Select a topic</option>
                      <option value="collaboration">Collaboration Opportunity</option>
                      <option value="hiring">Hiring Inquiry</option>
                      <option value="project">Project Discussion</option>
                      <option value="feedback">Feedback</option>
                      <option value="general">General Question</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <!-- Message Field -->
                  <div class="form-field">
                    <label 
                      for="contact-message" 
                      class="block text-sm font-medium mb-2"
                      :class="{ 'text-destructive': formErrors.message, [labelClasses]: !formErrors.message }"
                    >
                      Message *
                    </label>
                    <div class="relative">
                      <textarea
                        id="contact-message"
                        v-model="form.message"
                        required
                        rows="5"
                        maxlength="1000"
                        :aria-invalid="formErrors.message ? 'true' : 'false'"
                        :aria-describedby="formErrors.message ? 'message-error' : 'message-help'"
                        class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
                        :class="[
                          formErrors.message 
                            ? 'border-destructive bg-destructive/5 text-destructive focus:ring-destructive focus:border-destructive' 
                            : inputClasses
                        ]"
                        placeholder="Tell us about your project, collaboration idea, or any questions you have..."
                        @blur="validateField('message')"
                        @input="clearError('message')"
                      ></textarea>
                      
                      <!-- Character counter -->
                      <div class="absolute bottom-3 right-3 text-xs" :class="helpTextClasses">
                        {{ form.message.length }}/1000
                      </div>
                    </div>
                    
                    <Transition
                      enter-active-class="transition duration-200 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-150 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <p v-if="formErrors.message" id="message-error" class="mt-2 text-sm text-destructive flex items-center">
                        <AlertCircle class="h-4 w-4 mr-1" />
                        {{ formErrors.message }}
                      </p>
                    </Transition>
                    
                    <p v-if="!formErrors.message" id="message-help" class="mt-1 text-xs" :class="helpTextClasses">
                      Be as detailed as possible to help us provide the best response
                    </p>
                  </div>

                  <!-- Privacy Consent -->
                  <div class="form-field">
                    <div class="flex items-start space-x-3">
                      <div class="relative">
                        <input
                          id="contact-consent"
                          v-model="form.consent"
                          type="checkbox"
                          required
                          class="sr-only"
                          @change="clearError('consent')"
                        />
                        <div
                          @click="form.consent = !form.consent"
                          @keydown.space.prevent="form.consent = !form.consent"
                          class="w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200"
                          :class="[
                            form.consent 
                              ? checkboxActiveClasses
                              : checkboxInactiveClasses,
                            formErrors.consent ? 'border-destructive' : ''
                          ]"
                          role="checkbox"
                          :aria-checked="form.consent"
                          tabindex="0"
                        >
                          <Check v-if="form.consent" class="h-3 w-3" />
                        </div>
                      </div>
                      <label for="contact-consent" class="text-sm cursor-pointer" :class="labelClasses">
                        I agree to the 
                        <a href="#" class="text-primary hover:text-primary/80 underline" @click.prevent="openPrivacyPolicy">Privacy Policy</a> 
                        and 
                        <a href="#" class="text-primary hover:text-primary/80 underline" @click.prevent="openTermsOfService">Terms of Service</a>
                      </label>
                    </div>
                    
                    <Transition
                      enter-active-class="transition duration-200 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-150 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <p v-if="formErrors.consent" class="mt-2 text-sm text-destructive flex items-center ml-8">
                        <AlertCircle class="h-4 w-4 mr-1" />
                        {{ formErrors.consent }}
                      </p>
                    </Transition>
                  </div>

                  <!-- Form Actions -->
                  <div class="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      type="submit" 
                      :disabled="isSubmitting || !isFormValid"
                      class="flex-1 relative overflow-hidden group"
                      size="lg"
                    >
                      <span v-if="!isSubmitting" class="flex items-center justify-center">
                        <Send class="mr-2 h-5 w-5" />
                        Send Message
                      </span>
                      <span v-else class="flex items-center justify-center">
                        <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </span>
                      
                      <!-- Success ripple effect -->
                      <div v-if="submitSuccess" class="absolute inset-0 bg-green-500 animate-ping"></div>
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      @click="resetForm"
                      :disabled="isSubmitting"
                      size="lg"
                    >
                      <RotateCcw class="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>

                  <!-- Success/Error Messages -->
                  <Transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="transform translate-y-4 opacity-0"
                    enter-to-class="transform translate-y-0 opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="transform translate-y-0 opacity-100"
                    leave-to-class="transform translate-y-4 opacity-0"
                  >
                    <div v-if="submitMessage" class="mt-4">
                      <div 
                        :class="[
                          'p-4 rounded-lg border flex items-start space-x-3',
                          submitSuccess ? successMessageClasses : errorMessageClasses
                        ]"
                      >
                        <component 
                          :is="submitSuccess ? CheckCircle : XCircle" 
                          class="h-5 w-5 flex-shrink-0 mt-0.5" 
                        />
                        <div>
                          <p class="font-medium">{{ submitMessage.title }}</p>
                          <p class="text-sm mt-1">{{ submitMessage.description }}</p>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Hackathon Info -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
          class="mt-16 text-center"
        >
          <Card 
            :variant="cardVariant"
            :interactive="true"
            :animated-border="true"
            class="max-w-4xl mx-auto"
          >
            <CardContent class="p-8">
              <h3 class="text-2xl font-bold mb-4" :class="hackathonTitleClasses">Hackathon 2025</h3>
              <p class="mb-6" :class="hackathonTextClasses">
                Join us at the biggest tech event of the year! Follow our progress and cheer us on.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" class="btn-glow">
                  <Calendar class="mr-2 h-4 w-4" />
                  March 15-17, 2025
                </Button>
                <Button variant="outline" class="btn-glow">
                  <Trophy class="mr-2 h-4 w-4" />
                  Track Our Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Success Toast Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div
        v-if="showSuccessToast"
        class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg backdrop-blur-sm max-w-sm"
        :class="toastClasses"
        role="alert"
        aria-live="polite"
      >
        <div class="flex items-center space-x-3">
          <CheckCircle class="h-5 w-5 text-green-400 flex-shrink-0" />
          <div>
            <p class="font-medium text-sm">Message sent successfully!</p>
            <p class="text-xs opacity-80 mt-1">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { 
  Check, X, AlertCircle, Send, RotateCcw, CheckCircle, XCircle,
  Mail, MessageCircle, MapPin, Calendar, Trophy, Github, Linkedin, Twitter, Instagram
} from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'

const emit = defineEmits(['submit'])

// Reactive form state
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false
})

const formErrors = reactive({
  name: '',
  email: '',
  message: '',
  consent: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitMessage = ref(null)
const showSuccessToast = ref(false)

// Get current theme
const currentTheme = computed(() => {
  if (document.documentElement.classList.contains('cyberpunk')) return 'cyberpunk'
  if (document.documentElement.classList.contains('emerald')) return 'emerald'
  if (document.documentElement.classList.contains('neon')) return 'neon'
  if (document.documentElement.classList.contains('light')) return 'light'
  return 'dark'
})

// Validation computed properties
const isValidName = computed(() => {
  return form.name.trim().length >= 2
})

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(form.email)
})

const isFormValid = computed(() => {
  return form.name && 
         isValidEmail.value && 
         form.message && 
         form.consent &&
         Object.values(formErrors).every(error => !error)
})

// Theme-based styling
const contactSectionBackground = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-black text-cyan-100'
    case 'emerald':
      return 'bg-emerald-900 text-amber-100'
    case 'neon':
      return 'bg-gray-900 text-cyan-100'
    case 'light':
      return 'bg-gray-100 text-gray-900'
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

const cardTitleClasses = computed(() => headingClasses.value)

const inputClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'border-cyan-500/30 bg-gray-900/50 text-cyan-100 focus:ring-cyan-500 focus:border-cyan-400 placeholder-cyan-300/50'
    case 'emerald':
      return 'border-emerald-500/30 bg-emerald-900/50 text-amber-100 focus:ring-emerald-500 focus:border-emerald-400 placeholder-amber-200/50'
    case 'neon':
      return 'border-purple-500/30 bg-gray-900/50 text-cyan-100 focus:ring-purple-500 focus:border-purple-400 placeholder-cyan-200/50'
    case 'light':
      return 'border-input bg-background text-foreground focus:ring-primary focus:border-primary hover:border-primary/50'
    default:
      return 'border-input bg-background text-foreground focus:ring-primary focus:border-primary hover:border-primary/50'
  }
})

const labelClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-gray-900'
    default:
      return 'text-foreground'
  }
})

const helpTextClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-gray-500'
    default:
      return 'text-muted-foreground'
  }
})

const checkboxActiveClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-600 border-cyan-500 text-black'
    case 'emerald':
      return 'bg-emerald-600 border-emerald-500 text-white'
    case 'neon':
      return 'bg-purple-600 border-purple-500 text-white'
    default:
      return 'bg-primary border-primary text-primary-foreground'
  }
})

const checkboxInactiveClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'border-input hover:border-primary'
    default:
      return 'border-input hover:border-primary'
  }
})

const successMessageClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bg-green-50 border-green-200 text-green-800'
    default:
      return 'bg-green-900/20 border-green-500/30 text-green-200'
  }
})

const errorMessageClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bg-red-50 border-red-200 text-red-800'
    default:
      return 'bg-red-900/20 border-red-500/30 text-red-200'
  }
})

const toastClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bg-white border border-gray-200 text-gray-900'
    default:
      return 'bg-gray-800 border border-gray-700 text-white'
  }
})

// Contact data
const contactMethods = computed(() => [
  {
    type: 'email',
    label: 'Email',
    value: 'team@blitz.dev',
    href: 'mailto:team@blitz.dev',
    icon: Mail,
    iconBg: 'bg-blue-600',
    iconColor: 'text-white'
  },
  {
    type: 'discord',
    label: 'Discord',
    value: 'TeamBlitz#2025',
    href: '#',
    icon: MessageCircle,
    iconBg: 'bg-indigo-600',
    iconColor: 'text-white'
  },
  {
    type: 'location',
    label: 'Location',
    value: 'Global Remote Team',
    href: '#',
    icon: MapPin,
    iconBg: 'bg-green-600',
    iconColor: 'text-white'
  }
])

const contactLabelClasses = computed(() => labelClasses.value)
const contactValueClasses = computed(() => {
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

const availabilityStatus = computed(() => ({
  title: 'Currently Available',
  description: 'We typically respond within 24 hours'
}))

const statusCardClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-cyan-900/20 border border-cyan-500/30'
    case 'emerald':
      return 'bg-emerald-900/20 border border-emerald-500/30'
    case 'neon':
      return 'bg-purple-900/20 border border-purple-500/30'
    case 'light':
      return 'bg-green-50 border border-green-200'
    default:
      return 'bg-green-900/20 border border-green-500/30'
  }
})

const statusIndicatorClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bg-green-500'
    default:
      return 'bg-green-400'
  }
})

const statusTextClasses = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'text-green-800'
    default:
      return 'text-green-200'
  }
})

const socialTitleClasses = computed(() => labelClasses.value)
const socialLinkClasses = computed(() => {
  switch (currentTheme.value) {
    case 'cyberpunk':
      return 'bg-gray-800 hover:bg-cyan-600 text-cyan-400 hover:text-black border border-cyan-500/30'
    case 'emerald':
      return 'bg-emerald-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30'
    case 'neon':
      return 'bg-gray-800 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/30'
    case 'light':
      return 'bg-gray-100 hover:bg-gray-600 text-gray-600 hover:text-white border border-gray-200'
    default:
      return 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600'
  }
})

const hackathonTitleClasses = computed(() => headingClasses.value)
const hackathonTextClasses = computed(() => subtitleClasses.value)

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' }
]

// Form validation methods
const validateField = (field) => {
  formErrors[field] = ''
  
  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        formErrors.name = 'Name is required'
      } else if (form.name.trim().length < 2) {
        formErrors.name = 'Name must be at least 2 characters'
      } else if (form.name.trim().length > 50) {
        formErrors.name = 'Name must not exceed 50 characters'
      }
      break
      
    case 'email':
      if (!form.email.trim()) {
        formErrors.email = 'Email is required'
      } else if (!isValidEmail.value) {
        formErrors.email = 'Please enter a valid email address'
      }
      break
      
    case 'message':
      if (!form.message.trim()) {
        formErrors.message = 'Message is required'
      } else if (form.message.trim().length < 10) {
        formErrors.message = 'Message must be at least 10 characters'
      } else if (form.message.length > 1000) {
        formErrors.message = 'Message must not exceed 1000 characters'
      }
      break
      
    case 'consent':
      if (!form.consent) {
        formErrors.consent = 'You must agree to the terms to continue'
      }
      break
  }
}

const clearError = (field) => {
  if (formErrors[field]) {
    formErrors[field] = ''
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('message')
  validateField('consent')
  
  return Object.values(formErrors).every(error => !error)
}

// Form submission
const handleFormSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitMessage.value = null
  
  try {
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Emit form data
    emit('submit', { ...form })
    
    submitSuccess.value = true
    submitMessage.value = {
      title: 'Message sent successfully!',
      description: 'Thank you for reaching out. We\'ll get back to you within 24 hours.'
    }
    
    // Show success toast
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 5000)
    
    // Reset form after success
    setTimeout(() => {
      resetForm()
      submitMessage.value = null
    }, 3000)
    
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = {
      title: 'Failed to send message',
      description: 'There was an error sending your message. Please try again or contact us directly.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (typeof form[key] === 'boolean') {
      form[key] = false
    } else {
      form[key] = ''
    }
  })
  
  Object.keys(formErrors).forEach(key => {
    formErrors[key] = ''
  })
  
  submitMessage.value = null
  submitSuccess.value = false
}

// Additional handlers
const openPrivacyPolicy = () => {
  // Simulate opening privacy policy
  console.log('Opening privacy policy...')
}

const openTermsOfService = () => {
  // Simulate opening terms of service
  console.log('Opening terms of service...')
}
</script>

<style scoped>
/* Form-specific styles */
.form-field {
  @apply relative;
}

/* Focus styles for better accessibility */
input:focus,
textarea:focus,
select:focus {
  @apply ring-2 ring-primary/50 ring-offset-2;
}

/* Custom checkbox focus styles */
div[role="checkbox"]:focus {
  @apply ring-2 ring-primary/50 ring-offset-2;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .backdrop-blur-sm {
    backdrop-filter: none;
    background-color: hsl(var(--background));
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-ping {
    animation: none;
  }
}
</style>
