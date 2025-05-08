import { useEffect, useRef } from 'react';

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      try {
        // Kill any existing streams
        if (videoRef.current?.srcObject) {
          const oldStream = videoRef.current.srcObject as MediaStream;
          oldStream.getTracks().forEach((track) => track.stop());
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch((e) => {
              console.warn('Video play() interrupted:', e);
            });
          };
        }
      } catch (err) {
        console.error('Failed to acquire camera feed:', err);
      }
    };

    setupCamera();

    return () => {
      // Clean up when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 0,
      }}
      playsInline
      muted
    />
  );
}
