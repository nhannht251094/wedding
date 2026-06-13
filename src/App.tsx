import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import { fetchWeddingPhotos } from "./services/googleDrive";
import type { WeddingPhoto } from "./types/photo";

export default function App() {
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPhotos() {
      try {
        const nextPhotos = await fetchWeddingPhotos();

        if (isMounted) {
          setPhotos(nextPhotos);
          setError(null);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not load photos. Please check Google Drive sharing or API key.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#gallery">
        Skip to gallery
      </a>
      <Hero photos={photos} isLoading={isLoading} />
      <main>
        <Gallery photos={photos} isLoading={isLoading} error={error} />
      </main>
      <Footer />
    </div>
  );
}
