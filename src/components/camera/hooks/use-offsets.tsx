import { useState, useEffect } from 'react';

/**
 * In the event that the video (v) is larger than it's parent container (c), calculate offsets
 * to center the container in the middle of the video.
 * */
interface offsetsTypes {
  x: number, y: number
}

export function useOffsets(
  vWidth: number | undefined,
  vHeight: number| undefined,
  cWidth: number| undefined,
  cHeight: number| undefined,
): offsetsTypes {
  const [offsets, setOffsets] = useState<offsetsTypes>({ x: 0, y: 0 });

  useEffect(() => {
    if (vWidth && vHeight && cWidth && cHeight) {
      const x = vWidth > cWidth ? Math.round((vWidth - cWidth) / 2) : 0;
      const y = vHeight > cHeight ? Math.round((vHeight - cHeight) / 2) : 0;

      setOffsets({ x, y });
    }
  }, [vWidth, vHeight, cWidth, cHeight]);

  return offsets;
}
