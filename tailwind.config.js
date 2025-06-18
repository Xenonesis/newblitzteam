/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    // Enable arbitrary value support for custom selectors
    matchVariant: true,
  },
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced color palette
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
        },
        glow: "var(--glow-color)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        '2xl': "var(--spacing-2xl)",
      },
      fontSize: {
        xs: ["var(--font-size-xs)", { lineHeight: "1.4" }],
        sm: ["var(--font-size-sm)", { lineHeight: "1.45" }],
        base: ["var(--font-size-base)", { lineHeight: "1.5" }],
        lg: ["var(--font-size-lg)", { lineHeight: "1.55" }],
        xl: ["var(--font-size-xl)", { lineHeight: "1.6" }],
        '2xl': ["var(--font-size-2xl)", { lineHeight: "1.65" }],
        '3xl': ["var(--font-size-3xl)", { lineHeight: "1.7" }],
        '4xl': ["var(--font-size-4xl)", { lineHeight: "1.1" }],
        '5xl': ["var(--font-size-5xl)", { lineHeight: "1" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },
      zIndex: {
        dropdown: "var(--z-dropdown)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
        toast: "var(--z-toast)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Enhanced animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { backgroundPosition: "1000px 0", opacity: "0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)"
          },
          "50%": {
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.2)"
          },
        },
        "typewriter": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        "blink-cursor": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Enhanced animations
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "shimmer": "shimmer 2s infinite linear",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typewriter": "typewriter 3s steps(40, end), blink-cursor 0.75s step-end infinite",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        '2xl': "40px",
      },
      backdropSaturate: {
        25: ".25",
        50: ".5",
        75: ".75",
        100: "1",
        125: "1.25",
        150: "1.5",
        200: "2",
      },
      boxShadow: {
        glow: "0 0 20px var(--glow-color)",
        "glow-lg": "0 0 40px var(--glow-color)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace"
        ],
      },
    },
  },
  plugins: [
    // Custom plugin for neon variant and enhanced utilities
    function({ addUtilities, addVariant, theme, addComponents }) {
      // Add neon variant
      addVariant('neon', '.neon &')
      
      // Glass morphism utilities
      addUtilities({
        '.glass': {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
          border: '1px solid var(--glass-border)',
        },
        '.glass-strong': {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          border: '1px solid var(--glass-border)',
        },
      })

      // Enhanced interaction utilities
      addUtilities({
        '.hover-lift': {
          transition: 'transform 300ms ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
        '.hover-scale': {
          transition: 'transform 300ms ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        '.hover-glow': {
          transition: 'box-shadow 300ms ease',
          '&:hover': {
            boxShadow: '0 0 20px var(--glow-color)',
          },
        },
      })

      // Typography utilities
      addUtilities({
        '.text-gradient': {
          background: 'linear-gradient(to right, rgb(59 130 246), rgb(139 92 246), rgb(99 102 241))',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
        },
      })

      // Touch-friendly utilities
      addUtilities({
        '.touch-target': {
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      })

      // Neon-specific utilities
      addUtilities({
        '.neon-glow': {
          textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        },
        '.neon-border': {
          boxShadow: '0 0 5px currentColor, inset 0 0 5px currentColor',
        },
        '.neon-card': {
          background: 'rgba(16, 18, 27, 0.8)',
          border: '1px solid rgba(139, 92, 246, 0.5)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)',
        },
      })
    }
  ],
}
