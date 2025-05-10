// import { useEffect, useRef } from "react";
// import {
// 	Pose,
// 	POSE_LANDMARKS_LEFT,
// 	POSE_LANDMARKS_RIGHT,
// } from "@mediapipe/pose";
// import { Camera } from "@mediapipe/camera_utils";

// type FootData = {
// 	position: { x: number; y: number; z: number };
// 	angle: number; // in radians
// };
// type FootTrackerProps = {
// 	onTrack: (feet: { left: FootData; right: FootData }) => void;
// };

// export default function FootTracker({ onTrack }: FootTrackerProps) {
// 	const canvasRef = useRef<HTMLCanvasElement>(null);

// 	useEffect(() => {
// 		const videoElement = document.querySelector("video") as HTMLVideoElement;
// 		const canvas = canvasRef.current!;
// 		const ctx = canvas.getContext("2d")!;

// 		const pose = new Pose({
// 			locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
// 		});

// 		pose.setOptions({
// 			modelComplexity: 1,
// 			smoothLandmarks: true,
// 			minDetectionConfidence: 0.5,
// 			minTrackingConfidence: 0.5,
// 		});

// 		pose.onResults((results) => {
// 			ctx.clearRect(0, 0, canvas.width, canvas.height);

// 			const lmk = results.poseLandmarks;
// 			if (lmk) {
// 				const lh = lmk[POSE_LANDMARKS_LEFT.LEFT_HEEL];
// 				const lt = lmk[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX];
// 				const rh = lmk[POSE_LANDMARKS_RIGHT.RIGHT_HEEL];
// 				const rt = lmk[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX];

// 				if (lh && lt && rh && rt) {
// 					const getAngle = (heel: any, toe: any) =>
// 						Math.atan2(toe.y - heel.y, toe.x - heel.x);

// 					onTrack({
// 						left: {
// 							position: { x: lh.x, y: -lh.y, z: -lh.z },
// 							angle: getAngle(lh, lt),
// 						},
// 						right: {
// 							position: { x: rh.x, y: -rh.y, z: -rh.z },
// 							angle: getAngle(rh, rt),
// 						},
// 					});

// 					// Debug overlay
// 					const drawPoint = (pt: any, color: string) => {
// 						ctx.fillStyle = color;
// 						ctx.beginPath();
// 						ctx.arc(
// 							pt.x * canvas.width,
// 							pt.y * canvas.height,
// 							8,
// 							0,
// 							2 * Math.PI
// 						);
// 						ctx.fill();
// 					};
// 					drawPoint(lh, "blue");
// 					drawPoint(lt, "cyan");
// 					drawPoint(rh, "red");
// 					drawPoint(rt, "orange");
// 				}
// 			}
// 		});

// 		if (videoElement) {
// 			const camera = new Camera(videoElement, {
// 				onFrame: async () => {
// 					await pose.send({ image: videoElement });
// 				},
// 				width: 640,
// 				height: 480,
// 			});
// 			camera.start();
// 		}
// 	}, [onTrack]);

// 	return (
// 		<canvas
// 			ref={canvasRef}
// 			width={window.innerWidth}
// 			height={window.innerHeight}
// 			style={{
// 				position: "absolute",
// 				top: 0,
// 				left: 0,
// 				zIndex: 2,
// 				pointerEvents: "none",
// 			}}
// 		/>
// 	);
// }
import { useEffect, useRef } from 'react';
import {
  Pose,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
} from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export type FootData = {
  position: { x: number; y: number; z: number };
  angle: number;
};

type FootTrackerProps = {
  onTrack: (feet: { left: FootData; right: FootData }) => void;
};

export default function FootTracker({ onTrack }: FootTrackerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoElement = document.querySelector('video') as HTMLVideoElement;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const landmarks = results.poseLandmarks;
      if (landmarks) {
        const lh = landmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL];
        const lt = landmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX];
        const rh = landmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL];
        const rt = landmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX];

        if (lh && lt && rh && rt) {
          const angle = (a: any, b: any) => Math.atan2(b.y - a.y, b.x - a.x);
          onTrack({
            left: {
              position: { x: lh.x, y: -lh.y, z: -lh.z },
              angle: angle(lh, lt),
            },
            right: {
              position: { x: rh.x, y: -rh.y, z: -rh.z },
              angle: angle(rh, rt),
            },
          });
          console.log('Tracking feet:', {
            left: {
              position: { x: lh.x, y: -lh.y, z: -lh.z },
              angle: angle(lh, lt),
            },
            right: {
              position: { x: rh.x, y: -rh.y, z: -rh.z },
              angle: angle(rh, rt),
            },
          });

          const draw = (p: any, color: string) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x * canvas.width, p.y * canvas.height, 8, 0, 2 * Math.PI);
            ctx.fill();
          };

          draw(lh, 'blue');
          draw(lt, 'cyan');
          draw(rh, 'red');
          draw(rt, 'orange');
        }
      }
    });

    if (videoElement) {
      const cam = new Camera(videoElement, {
        onFrame: async () => await pose.send({ image: videoElement }),
        width: 640,
        height: 480,
      });
      cam.start();
    }
  }, [onTrack]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
