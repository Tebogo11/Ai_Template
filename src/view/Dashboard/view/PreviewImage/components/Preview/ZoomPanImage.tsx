import React, { useRef, useState, useEffect } from "react";

type ZoomPanImageProps = {
  src: string;
  alt?: string;
  initialScale?: number; // starting zoom
  minScale?: number; // minimum zoom
  maxScale?: number; // maximum zoom
  wheelSpeed?: number; // how fast wheel zooms
  className?: string;
};

type Point = { x: number; y: number };

export default function ZoomPanImage({
  src,
  alt = "",
  initialScale = 1,
  minScale = 0.5,
  maxScale = 6,
  wheelSpeed = 0.0015,
  className = "",
}: ZoomPanImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [scale, setScale] = useState(initialScale);
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastPanRef = useRef<Point>({ x: 0, y: 0 });

  // Multi-pointer state for pinch
  const pointers = useRef<Map<number, Point>>(new Map());
  const [isPinching, setIsPinching] = useState(false);
  const pinchStartDistance = useRef(0);
  const pinchStartScale = useRef(scale);
  const pinchCenterStart = useRef<Point>({ x: 0, y: 0 });

  // Ensure image stays within reasonable bounds when zooming/dragging
  const clampTranslate = (t: Point, nextScale = scale) => {
    const c = containerRef.current;
    const img = imgRef.current;
    if (!c || !img) return t;

    const cw = c.clientWidth;
    const ch = c.clientHeight;

    // natural size factoring object-contain "base" fit
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Fit image into container first (like object-contain), then apply scale
    const fit = Math.min(cw / iw, ch / ih);
    const dispW = iw * fit * nextScale;
    const dispH = ih * fit * nextScale;

    // If image is smaller than container on an axis, center it (no panning needed)
    const maxX = Math.max(0, (dispW - cw) / 2);
    const maxY = Math.max(0, (dispH - ch) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, t.x)),
      y: Math.min(maxY, Math.max(-maxY, t.y)),
    };
  };

  const setScaleAround = (
    nextScale: number,
    clientX: number,
    clientY: number,
  ) => {
    const c = containerRef.current;
    const img = imgRef.current;
    if (!c || !img) return;

    // Where on the image did we zoom towards?
    const rect = c.getBoundingClientRect();
    const cx = clientX - rect.left - rect.width / 2 - translate.x;
    const cy = clientY - rect.top - rect.height / 2 - translate.y;

    // Adjust translate so the point under the cursor stays under the cursor
    const scaleRatio = nextScale / scale;
    const nextTranslate = {
      x: translate.x - cx * (scaleRatio - 1),
      y: translate.y - cy * (scaleRatio - 1),
    };

    const clampedT = clampTranslate(nextTranslate, nextScale);
    setTranslate(clampedT);
    setScale(nextScale);
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const delta = e.deltaY; // positive = zoom out
    const targetScale = Math.min(
      maxScale,
      Math.max(minScale, scale * (1 - delta * wheelSpeed)),
    );
    setScaleAround(targetScale, e.clientX, e.clientY);
  };

  // Mouse pan
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      // Begin pinch
      setIsPinching(true);
      const pts = Array.from(pointers.current.values());
      pinchStartDistance.current = Math.hypot(
        pts[0].x - pts[1].x,
        pts[0].y - pts[1].y,
      );
      pinchStartScale.current = scale;

      // center point at start of pinch
      pinchCenterStart.current = {
        x: (pts[0].x + pts[1].x) / 2,
        y: (pts[0].y + pts[1].y) / 2,
      };
    } else if (pointers.current.size === 1 && scale > 1) {
      setIsPanning(true);
      lastPanRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (isPinching && pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinchStartDistance.current === 0) return;

      const rawScale =
        (distance / pinchStartDistance.current) * pinchStartScale.current;
      const nextScale = Math.min(maxScale, Math.max(minScale, rawScale));
      setScaleAround(
        nextScale,
        pinchCenterStart.current.x,
        pinchCenterStart.current.y,
      );
      return;
    }

    if (isPanning) {
      const dx = e.clientX - lastPanRef.current.x;
      const dy = e.clientY - lastPanRef.current.y;
      const next = clampTranslate({ x: translate.x + dx, y: translate.y + dy });
      setTranslate(next);
      lastPanRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerUpOrCancel: React.PointerEventHandler<HTMLDivElement> = (
    e,
  ) => {
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) setIsPinching(false);
    if (pointers.current.size === 0) setIsPanning(false);
  };

  // Double click to zoom in/out
  const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (scale <= 1) {
      setScaleAround(2, e.clientX, e.clientY);
    } else {
      // reset
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  };

  // Buttons
  const zoomBy = (factor: number) => {
    const c = containerRef.current;
    const center = c
      ? {
          x: c.getBoundingClientRect().left + c.clientWidth / 2,
          y: c.getBoundingClientRect().top + c.clientHeight / 2,
        }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const next = Math.min(maxScale, Math.max(minScale, scale * factor));
    setScaleAround(next, center.x, center.y);
  };

  const reset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  // Keep translation clamped if container resizes
  useEffect(() => {
    const onResize = () => setTranslate((t) => clampTranslate(t));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className={`relative overflow-hidden touch-none select-none ${className} min-w-[90dvw] md:min-w-[350px]`}
    >
      {/* Interaction layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 min-h-0 min-w-[350px] touch-none cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUpOrCancel}
        onPointerCancel={onPointerUpOrCancel}
        onDoubleClick={onDoubleClick}
        aria-label="Zoomable image region"
        role="region"
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          className="absolute top-1/2 left-1/2 will-change-transform pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${translate.x}px), calc(-50% + ${translate.y}px)) scale(${scale})`,
            transformOrigin: "center center",
            // Smooth-ish, but not too laggy
            transition:
              isPanning || isPinching ? "none" : "transform 120ms ease-out",
            // Make it behave like object-contain at scale=1 via CSS sizing:
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>

      {/* Controls */}
      <div className="absolute  w-full flex justify-center bottom-2 z-10  ">
        <button
          type="button"
          className="btn bg-black/60 text-white px-3 py-2 text-sm backdrop-blur hover:bg-black/70"
          onClick={() => zoomBy(1 / 1.2)}
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          className="btn bg-black/60 text-white px-3 py-2 text-sm backdrop-blur hover:bg-black/70"
          onClick={reset}
          aria-label="Reset zoom"
        >
          Reset
        </button>
        <button
          type="button"
          className="btn bg-black/60 text-white px-3 py-2 text-sm backdrop-blur hover:bg-black/70"
          onClick={() => zoomBy(1.2)}
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
