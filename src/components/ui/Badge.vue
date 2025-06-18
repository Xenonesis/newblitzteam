<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      variants[variant],
      'neon:badge neon:neon-outline neon:transition-all neon:duration-300'
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'secondary', 'destructive', 'outline'].includes(value)
  }
})

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80 neon:bg-gradient-to-r neon:from-purple-600 neon:to-pink-600 neon:text-white neon:shadow-[0_0_10px_rgba(139,92,246,0.5)] neon:badge neon:neon-outline neon:neon-glow',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 neon:bg-gray-800 neon:text-cyan-300 neon:border neon:border-cyan-500/50 neon:shadow-[0_0_8px_rgba(6,182,212,0.4)] neon:badge neon:neon-outline neon:neon-glow',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 neon:badge neon:neon-outline neon:neon-glow',
  outline: 'text-foreground border border-input neon:border-purple-500/50 neon:text-cyan-300 neon:shadow-[0_0_5px_rgba(139,92,246,0.3)] neon:badge neon:neon-outline neon:neon-glow'
}
</script>
