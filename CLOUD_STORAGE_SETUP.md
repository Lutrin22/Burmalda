# Cloud Storage Setup Guide - Vice Doll Template Manager

## Overview

The Vice Doll Template Manager now supports cloud storage for photos and videos using **Supabase Storage**, which is built on top of Google Cloud Storage. This allows you to upload, manage, and store your media files in the cloud securely.

## Why Cloud Storage?

- **Scalability**: Store unlimited photos and videos
- **Reliability**: Files are safely backed up in the cloud
- **Easy Sharing**: Get public URLs for your media
- **Automatic Cleanup**: Optionally delete old files automatically
- **Security**: Control access with authentication

## Setup Instructions

### Step 1: Create a Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with your email or Google account
4. Create a new project:
   - Choose a project name (e.g., "vice-doll-templates")
   - Set a strong database password
   - Select a region closest to you
   - Click "Create new project"

Wait for the project to be created (usually 1-2 minutes).

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** (bottom left)
2. Click on **API** 
3. Under "Project URL", copy this value and save it as `VITE_SUPABASE_URL`
4. Under "Project API keys", find the "anon public" key and copy it as `VITE_SUPABASE_ANON_KEY`

Example:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Create Storage Buckets

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click "Create a new bucket" for each:
   - Bucket name: `examples`
   - Make it **Public** (so images can be viewed)
   - Click "Create bucket"
   
3. Repeat for:
   - Bucket name: `guides`
   - Make it **Public**

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your values:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save the file

### Step 5: Verify Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Look at the top-right corner of the app
3. You should see a **"Cloud"** indicator (green if connected)
4. If you see **"Local"** instead, double-check your environment variables

## Usage

### Uploading Photos

1. Click on the **Examples** tab
2. Click **"Add Example Photo"** button
3. Select an image from your computer
4. The image will automatically upload to cloud storage
5. A small cloud icon appears on the image card

### Deleting Photos

- Click the trash icon on any image card
- The file is automatically deleted from cloud storage

### Video Guides

Currently, video guides use Google Drive links. To add your own videos to cloud storage:

1. Upload videos through the **Examples** tab
2. Videos will be stored in the `guides` bucket
3. Use the generated public URLs to embed them

## Fallback Behavior

If Supabase credentials are not configured:
- Images are stored locally in your browser (base64)
- All data stays on your computer
- No cloud sync or backup
- Look for the **"Local"** indicator in the top-right

## Monitoring Storage

### View Storage Usage

1. Go to Supabase Dashboard → **Storage**
2. See bucket sizes and file counts
3. Monitor your usage to stay within limits

### Set Storage Limits

Supabase has limits based on your plan:
- **Free**: 1 GB per bucket
- **Pro**: Up to your subscribed limit

## Troubleshooting

### Images still upload locally (no Cloud icon)

**Problem**: Environment variables not set correctly

**Solution**:
1. Check `.env.local` file exists
2. Verify `VITE_SUPABASE_URL` starts with `https://`
3. Make sure there are no trailing spaces
4. Restart development server: `npm run dev`

### Upload fails silently

**Problem**: Supabase credentials invalid or buckets not created

**Solution**:
1. Verify keys in Supabase dashboard
2. Check that `examples` and `guides` buckets exist
3. Confirm buckets are set to **Public**
4. Open browser console (F12) to see error messages

### 403 Forbidden errors

**Problem**: Bucket permissions not set to public

**Solution**:
1. Go to Supabase → **Storage**
2. Click bucket name
3. Click **Policies**
4. Ensure SELECT policy allows public read access
5. Click "Allow list to everyone"

### Images won't display in fullscreen

**Problem**: CORS or public URL issues

**Solution**:
1. Go to Supabase → **Storage** → bucket
2. Check if public URL is accessible by copying image URL to browser
3. Verify bucket is marked as Public

## Security Notes

⚠️ **Important**: The `anon public` key is meant to be public (client-side). Use Row Level Security (RLS) policies to control access in production.

For production apps, consider:
1. Setting up RLS policies in Supabase
2. Restricting upload sizes
3. Adding file type validation
4. Implementing user authentication

## Pricing

Supabase has a generous free tier:
- **Storage**: 1 GB per bucket
- **Bandwidth**: 2 GB/month
- **Free tier included functions**

See https://supabase.com/pricing for full details.

## Support

For Supabase issues: https://supabase.com/docs
For app issues: Check browser console (F12 → Console tab)

## FAQ

**Q: Can I use a different cloud storage provider?**
A: Yes! Modify `src/config/supabase.ts` to use AWS S3, Firebase, or another provider.

**Q: Will my data sync across devices?**
A: Yes, once uploaded to cloud storage. You need to export/sync data separately.

**Q: Can I migrate existing images to cloud?**
A: The app currently uses local base64 for old images. You can re-upload them through the UI.

**Q: Is there a maximum file size?**
A: Supabase limits are generous (usually 100MB+). Update the app to add client-side validation if needed.
