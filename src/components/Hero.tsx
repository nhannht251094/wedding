import type { WeddingPhoto } from "../types/photo";

type HeroProps = {
  photos: WeddingPhoto[];
  isLoading: boolean;
};

const pickHeroPhotos = (photos: WeddingPhoto[]) => {
  if (photos.length <= 3) {
    return photos;
  }

  const preferredIndexes = [
    0,
    Math.floor(photos.length * 0.45),
    Math.floor(photos.length * 0.78),
  ];

  return preferredIndexes.map((index) => photos[index]);
};

export default function Hero({ photos, isLoading }: HeroProps) {
  const scrollToGallery = () => {
    document
      .getElementById("gallery")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const featurePhotos = pickHeroPhotos(photos);
  return (
    <header className="hero">
      <div className="botanical botanical--hero-left" aria-hidden="true" />
      <div className="botanical botanical--hero-right" aria-hidden="true" />
      <nav className="hero__nav" aria-label="Wedding gallery sections">
        <span className="hero__brand">N&T</span>
      </nav>
      <div className="hero__content fade-in">
        <span className="hero__pill">Wedding archive</span>
        <p className="hero__eyebrow">Trung Nhân & Anh Thư</p>
        <h1>
          Wedding
          <em> Memories.</em>
        </h1>
        <p className="hero__subtitle">
          A cinematic archive of our favorite frames, arranged with soft light,
          florals, and the quiet romance of the day.
        </p>
        <div className="hero__actions">
          <button className="button button--primary" onClick={scrollToGallery}>
            View Album
          </button>
          <span className="hero__count">{photos.length || "..."} photos</span>
        </div>
      </div>
      <div className="hero__gallery" aria-hidden={featurePhotos.length === 0}>
        {isLoading &&
          Array.from({ length: 3 }, (_, index) => (
            <div className="hero__photo hero__photo--loading" key={index} />
          ))}
        {!isLoading &&
          featurePhotos.map((photo, index) => (
            <img
              className="hero__photo"
              src={photo.thumbnailUrl}
              alt=""
              decoding="async"
              key={photo.id}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
      </div>
    </header>
  );
}
