# Team Innovators - Hackathon Landing Page

A modern, responsive landing page for our hackathon team built with Vue.js, Shadcn UI components, and smooth animations using VueUse Motion.

## 🚀 Features

- **Modern Design**: Clean, professional design with a focus on user experience
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Beautiful animations and transitions using VueUse Motion
- **Component-Based**: Built with reusable Shadcn UI components
- **Team Showcase**: Dedicated section to showcase team members
- **Project Display**: Highlight your hackathon project with features and tech stack
- **Contact Form**: Interactive contact form for collaboration opportunities
- **Dark Mode Ready**: Prepared for dark mode implementation

## 🛠️ Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **VueUse Motion** - Animation library for Vue
- **Shadcn UI** - Beautiful, accessible UI components
- **Lucide Vue** - Beautiful & consistent icon toolkit

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Team Members
Edit the team members data in `src/components/TeamMembers.vue`:

```javascript
const teamMembers = [
  {
    id: 1,
    name: "Your Name",
    role: "Your Role",
    initials: "YN",
    skills: ["Skill1", "Skill2", "Skill3"],
    bio: "Your bio here...",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  }
  // Add more team members...
]
```

### Project Information
Update your project details in `src/components/ProjectShowcase.vue`:

- Change the project name, description, and features
- Update the tech stack icons and names
- Modify the project demo section

### Contact Information
Update contact details in `src/components/ContactSection.vue`:

- Change email addresses and social links
- Update location and Discord information
- Modify hackathon event details

### Styling
The project uses Tailwind CSS with custom CSS variables for theming. You can:

- Modify colors in `tailwind.config.js`
- Update CSS variables in `src/style.css`
- Add custom animations and styles

## 📱 Sections

1. **Hero Section**: Eye-catching introduction with team stats
2. **Team Members**: Showcase of all team members with skills and social links
3. **Project Showcase**: Detailed presentation of your hackathon project
4. **Contact Section**: Contact form and team information

## 🎯 Performance

- Optimized bundle size with Vite
- Lazy loading of components
- Efficient animations with VueUse Motion
- Responsive images and assets

## 🚀 Deployment

The project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: Deploy with Firebase CLI

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own hackathon team!

---

Built with ❤️ by Team Innovators for Hackathon 2024
