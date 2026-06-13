# Our Wedding Story

A romantic, responsive wedding photo gallery built with Vite, React, and TypeScript. Photos are loaded from a public Google Drive folder through the Google Drive API.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file:

   ```bash
   cp .env.example .env
   ```

3. Add your Google API key:

   ```bash
   VITE_GOOGLE_API_KEY=YOUR_API_KEY
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite.

## Google Drive Sharing

The folder and its images must be shared as `Anyone with the link can view`.

Current folder ID:

```txt
1phYj9vRZleQXYt-NL0zqoM3aZx8klIJ5
```

The app requests up to 1000 image files with `mimeType` starting with `image/`, then loads high-resolution Google Drive thumbnail URLs for better visual quality.

## Change The Drive Folder

Edit `WEDDING_FOLDER_ID` in `src/services/googleDrive.ts`:

```ts
const WEDDING_FOLDER_ID = "YOUR_FOLDER_ID";
```

Make sure the new folder is public or available to the API key.

## Change The Couple Name

Edit the small hero line in `src/components/Hero.tsx`:

```tsx
<p className="hero__eyebrow">Trung Nhân & My Love</p>
```

## Main Files

- `src/App.tsx`: loads photos and coordinates the page.
- `src/services/googleDrive.ts`: calls the Google Drive API and maps files to gallery photos.
- `src/components/Gallery.tsx`: renders loading, error, empty, masonry grid, and lightbox state.
- `src/components/Lightbox.tsx`: handles fullscreen viewing, keyboard controls, and slideshow.
- `src/styles/global.css`: visual design and responsive layout.

## Deploy

### Vercel

1. Import this repository in Vercel.
2. Add `VITE_GOOGLE_API_KEY` in Project Settings > Environment Variables.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

### Netlify

1. Import this repository in Netlify.
2. Add `VITE_GOOGLE_API_KEY` in Site configuration > Environment variables.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

## Notes

- Do not commit a real API key.
- If photos do not load, check the API key, Google Drive API access, and folder/image sharing permissions.
- The gallery uses lazy image loading and async decoding for better performance.
