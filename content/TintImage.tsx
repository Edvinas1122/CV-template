import React, { useEffect, useRef } from 'react';

type Color = {
	r: number;
	g: number;
	b: number;
};

type Position = {
	x: number;
	y: number;
}

function getColorToMix(color_1: Color, color_2: Color, x: number, y: number, width: number, height: number, angle: number = 90): Color {
	const angleInRadians = (Math.PI / 180) * angle;
  
	const centerX = width / 2;
	const centerY = height / 2;
  
	// Distance-based weight for blending colors
	const distance = (Math.cos(angleInRadians) * (x - centerX) + Math.sin(angleInRadians) * (y - centerY));
	const maxDistance = Math.sqrt(Math.pow(width - centerX, 2) + Math.pow(height - centerY, 2));
	const normalizedDistance = (distance + maxDistance) / (2 * maxDistance);
  
	const color1Weight = 1 - normalizedDistance;
	const color2Weight = normalizedDistance;
  
	const color = {
	  r: Math.round(color_1.r * color1Weight + color_2.r * color2Weight),
	  g: Math.round(color_1.g * color1Weight + color_2.g * color2Weight),
	  b: Math.round(color_1.b * color1Weight + color_2.b * color2Weight),
	};
  
	return color;
  }
function tintPixel(position: Position, color: Color, imageData: ImageData, blendStrength: number = 0.5, opacity: number = 1) {
	const { x, y } = position;
	const { r, g, b, a = 255 } = color;
	const pixels = imageData.data;
	const width = imageData.width;

	function calculateAverage(x: number, y: number): { avgR: number, avgG: number, avgB: number, avgA: number, count: number } {
		let avgR = 0, avgG = 0, avgB = 0, avgA = 0, count = 0;

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				const newX = x + dx;
				const newY = y + dy;

				if (newX < 0 || newX >= width || newY < 0 || newY >= imageData.height) continue;

				const index = (newY * width + newX) * 4;

				avgR += pixels[index];
				avgG += pixels[index + 1];
				avgB += pixels[index + 2];
				avgA += pixels[index + 3];
				count++;
			}
		}

		avgR /= count;
		avgG /= count;
		avgB /= count;
		avgA /= count;

		return { avgR, avgG, avgB, avgA, count };
	}

	const { avgR, avgG, avgB, avgA } = calculateAverage(x, y);

	if (avgA === 0) return;

	const luminance = (avgR + avgG + avgB) / 3;

	// Modify blendStrength based on luminance
	const luminanceNormalized = luminance / 255;
	function getDynamicConstants(blendStrength: number): {darkThreshold: number, lightThreshold: number, darkExponent: number, lightExponent: number, minimumBlendStrenght: number} {
		const darkThreshold = 0.3 + (0.3 * blendStrength);  
		const lightThreshold = 0.7 - (0.3 * blendStrength); 
		const darkExponent = 0.8 - (0.3 * blendStrength);  
		const lightExponent = 0.5 + (0.2 * blendStrength);  
		const minimumBlendStrenght = 0 + (0.3 * blendStrength);
		
		return {
			darkThreshold,
			lightThreshold,
			darkExponent,
			lightExponent,
			minimumBlendStrenght
		};
	}
	const {
		darkThreshold,
		lightThreshold,
		darkExponent,
		lightExponent,
		minimumBlendStrenght
	} = getDynamicConstants(blendStrength);
	
	let adjustedBlendStrength;

	if (luminanceNormalized < darkThreshold) {
	  // Pixels are dark; use the dark exponent
	  adjustedBlendStrength = opacity * (1 - Math.pow(luminanceNormalized, darkExponent));
	} else if (luminanceNormalized > lightThreshold) {
	  // Pixels are light; use the light exponent
	  adjustedBlendStrength = opacity * (1 - Math.pow(luminanceNormalized, lightExponent));
	} else {
	  // Pixels are in the middle range; interpolate the exponent
	  const t = (luminanceNormalized - darkThreshold) / (lightThreshold - darkThreshold);
	  const interpolatedExponent = darkExponent * (1 - t) + lightExponent * t;
	
	  adjustedBlendStrength = opacity * (1 - Math.pow(luminanceNormalized, interpolatedExponent));
	}

	adjustedBlendStrength = Math.min(1, adjustedBlendStrength + minimumBlendStrenght);


	function getColorDifferentialFactor(r: number, g: number, b: number): number {
		// Convert RGB to HSL
		const [h, s, l] = rgbToHsl(r, g, b);
	  
		// Define a base factor based on saturation.
		// Since saturation for gray colors is close to zero, the factor for them would be low.
		let colorFactor = s;
	  
		// Increase the factor for specific hues (colors)
		if ((h >= 1/6 && h <= 1/5) ||  // Yellowish
			(h >= 4/6 && h <= 5/6) ||  // Pinkish to Blueish
			(h >= 5/6 && h <= 1)) {    // Pinkish
		  colorFactor *= 2;  // Double the color factor for these hues
		}
	  
		return colorFactor;
	  }
	  
	  // Convert RGB to HSL (0 <= h, s, l <= 1)
	  function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b), min = Math.min(r, g, b);
		let h, s, l = (max + min) / 2;
	  
		if (max === min) {
		  h = s = 0; // achromatic
		} else {
		  const delta = max - min;
		  s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
		  switch (max) {
			case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
			case g: h = (b - r) / delta + 2; break;
			case b: h = (r - g) / delta + 4; break;
		  }
		  h /= 6;
		}
	  
		return [h, s, l];
	}




	const index = (y * width + x) * 4;
	pixels[index]     = avgR * (1 - adjustedBlendStrength) + r * adjustedBlendStrength;
	pixels[index + 1] = avgG * (1 - adjustedBlendStrength) + g * adjustedBlendStrength;
	pixels[index + 2] = avgB * (1 - adjustedBlendStrength) + b * adjustedBlendStrength;

	const blendedAlpha = avgA * (1 - adjustedBlendStrength) + a * adjustedBlendStrength;
	pixels[index + 3] = blendedAlpha;
}

function hexColorToRGB(hexColor: string): Color {
	const hex = hexColor.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return { r, g, b };
}

function getRotatedCoordinates(i: number, width: number, height: number, angle: number) {
    const x = (i / 4) % width;
    const y = Math.floor(i / 4 / width);
  
    const angleInRadians = (Math.PI / 180) * angle;
  
    const centerX = width / 2;
    const centerY = height / 2;
  
    const x_rotated = Math.cos(angleInRadians) * (x - centerX) - Math.sin(angleInRadians) * (y - centerY) + centerX;
    const y_rotated = Math.sin(angleInRadians) * (x - centerX) + Math.cos(angleInRadians) * (y - centerY) + centerY;
  
    return { x_rotated, y_rotated };
}

function tintImageData(imgData: ImageData, color_1: string, color_2: string, blendStrength: number = 0.5, angle: number = 0) {
    const pixels = imgData.data;
    const width = imgData.width;
    const height = imgData.height;
	const centerX = imgData.width / 2;
    const centerY = imgData.height / 2;

    const color_1_rgb = hexColorToRGB(color_1);
    const color_2_rgb = hexColorToRGB(color_2);

    for (let i = 0; i < pixels.length; i += 4) {
        const a = pixels[i + 3];
        if (a === 0) continue;  // Skip transparent pixels

        const { x_rotated, y_rotated } = getRotatedCoordinates(i, width, height, angle);

        const color = getColorToMix(color_1_rgb, color_2_rgb, x_rotated, y_rotated, width, height, angle);
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);
		const dx = x - centerX;
        const dy = y - centerY;
        // const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

        // Modulate blend strength based on distance from center
        // const modulatedBlendStrength = (0.1 + (0.3 * Math.pow((distanceFromCenter / Math.max(centerX, centerY)), 0.9)));
		const modulatedBlendStrength = 1;

        tintPixel({ x: x, y: y }, color, imgData, blendStrength, modulatedBlendStrength);
    }

    return imgData;
}

const TintImage = ({
	src,
	alt,
	className,
	color_1,
	color_2,
	blendStrength = 0.5,
	angle = 0,
	canvas_height = 1000,
	canvas_width = 1000,
}: {
	src: string;
	alt: string;
	className: string;
	color_1: string;
	color_2: string;
	blendStrength?: number;
	angle?: number;
	canvas_height?: number;
	canvas_width?: number;
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = true;
		if (!ctx) return;

		const img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		
			imgData = tintImageData(imgData, color_1, color_2, blendStrength, angle);  // Call the tint function
			ctx.putImageData(imgData, 0, 0);
		};
		img.src = src;
	}, [src, color_1, color_2]);

	return <canvas className={className} ref={canvasRef} width={canvas_width} height={canvas_height}/>;
};

export default TintImage;