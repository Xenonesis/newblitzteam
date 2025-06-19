import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'

// Define available themes
const themes = ['dark', 'neon', 'light', 'cyberpunk', 'emerald'];

// Function to set the theme
export function setTheme(theme) {
  // Remove existing theme classes
  document.documentElement.classList.remove(...themes);
  // Add the selected theme class
  document.documentElement.classList.add(theme);
  // Save the theme preference
  localStorage.setItem('theme', theme);
}

// Check for saved theme preference or use 'light' as default
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme && themes.includes(savedTheme) ? savedTheme : 'light';

// Set the initial theme
setTheme(initialTheme);

const app = createApp(App)
app.use(MotionPlugin)
app.mount('#app')