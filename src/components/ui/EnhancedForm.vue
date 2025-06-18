<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
    <!-- Form Fields -->
    <div class="space-y-4">
      <!-- Name Field -->
      <div class="form-field">
        <label 
          for="name" 
          class="block text-sm font-medium text-foreground mb-2"
          :class="{ 'text-destructive': errors.name }"
        >
          Full Name *
        </label>
        <div class="relative">
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            :aria-invalid="errors.name ? 'true' : 'false'"
            :aria-describedby="errors.name ? 'name-error' : 'name-help'"
            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="[
              errors.name 
                ? 'border-destructive bg-destructive/5 text-destructive focus:ring-destructive focus:border-destructive' 
                : 'border-input bg-background text-foreground focus:ring-primary focus:border-primary hover:border-primary/50'
            ]"
            placeholder="Enter your full name"
            @blur="validateField('name')"
            @input="clearError('name')"
          />
          
          <!-- Field Icons -->
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Check v-if="!errors.name && form.name" class="h-5 w-5 text-green-500" />
            <X v-if="errors.name" class="h-5 w-5 text-destructive" />
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
          <p v-if="errors.name" id="name-error" class="mt-2 text-sm text-destructive flex items-center">
            <AlertCircle class="h-4 w-4 mr-1" />
            {{ errors.name }}
          </p>
        </Transition>
        
        <!-- Help Text -->
        <p v-if="!errors.name" id="name-help" class="mt-1 text-xs text-muted-foreground">
          Your name will be displayed in our team directory
        </p>
      </div>

      <!-- Email Field -->
      <div class="form-field">
        <label 
          for="email" 
          class="block text-sm font-medium text-foreground mb-2"
          :class="{ 'text-destructive': errors.email }"
        >
          Email Address *
        </label>
        <div class="relative">
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :aria-invalid="errors.email ? 'true' : 'false'"
            :aria-describedby="errors.email ? 'email-error' : 'email-help'"
            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="[
              errors.email 
                ? 'border-destructive bg-destructive/5 text-destructive focus:ring-destructive focus:border-destructive' 
                : 'border-input bg-background text-foreground focus:ring-primary focus:border-primary hover:border-primary/50'
            ]"
            placeholder="your.email@example.com"
            @blur="validateField('email')"
            @input="clearError('email')"
          />
          
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Check v-if="!errors.email && isValidEmail" class="h-5 w-5 text-green-500" />
            <X v-if="errors.email" class="h-5 w-5 text-destructive" />
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
          <p v-if="errors.email" id="email-error" class="mt-2 text-sm text-destructive flex items-center">
            <AlertCircle class="h-4 w-4 mr-1" />
            {{ errors.email }}
          </p>
        </Transition>
        
        <p v-if="!errors.email" id="email-help" class="mt-1 text-xs text-muted-foreground">
          We'll never share your email with third parties
        </p>
      </div>

      <!-- Subject Field -->
      <div class="form-field">
        <label 
          for="subject" 
          class="block text-sm font-medium text-foreground mb-2"
        >
          Subject
        </label>
        <select
          id="subject"
          v-model="form.subject"
          class="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50"
          @change="clearError('subject')"
        >
          <option value="">Select a topic</option>
          <option value="collaboration">Collaboration Opportunity</option>
          <option value="hiring">Hiring Inquiry</option>
          <option value="project">Project Discussion</option>
          <option value="general">General Question</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>

      <!-- Message Field -->
      <div class="form-field">
        <label 
          for="message" 
          class="block text-sm font-medium text-foreground mb-2"
          :class="{ 'text-destructive': errors.message }"
        >
          Message *
        </label>
        <div class="relative">
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            :aria-invalid="errors.message ? 'true' : 'false'"
            :aria-describedby="errors.message ? 'message-error' : 'message-help'"
            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
            :class="[
              errors.message 
                ? 'border-destructive bg-destructive/5 text-destructive focus:ring-destructive focus:border-destructive' 
                : 'border-input bg-background text-foreground focus:ring-primary focus:border-primary hover:border-primary/50'
            ]"
            placeholder="Tell us about your project, collaboration idea, or any questions you have..."
            @blur="validateField('message')"
            @input="clearError('message')"
          ></textarea>
          
          <!-- Character counter -->
          <div class="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {{ form.message.length }}/500
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
          <p v-if="errors.message" id="message-error" class="mt-2 text-sm text-destructive flex items-center">
            <AlertCircle class="h-4 w-4 mr-1" />
            {{ errors.message }}
          </p>
        </Transition>
        
        <p v-if="!errors.message" id="message-help" class="mt-1 text-xs text-muted-foreground">
          Be as detailed as possible to help us provide the best response
        </p>
      </div>

      <!-- Consent Checkbox -->
      <div class="form-field">
        <div class="flex items-start space-x-3">
          <div class="relative">
            <input
              id="consent"
              v-model="form.consent"
              type="checkbox"
              required
              class="sr-only"
              @change="clearError('consent')"
            />
            <div
              @click="form.consent = !form.consent"
              class="w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200"
              :class="[
                form.consent 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-input hover:border-primary',
                errors.consent ? 'border-destructive' : ''
              ]"
              role="checkbox"
              :aria-checked="form.consent"
              tabindex="0"
              @keydown.space.prevent="form.consent = !form.consent"
            >
              <Check v-if="form.consent" class="h-3 w-3" />
            </div>
          </div>
          <label for="consent" class="text-sm text-foreground cursor-pointer">
            I agree to the 
            <a href="#" class="text-primary hover:text-primary/80 underline">Privacy Policy</a> 
            and 
            <a href="#" class="text-primary hover:text-primary/80 underline">Terms of Service</a>
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
          <p v-if="errors.consent" class="mt-2 text-sm text-destructive flex items-center ml-8">
            <AlertCircle class="h-4 w-4 mr-1" />
            {{ errors.consent }}
          </p>
        </Transition>
      </div>
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
            submitSuccess 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
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
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { 
  Check, X, AlertCircle, Send, RotateCcw, 
  CheckCircle, XCircle 
} from 'lucide-vue-next'
import Button from './Button.vue'

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
  consent: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitMessage = ref(null)

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(form.email)
})

const isFormValid = computed(() => {
  return form.name && 
         isValidEmail.value && 
         form.message && 
         form.consent &&
         Object.values(errors).every(error => !error)
})

const validateField = (field) => {
  errors[field] = ''
  
  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Name is required'
      } else if (form.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters'
      }
      break
      
    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Email is required'
      } else if (!isValidEmail.value) {
        errors.email = 'Please enter a valid email address'
      }
      break
      
    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required'
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters'
      } else if (form.message.length > 500) {
        errors.message = 'Message must not exceed 500 characters'
      }
      break
      
    case 'consent':
      if (!form.consent) {
        errors.consent = 'You must agree to the terms to continue'
      }
      break
  }
}

const clearError = (field) => {
  if (errors[field]) {
    errors[field] = ''
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('message')
  validateField('consent')
  
  return Object.values(errors).every(error => !error)
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitMessage.value = null
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Emit form data
    emit('submit', { ...form })
    
    submitSuccess.value = true
    submitMessage.value = {
      title: 'Message sent successfully!',
      description: 'Thank you for reaching out. We\'ll get back to you within 24 hours.'
    }
    
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
  
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  submitMessage.value = null
  submitSuccess.value = false
}
</script>

<style scoped>
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
</style>