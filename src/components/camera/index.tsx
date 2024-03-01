import React, {
  useState, useRef, JSX, MutableRefObject,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Measure from 'react-measure';
import { Button } from '@mui/material';
import { useUserMedia } from './hooks/use-user-media';
import { useOffsets } from './hooks/use-offsets';
import {
  Video,
  Canvas,
  Wrapper,
  Container,
  Flash,
  Overlay,
} from './styles.js';
import { useCardRatio } from './hooks/use-card-ratio';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

export function Camera({ onCapture, onClear }: { onCapture: (blob: Blob | null) => void, onClear: () => void }): JSX.Element | null {
  const canvasRef: MutableRefObject<HTMLCanvasElement | undefined> = useRef();
  const videoRef: MutableRefObject<HTMLVideoElement | undefined> = useRef();

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState<boolean>(true);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height,
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  const handleResize = (contentRect: any): void => {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio),
    });
  };

  const handleCanPlay = (): void => {
    calculateRatio(videoRef.current!.videoHeight, videoRef.current!.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };

  const handleCapture = () :void => {
    const context = canvasRef.current?.getContext('2d');

    context?.drawImage(
      videoRef.current as CanvasImageSource,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      0,
      0,
      container.width,
      container.height,
    );

    canvasRef.current?.toBlob((blob: Blob | null) => onCapture(blob), 'image/jpeg', 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
  };

  const handleClear = (): void => {
    const context = canvasRef.current?.getContext('2d');
    context?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    setIsCanvasEmpty(true);
    onClear();
  };

  if (!mediaStream) {
    return null;
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Wrapper>
          <Container
            ref={measureRef}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
            maxHeight={videoRef.current && videoRef.current.videoHeight}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            style={{
              height: `${container.height}px`,
            }}
          >
            <Video
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              style={{
                top: `-${offsets.y}px`,
                left: `-${offsets.x}px`,
              }}
            />

            <Overlay hidden={!isVideoPlaying} />

            <Canvas
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              ref={canvasRef}
              width={container.width}
              height={container.height}
            />

            <Flash
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              flash={isFlashing}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </Container>

          {isVideoPlaying && (
          <Button
            variant="contained"
            onClick={isCanvasEmpty ? handleCapture : handleClear}
            sx={{ marginTop: '24px' }}
          >
            {isCanvasEmpty ? 'Take a picture' : 'Take another picture'}
          </Button>
          )}
        </Wrapper>
      )}
    </Measure>
  );
}
