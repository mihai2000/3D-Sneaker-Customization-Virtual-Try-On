import { useEffect, useRef } from 'react';

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });
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
