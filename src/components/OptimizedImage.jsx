function toWebp(src) {
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  mobileSrc,
  width,
  height,
  ...props
}) {
  const webpSrc = toWebp(src);
  const webpMobile = mobileSrc ?? src.replace(/\.(png|jpe?g)$/i, '-mobile.webp');

  return (
    <picture>
      {mobileSrc !== false && (
        <source media="(max-width: 768px)" srcSet={webpMobile} type="image/webp" />
      )}
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        {...props}
      />
    </picture>
  );
}
