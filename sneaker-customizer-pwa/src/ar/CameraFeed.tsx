// import { useEffect, useRef } from 'react';

// export default function CameraFeed() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     let stream: MediaStream | null = null;

//     const setupCamera = async () => {
//       try {
//         // Slight delay for permissions UI to finish
//         await new Promise((r) => setTimeout(r, 300));

//         // Try environment-facing camera
//         try {
//           stream = await navigator.mediaDevices.getUserMedia({
//             video: { facingMode: { exact: 'environment' } },
//           });
//         } catch {
//           console.warn('Back camera not available, falling back...');
//           stream = await navigator.mediaDevices.getUserMedia({
//             video: { facingMode: { ideal: 'environment' } },
//           });
//         }

//         if (!stream) throw new Error('No camera stream returned');

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.onloadedmetadata = () => {
//             videoRef.current?.play().catch((e) => {
//               console.warn('Video play() interrupted:', e);
//             });
//           };
//         }
//       } catch (err: any) {
//         console.error('Failed to acquire camera feed:', err);

//         // Allow silent retry if error is NotReadableError
//         if (err.name === 'NotReadableError') {
//           console.warn('NotReadableError: camera busy, retrying...');
//           setTimeout(() => setupCamera(), 500);
//         } else {
//           alert(
//             'Camera access failed. Please check permissions in your browser settings.'
//           );
//         }
//       }
//     };

//     setupCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <video
//       ref={videoRef}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         zIndex: 0,
//       }}
//       playsInline
//       muted
//     />
//   );
// }
