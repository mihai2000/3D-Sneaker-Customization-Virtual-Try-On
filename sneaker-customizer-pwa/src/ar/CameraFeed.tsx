import { useEffect, useRef } from "react";

export default function CameraFeed() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		let stream: MediaStream | null = null;

		const setupCamera = async () => {
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				const videoInputs = devices.filter((d) => d.kind === "videoinput");
				const backCam =
					videoInputs.find((d) => d.label.toLowerCase().includes("back")) ||
					videoInputs[0];

				if (!backCam) throw new Error("No video input device found.");

				if (videoRef.current?.srcObject) {
					const oldStream = videoRef.current.srcObject as MediaStream;
					oldStream.getTracks().forEach((track) => track.stop());
				}

				stream = await navigator.mediaDevices.getUserMedia({
					video: {
						deviceId: { exact: backCam.deviceId },
					},
				});

				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.onloadedmetadata = () => {
						videoRef.current?.play().catch((e) => {
							console.warn("Video play() interrupted:", e);
						});
					};
				}
			} catch (err) {
				console.error("Failed to acquire camera feed:", err);
				alert("Camera access failed. Please check device permissions.");
			}
		};

		setupCamera();

		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, []);

	return (
		<video
			ref={videoRef}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				zIndex: 0,
			}}
			playsInline
			muted
		/>
	);
}
