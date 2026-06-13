import type { WeddingPhoto } from "../types/photo";

const WEDDING_FOLDER_ID = "1phYj9vRZleQXYt-NL0zqoM3aZx8klIJ5";
const DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";
const GALLERY_THUMBNAIL_SIZE = 1800;
const LIGHTBOX_IMAGE_SIZE = 3200;

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
};

type DriveFilesResponse = {
  files?: DriveFile[];
  error?: {
    message?: string;
  };
};

const buildDriveThumbnailUrl = (fileId: string, size: number) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;

export async function fetchWeddingPhotos(
  folderId = WEDDING_FOLDER_ID,
): Promise<WeddingPhoto[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_GOOGLE_API_KEY. Create a .env file and add your Google Drive API key.",
    );
  }

  const params = new URLSearchParams({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    fields: "files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)",
    orderBy: "name_natural",
    pageSize: "1000",
    key: apiKey,
  });

  const response = await fetch(`${DRIVE_FILES_ENDPOINT}?${params.toString()}`);
  const data = (await response.json()) as DriveFilesResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ||
        "Could not load photos. Please check Google Drive sharing or API key.",
    );
  }

  return (data.files || [])
    .filter((file) => file.mimeType?.startsWith("image/"))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      thumbnailUrl: buildDriveThumbnailUrl(file.id, GALLERY_THUMBNAIL_SIZE),
      fullUrl: buildDriveThumbnailUrl(file.id, LIGHTBOX_IMAGE_SIZE),
      webViewLink: file.webViewLink,
    }));
}

export { WEDDING_FOLDER_ID, GALLERY_THUMBNAIL_SIZE, LIGHTBOX_IMAGE_SIZE };
