function toWebp(src) {
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  mobileSrc = false,
  width,
  height,
  ...props
}) {
  const webpSrc = toWebp(src);
  const webpMobile = typeof mobileSrc === 'string'
    ? mobileSrc
    : src.replace(/\.(png|jpe?g)$/i, '-mobile.webp');

  return (
    <picture className="block w-full h-full">
      {typeof mobileSrc === 'string' && (
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
