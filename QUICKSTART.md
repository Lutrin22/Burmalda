# Vice Doll Template Manager - Quick Start Guide

## Overview

Vice Doll Template Manager is a powerful app for managing chat templates, video guides, and example photos for content creators. It now includes **cloud storage support** for automatic backup of your media files.

## Key Features

✨ **Three Tabs**:
- **Templates**: Organize chat message templates by categories
- **Guides**: Store video guides and learning resources
- **Examples**: Upload and organize example photos

☁️ **Cloud Storage**:
- Automatic upload to Supabase Storage (Google Cloud-backed)
- Fallback to local storage if cloud is unavailable
- Cloud status indicator in top-right corner

🎨 **Customization**:
- Choose category colors
- Create sub-categories
- Add private notes to templates
- Mark templates for photo/PPV attachments

🌍 **Multi-Language**:
- English, Russian, Ukrainian
- Dark/Light theme toggle

🤖 **AI Integration**:
- Generate templates using AI (requires API key)
- Context-aware suggestions based on category

## Getting Started (5 minutes)

### Without Cloud Storage (Local Use)

1. Open the app in your browser
2. Click the **padlock icon** to enter Admin mode
3. Password: `burmalda`
4. Start adding templates, guides, and photos
5. All data is stored locally in your browser

⚠️ **Note**: Local data is only on this device. Clear browser cache = data lost.

### With Cloud Storage (Recommended)

1. Follow the setup guide: [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)
2. After configuration, you'll see a **"Cloud"** indicator (top-right)
3. Now all photos and videos auto-upload to the cloud
4. Your data syncs across all devices!

## Basic Workflow

### Adding Templates

1. Go to **Templates** tab
2. Click a category (e.g., "Small talk / Знакомство с новым фаном")
3. Click **"Add Snippet"** button
4. Type your message template
5. Optional:
   - Add a note with `Add Note` button
   - Mark as "Teaser Photo" (needs image attachment)
   - Mark as "PPV Message" (needs payment)

### Adding Example Photos

1. Go to **Examples** tab
2. Select a category
3. Click **"Add Example Photo"**
4. Choose an image from your computer
5. Add a description
6. With cloud enabled, the photo uploads automatically

### Adding Video Guides

1. Go to **Guides** tab
2. Click **"Add Guide"**
3. Paste a Google Drive link (must be public)
4. Add a title and description
5. Click the expand icon to watch fullscreen

## Admin Controls

Click the **🔒 Admin Login** button to unlock:

- **Add/Edit/Delete** categories
- **Add/Edit/Delete** templates, guides, and photos
- **Reorder** templates by dragging
- **Change** category colors
- **Create sub-categories**

Admin Password: `burmalda`

## Cloud Storage Status

**Top-Right Indicator**:
- 🟢 **Cloud** (Green): Cloud storage configured and working
- ⚪ **Local** (Gray): Using local browser storage

If you see "Local" and want cloud:
1. Follow [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)
2. Restart the app
3. Should show "Cloud" indicator

## Tips & Tricks

### Copying Templates
- Click any template
- Press **Copy** button
- Paste in chat with fans

### Organizing
- Use sub-categories for variations
- Color-code by topic or importance
- Add notes for context (visible only to you)

### Backup Strategy
- Upload photos through app (auto-uploads if cloud enabled)
- Regularly export data (if export feature available)
- Keep Google Drive videos accessible ("Anyone with link")

### Search
- Currently filters by category
- Sub-categories help organize large lists

## Troubleshooting

### "Local" instead of "Cloud"?
→ Follow [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)

### Photos not uploading?
→ Check browser console (F12) for errors
→ Verify Supabase credentials in .env.local

### Google Drive videos not playing?
→ Ensure video access is set to "Anyone with link"
→ Copy full share link from Google Drive

### Data disappeared?
→ Check if using local storage (see "Cloud Storage Status" above)
→ Browser cache clear would remove local data
→ With cloud storage, data is always safe

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Copy template | Click copy button |
| Add category | Click + button (admin) |
| Edit category | Click pencil icon (admin) |
| Delete category | Click trash icon (admin) |
| Fullscreen image | Click photo card |
| Fullscreen video | Click expand icon |

## Language Support

- **English** (en)
- **Русский** (ru)
- **Українська** (uk)

Toggle language by clicking the language code button in top-right.

## Data Privacy

- **Local Storage**: All data stays in your browser
- **Cloud Storage**: Files uploaded to your Supabase account
- **Admin Password**: `burmalda` is for demo only - change in production!

## Next Steps

1. **Setup Cloud** (Optional but recommended): [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)
2. **Add Templates**: Start building your template library
3. **Upload Photos**: Create visual examples
4. **Add Guides**: Link to training videos
5. **Export Data**: Download your templates for backup (if available)

## Support & Troubleshooting

### Common Issues

**Q: How do I change the admin password?**
A: Edit `src/App.tsx`, find `adminPasswordInput === 'burmalda'`, change to your password.

**Q: Can I use this offline?**
A: Yes, if using local storage. Cloud features require internet.

**Q: How much data can I store?**
A: Local: Limited by browser storage (~5-50MB)
   Cloud: Up to 1GB per bucket on free Supabase plan

**Q: Can multiple people use this?**
A: Currently single-user. For team features, implement user authentication.

### Getting Help

1. Check browser console (F12 → Console) for error messages
2. Review [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md) for cloud issues
3. Verify all required files exist in project root

## Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Project Structure
```
src/
├── App.tsx              # Main app component
├── config/
│   └── supabase.ts      # Cloud storage configuration
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## License

This project is for personal use. Modify and distribute as needed.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Cloud Storage**: Supabase (built on Google Cloud)
