# Vice Doll Template Manager

A beautiful, feature-rich template management application for content creators with **cloud storage integration**.

![React](https://img.shields.io/badge/React-19.2.6-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-38B2AC)
![Vite](https://img.shields.io/badge/Vite-7.3.2-purple)
![Supabase](https://img.shields.io/badge/Supabase-Cloud%20Storage-green)

## 🌟 Features

### ☁️ Cloud Storage (NEW!)
- **Automatic Upload**: Photos automatically upload to Supabase Storage
- **Fallback Mode**: Works offline with local storage
- **Cloud Indicator**: See status in top-right corner (🟢 Cloud / ⚪ Local)
- **Auto-cleanup**: Deleted photos removed from cloud
- **Public URLs**: Instant access to uploaded media

### 📋 Template Management
- Organize message templates by conversation stage
- Drag-and-drop reordering
- Private notes for each template
- Tag templates as "Teaser Photo" or "PPV Message"
- Color-coded categories
- Nested sub-categories

### 🎥 Video Guides
- Embed Google Drive videos with public links
- Add descriptions and timestamps
- Fullscreen viewing
- Expandable layout

### 🖼️ Example Photos
- Upload and organize photos
- Add descriptions
- Fullscreen preview
- Cloud badge for cloud-hosted images

### 🌍 Multi-Language
- English, Russian, Ukrainian
- Instant language switching
- Full UI translation

### 🎨 Dark/Light Theme
- Toggle theme in top-right
- Persists during session
- Beautiful animations

### 🔒 Admin System
- Simple password authentication
- Admin: Full edit/delete permissions
- View-only: Browse and copy content
- Password: `burmalda` (change in production!)

---

## 🚀 Quick Start

### 1️⃣ Installation

```bash
# Clone or download this project
cd vice-doll-template-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 2️⃣ Basic Usage (Without Cloud)

1. Click **🔒 Admin Login** (top-right)
2. Password: `burmalda`
3. Start adding templates, photos, and guides
4. All data stored locally in your browser

### 3️⃣ With Cloud Storage (Recommended)

Follow the detailed setup guide: **[CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)**

Quick summary:
1. Create free Supabase account (https://supabase.com)
2. Get API keys
3. Create `examples` and `guides` buckets
4. Add credentials to `.env.local`
5. See 🟢 **Cloud** indicator when connected!

---

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)** - Detailed cloud setup guide
- **[FEATURES.md](./FEATURES.md)** - Complete feature specifications
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solutions for common issues

---

## 🏗️ Project Structure

```
.
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles
│   ├── config/
│   │   └── supabase.ts         # Cloud storage configuration
│   └── utils/
│       └── cn.ts               # Utility functions
├── .env.example                # Environment template
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## 🔧 Setup Instructions

### Without Cloud Storage

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Login with password: `burmalda`
4. Start creating!

### With Cloud Storage

**Step 1: Create Supabase Account**
- Go to https://supabase.com
- Sign up (free)
- Create new project

**Step 2: Get API Keys**
- Settings → API
- Copy `Project URL` → `VITE_SUPABASE_URL`
- Copy `anon public` key → `VITE_SUPABASE_ANON_KEY`

**Step 3: Create Storage Buckets**
- Storage → Create bucket
- Name: `examples` (Public)
- Name: `guides` (Public)

**Step 4: Configure App**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Step 5: Verify**
- Start app: `npm run dev`
- Should see 🟢 **Cloud** indicator (top-right)

For detailed instructions: [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)

---

## 💻 Building for Production

```bash
# Build optimized production version
npm run build

# Preview production build
npm run preview
```

Output: `dist/index.html` (standalone HTML file)

---

## 🛠️ Technology Stack

### Frontend
- **React** 19.2.6 - UI framework
- **TypeScript** 5.9.3 - Type safety
- **Tailwind CSS** 4.1.17 - Styling
- **Framer Motion** - Smooth animations
- **Vite** 7.3.2 - Build tool

### Cloud & Backend
- **Supabase** - Storage (Google Cloud-backed)
- **@supabase/supabase-js** - SDK

### Icons
- **lucide-react** - Beautiful icons

---

## 🎯 Use Cases

### Content Creators
- Organize messaging strategies
- Store teaser photos
- Reference training videos
- Quick message templates

### Team Management
- Share standard responses
- Template libraries
- Training materials
- Best practices

### Personal Organization
- Chat automation
- Media storage
- Knowledge base
- Workflow automation

---

## 🔐 Security & Privacy

### Local Mode
✅ All data stays on your device
✅ No internet required
✅ No external dependencies

### Cloud Mode
✅ Data in your Supabase account
✅ Encrypted in transit (HTTPS)
✅ Public photos only (admin-controlled)

### Admin Password
⚠️ Default: `burmalda` (demo only)
🔒 Change for production:
- Edit `src/App.tsx`
- Find: `adminPasswordInput === 'burmalda'`
- Change to: `adminPasswordInput === 'your-password'`

---

## 📊 Performance

- **Bundle Size**: ~662KB (gzipped: ~187KB)
- **Load Time**: <2 seconds typical
- **Animations**: 60fps smooth
- **Mobile Optimized**: Responsive design

---

## 🤝 Contributing

This is a personal project. Feel free to:
- Fork and customize
- Report issues
- Suggest features
- Modify for your needs

---

## 📝 License

This project is provided as-is for personal and commercial use.

---

## 🆘 Troubleshooting

### Issue: Seeing "Local" instead of "Cloud"?
**Solution**: Follow [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)

### Issue: Photos not uploading?
**Solution**: Check browser console (F12) for errors. Verify Supabase configuration.

### Issue: Google Drive videos not playing?
**Solution**: Make sure video access is set to "Anyone with the link"

### Issue: Data disappeared?
**Solution**: If using local storage, check if browser cache was cleared

For more help: See documentation files above

---

## 🚀 Deployment

### Netlify (Recommended)
```bash
npm run build
# Drag dist/index.html to Netlify
```

### Vercel
```bash
npm run build
# Connect GitHub repo to Vercel
```

### Self-Hosted
```bash
npm run build
# Upload dist/index.html to your server
```

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Support

For help:
1. Read the documentation files (QUICKSTART.md, FEATURES.md)
2. Check browser console for error messages (F12)
3. Review environment variable setup
4. Verify Supabase configuration

---

## ✨ What's New

### v1.0.0 with Cloud Storage
- ☁️ Supabase Storage integration
- 📤 Automatic photo upload
- 🔄 Cloud fallback mode
- 🟢 Cloud status indicator
- 🗑️ Auto-cleanup on delete
- 📚 Complete documentation

---

## 🎉 Credits

Built with:
- React & TypeScript
- Tailwind CSS for beautiful UI
- Framer Motion for animations
- Supabase for cloud storage
- Vite for blazing fast development

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅

Enjoy using Vice Doll Template Manager! 🚀
