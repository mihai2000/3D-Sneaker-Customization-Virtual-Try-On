import { useEffect } from 'react';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function FootTracker({ onTrack }: { onTrack: Function }) {
  useEffect(() => {
    const videoElement = document.querySelector('video') as HTMLVideoElement;

    const holistic = new Holistic({
      locateFile: (f) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${f}`,
    });
    holistic.setOptions({ modelComplexity: 1, smoothLandmarks: true });
    holistic.onResults((results) => {
      const landmark = results.poseLandmarks?.[27]; // right heel
      if (landmark) {
        onTrack({ x: landmark.x, y: -landmark.y, z: -landmark.z });
      }
    });

    if (videoElement) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await holistic.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [onTrack]);

  return null;
}
