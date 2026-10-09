# Vice Doll Template Manager - Features & Specifications

## ☁️ Cloud Storage Features (NEW)

### Supabase Integration
- **Provider**: Supabase (built on Google Cloud Storage)
- **Buckets**: `examples` and `guides`
- **Auto-upload**: Photos automatically upload when added
- **Fallback**: Automatic fallback to local base64 if cloud unavailable
- **Cloud Indicator**: Real-time status in top-right corner
- **Auto-cleanup**: Delete files from cloud when removed from app

### Upload Features
- **Photos**: JPEG, PNG, WebP, GIF
- **Storage Path**: `{bucket}/{categoryId}/{timestamp}_{random}_{filename}`
- **Public URLs**: Generated automatically for all uploads
- **File Size**: Supabase free tier: ~100MB per file limit
- **Batch**: Upload multiple files sequentially

### Cloud Status
- 🟢 **Green "Cloud"**: Connected to Supabase, ready to upload
- ⚪ **Gray "Local"**: Fallback to browser storage (no cloud)
- **Display**: Top-right corner of header

### Offline Capability
- ✅ Local storage works completely offline
- ⚠️ Cloud uploads require internet connection
- 🔄 Automatic retry on reconnection (can be implemented)

---

## 📋 Template Management

### Template Types
- **Text Templates**: Message content
- **Teaser Photos**: Marked templates for photo attachments
- **PPV Messages**: Marked templates for paid content

### Template Features
- **Drag & Reorder**: Admin can reorder templates by dragging
- **Rich Notes**: Private notes for each template
- **Categories**: Organize by conversation stage
- **Sub-categories**: Create nested hierarchies
- **Color Tags**: Assign colors to categories
- **Copy to Clipboard**: One-click copy of template text
- **AI Generation**: Context-aware template suggestions

### Category Hierarchy
```
Main Category (e.g., "Small talk")
├── Sub-category 1
├── Sub-category 2
└── Sub-category 3
```

### Admin Controls
- Create/Edit/Delete categories and sub-categories
- Reorder templates with drag-and-drop
- Add/remove attachment type tags
- Set category colors
- Add private notes to templates

---

## 🎥 Video Guides

### Supported Sources
- **Google Drive**: Embedded previews (public links)
- **Cloud Storage**: Future support

### Guide Features
- **Video Preview**: Inline player in app
- **Fullscreen Mode**: Expand to watch large
- **Descriptions**: Add timestamps and notes
- **Multiple Layouts**: Side-by-side or stacked view
- **Expandable Layout**: Toggle between layouts with Maximize/Minimize

### Guide Information
- **Title**: Guide name
- **URL**: Google Drive share link
- **Description**: Notes, timestamps, key points
- **Timestamp Format**: "0:00 - Introduction, 2:30 - Main topic"

### Public Link Requirement
⚠️ Google Drive videos must have "Anyone with the link" access:
1. Right-click video → Share
2. Change access to "Anyone with the link"
3. Copy sharing link
4. Paste in app

---

## 🖼️ Example Photos

### Photo Upload
- **File Types**: JPG, PNG, WebP, GIF, etc.
- **Cloud Upload**: Automatic if cloud enabled
- **Local Fallback**: Base64 if cloud unavailable
- **Cloud Indicator**: Small cloud icon on cloud-hosted photos

### Photo Features
- **Description**: Add captions or context
- **Fullscreen**: Click photo to view large
- **Grid Layout**: Responsive 1-3 columns
- **Category Organization**: Group by category
- **Quick Delete**: Remove with trash icon

### Photo Metadata
- **Timestamp**: Auto-generated on upload
- **Cloud Status**: Track if uploaded to cloud
- **Category ID**: Included in cloud path for organization
- **Description**: User-added notes

---

## 🌍 Multi-Language Support

### Available Languages
| Language | Code | Status |
|----------|------|--------|
| English | en | ✅ Complete |
| Русский (Russian) | ru | ✅ Complete |
| Українська (Ukrainian) | uk | ✅ Complete |

### Translated Elements
- UI buttons and labels
- Placeholder text
- Modal dialogs
- Error messages
- Category names

### Language Toggle
- Click language code in top-right
- Cycles through: English → Russian → Ukrainian → English
- Saves to state (resets on page reload)

---

## 🎨 Theming

### Dark Mode
- **Default**: Dark theme on load
- **Toggle**: Click sun/moon icon (top-right)
- **Colors**:
  - Dark: Slate 950 background, white text
  - Light: Slate 50 background, slate 900 text

### Category Colors
Available colors for categories:
- 🔵 **Slate** - Neutral, default
- 🟣 **Purple** - Guides default
- 🌸 **Pink** - Accent color
- 🔷 **Blue** - Examples default
- 💚 **Green** - Success state
- 🟡 **Yellow** - Warning state
- 🔴 **Red** - Danger/Delete

### Color Picker
- Click palette icon on category
- Select from 7 color options
- Applied to category border and indicator
- Persists in state

---

## 🔒 Admin System

### Authentication
- **Method**: Simple password login
- **Default Password**: `burmalda`
- **Location**: Top-right "Admin Login" button

### Admin Features
- ✅ Add/Edit/Delete all content
- ✅ Reorder templates
- ✅ Upload photos
- ✅ Manage categories
- ✅ Edit text fields

### View-Only (Non-Admin)
- 👁️ View all content
- 📋 Copy template text
- 🖼️ View photos fullscreen
- 🎥 Watch videos fullscreen
- ❌ Cannot edit or delete

### Logout
- Click "Exit Admin" button
- Returns to view-only mode
- Password reset required to re-login

---

## 💾 Data Storage

### Local Storage (Browser)
- **Capacity**: 5-50MB typically
- **Persistence**: Survives browser restart
- **Format**: React state + optional localStorage
- **Privacy**: All data on your device

### Cloud Storage (Supabase)
- **Capacity**: 1GB free per bucket
- **Bandwidth**: 2GB/month free
- **Persistence**: Permanent until deleted
- **Privacy**: Your Supabase account

### Data Structure
```javascript
{
  categories: [
    {
      id: "cat_123",
      name: "Category Name",
      color: "slate",
      parentId: null,
      templates: [
        {
          id: "tpl_456",
          text: "Template text",
          note: "Optional note",
          attachmentType: "teaser" | "ppv" | null
        }
      ]
    }
  ],
  guideCategories: [...],
  exampleCategories: [...]
}
```

---

## 🚀 Performance

### Rendering
- **Library**: React 19.2.6 with Vite
- **Animation**: Framer Motion for smooth transitions
- **Bundle Size**: ~662KB (gzipped: ~187KB)
- **Load Time**: < 2 seconds typically

### Optimization
- Code splitting with Vite
- Lazy loading of heavy components
- Optimized re-renders with React hooks
- Efficient state management

---

## 🔧 Technical Stack

### Frontend
- **React**: 19.2.6 (latest)
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.17 (utility-first)
- **Framer Motion**: Animation library
- **Vite**: Build tool (7.3.2)

### Backend Integration
- **Supabase**: Cloud storage & database SDK
- **fetch API**: For Gemini AI integration

### Build Tools
- **Vite**: Super fast HMR dev server
- **TailwindCSS/Vite**: For CSS compilation
- **esbuild**: Fast JavaScript bundler

---

## 🎯 Use Cases

### For Content Creators
- Organize messaging strategies by conversation stage
- Store example photos and teasers
- Reference video tutorials
- Quick message copy-paste for fans

### For Teams
- Share message templates
- Standard responses for common questions
- Training materials library
- Best practice examples

### For Personal Use
- Chat workflow automation
- Media organization
- Learning resources hub
- Backup of important content

---

## 🔐 Security Considerations

### Passwords
- ⚠️ Demo password: `burmalda` - change in production!
- 🔒 Consider hashing or using proper auth for production

### Cloud Access
- ✅ Supabase keys are public (client-side)
- 🔓 Consider RLS policies for production
- 🛡️ Implement proper authentication layer

### Data Privacy
- ☁️ Cloud data stored in your Supabase account
- 📱 Local data only on your device
- 🌐 HTTPS encryption in transit

---

## 📊 Limits & Quotas

### Local Storage
- Max size: 5-50MB (browser-dependent)
- No bandwidth limits
- Syncs within same device only

### Cloud Storage (Supabase Free)
- Buckets: Unlimited
- Storage per bucket: 1GB
- Bandwidth: 2GB/month
- Concurrent uploads: 5

### Rate Limiting
- No client-side limits currently
- Supabase may rate limit on free tier

---

## 🐛 Known Limitations

1. **Single Language Session**: Language resets on page reload
2. **Local-only by default**: Requires cloud setup for cloud features
3. **No Real-time Sync**: Multiple browser tabs don't sync in real-time
4. **No User Accounts**: Single admin with one password
5. **No Backup/Restore**: Must manually export if needed

---

## 🔮 Future Enhancements

Planned features:
- [ ] Real-time multi-user sync
- [ ] User authentication & accounts
- [ ] Data export/import (JSON)
- [ ] Search across all templates
- [ ] Analytics & usage tracking
- [ ] Custom notification templates
- [ ] Video upload support
- [ ] Batch operations
- [ ] Template versioning
- [ ] Scheduled messages

---

## 📞 Support

For issues:
1. Check browser console (F12)
2. Review [CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md) for cloud issues
3. Review [QUICKSTART.md](./QUICKSTART.md) for usage questions
4. Check TypeScript errors for type safety issues

---

**Last Updated**: 2024  
**Version**: 1.0.0 with Cloud Storage
