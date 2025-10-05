# Netflix-Inspired Skills Portfolio

A modern, responsive React-based portfolio showcasing technical skills with a Netflix-inspired dark theme. This project replicates the skills section design from [sumanthsamala.com/skills](https://sumanthsamala.com/skills) with enhanced interactivity and content management capabilities.

## 🚀 Features

- **Netflix-Inspired Design**: Dark theme with red accents, smooth animations, and modern typography
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Interactive Skills Grid**: Hover effects, animations, and visual proficiency indicators
- **Content Management**: DatoCMS integration with fallback to mock data
- **Search & Filter**: Real-time search and category filtering
- **Modern Tech Stack**: React 18, Vite, Tailwind CSS, and React Icons
- **Performance Optimized**: Fast loading with Vite's hot module replacement

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom Netflix theme
- **Icons**: React Icons (Font Awesome, Simple Icons)
- **Content Management**: DatoCMS (with mock data fallback)
- **Build Tool**: Vite with hot module replacement
- **Package Manager**: npm

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- npm (comes with Node.js)

### Setup Instructions

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd netflix-skills-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your DatoCMS API key:
   ```
   VITE_DATOCMS_API_KEY=your-datocms-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🎨 Customization

### Adding New Skills

1. **Using Mock Data** (Recommended for development):
   Edit `src/lib/skills.json` and add new skill objects:
   ```json
   {
     "id": 21,
     "category": "Frontend",
     "technologyName": "Svelte",
     "icon": "svelte",
     "proficiency": 75,
     "description": "Modern frontend framework with compile-time optimizations"
   }
   ```

2. **Using DatoCMS** (Production):
   - Set up a DatoCMS project
   - Create a "Skill" model with fields: category, technologyName, icon, proficiency, description
   - Add your API key to `.env`
   - Skills will be automatically fetched from DatoCMS

### Styling Customization

The Netflix theme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      netflixRed: '#E50914',        // Primary red color
      netflixDark: '#141414',       // Dark background
      netflixGray: '#333333',       // Card backgrounds
      netflixLightGray: '#666666',  // Text colors
    }
  }
}
```

### Adding New Icons

1. Import the icon from `react-icons` in `src/lib/iconMapping.js`
2. Add it to the `iconMap` object
3. Use the icon name in your skills data

## 📁 Project Structure

```
netflix-skills-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── SkillCard.jsx       # Individual skill card
│   │   └── Footer.jsx          # Footer component
│   ├── lib/
│   │   ├── skills.json         # Mock skills data
│   │   ├── datoCmsClient.js    # DatoCMS integration
│   │   └── iconMapping.js      # Icon mapping utilities
│   ├── pages/
│   │   └── Skills.jsx          # Main skills page
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles and Tailwind
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🌐 DatoCMS Setup (Optional)

If you want to use DatoCMS for content management:

1. **Create a DatoCMS account** at [datocms.com](https://www.datocms.com/)

2. **Create a new project** and set up the following model:

   **Model Name**: `Skill`
   
   **Fields**:
   - `category` (Single-line string) - Required
   - `technologyName` (Single-line string) - Required  
   - `icon` (File/Image) - Required
   - `proficiency` (Integer) - Required (0-100)
   - `description` (Multi-line text) - Optional

3. **Get your API key** from Project Settings > API tokens

4. **Add the API key** to your `.env` file

5. **Add some skills** in the DatoCMS admin panel

## 🎨 Design Features

### Netflix-Inspired Elements
- **Dark Theme**: Black backgrounds with gray cards
- **Red Accents**: Netflix red (#E50914) for highlights and CTAs
- **Typography**: Inter font family for modern, clean look
- **Animations**: Smooth hover effects and transitions
- **Grid Layout**: Responsive card-based layout

### Interactive Elements
- **Hover Effects**: Cards scale and glow on hover
- **Search**: Real-time filtering by technology name or category
- **Category Filter**: Filter skills by technology category
- **Progress Bars**: Visual proficiency indicators with color coding
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [sumanthsamala.com/skills](https://sumanthsamala.com/skills)
- Netflix for the design inspiration
- React and Vite teams for the excellent tooling
- Tailwind CSS for the utility-first CSS framework

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository or contact the maintainers.

---

**Happy coding! 🚀**
