import { useState, useEffect } from 'react';

export function useUserMedia(requestedMedia: MediaStreamConstraints | undefined): MediaStream | null {
  const [mediaStream, setMediaStream] = useState<null | MediaStream>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    async function enableVideoStream(): Promise<void> {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia,
        );
        setMediaStream(stream);
      } catch (err) {
        // Handle the error
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}
