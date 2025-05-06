export const downloadCanvasToImage = (): void => {
  const canvas = document.querySelector('canvas');
  const dataURL = canvas?.toDataURL();
  const link = document.createElement('a');

  if (!dataURL) return;

  link.href = dataURL;
  link.download = 'canvas.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color: string): string => {
  const hex = color.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? 'black' : 'white';
};
