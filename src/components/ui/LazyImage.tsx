import { useState } from 'react';
import { cn } from '../../lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderClassName?: string;
}

/**
 * Image wrapper that uses the native `loading="lazy"` browser attribute
 * and fades in once the image has loaded, avoiding layout shift.
 */
export const LazyImage = ({
  src,
  alt,
  className,
  placeholderClassName,
  ...props
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative inline-block">
      {!loaded && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 animate-pulse rounded bg-brand-medium/40',
            placeholderClassName,
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </span>
  );
};
