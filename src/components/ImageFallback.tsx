"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackContent?: React.ReactNode;
  fallbackText?: string;
  fallbackBg?: string;
  fallbackColor?: string;
}

export default function ImageWithFallback({
  fallbackContent,
  fallbackText,
  fallbackBg = "var(--mauve)",
  fallbackColor = "var(--ink)",
  alt,
  className,
  style,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    if (fallbackContent) {
      return <>{fallbackContent}</>;
    }

    return (
      <div
        className={`flex items-center justify-center p-6 text-center select-none ${className || ""}`}
        style={{
          backgroundColor: fallbackBg,
          color: fallbackColor,
          ...style,
        }}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-anton text-4xl opacity-80">SR</span>
          {fallbackText && (
            <span className="font-sans text-xs tracking-wider uppercase font-semibold opacity-70">
              {fallbackText}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
