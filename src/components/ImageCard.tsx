import type { WeddingPhoto } from "../types/photo";

type ImageCardProps = {
  photo: WeddingPhoto;
  onClick: () => void;
};

export default function ImageCard({ photo, onClick }: ImageCardProps) {
  return (
    <button className="image-card fade-in" onClick={onClick} type="button">
      <img
        src={photo.thumbnailUrl}
        alt={photo.name}
        loading="lazy"
        decoding="async"
      />
      <span className="image-card__veil" aria-hidden="true" />
    </button>
  );
}
