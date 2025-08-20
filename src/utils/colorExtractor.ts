import { APP_CONSTANTS } from '../constants/app';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
}

export class ColorExtractor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async extractColorsFromImage(imageSrc: string): Promise<ColorPalette> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        this.canvas.width = APP_CONSTANTS.CANVAS_SIZE;
        this.canvas.height = APP_CONSTANTS.CANVAS_SIZE;
        this.ctx.drawImage(img, 0, 0, APP_CONSTANTS.CANVAS_SIZE, APP_CONSTANTS.CANVAS_SIZE);
        
        const imageData = this.ctx.getImageData(0, 0, APP_CONSTANTS.CANVAS_SIZE, APP_CONSTANTS.CANVAS_SIZE);
        const colors = this.analyzeColors(imageData.data);
        resolve(colors);
      };
      
      img.onerror = () => {
        resolve(this.getDefaultPalette());
      };
      
      img.src = imageSrc;
    });
  }

  private analyzeColors(data: Uint8ClampedArray): ColorPalette {
    const colorMap = new Map<string, number>();
    
    for (let i = 0; i < data.length; i += APP_CONSTANTS.PIXEL_SKIP_RATE) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      if (a < APP_CONSTANTS.MIN_ALPHA_THRESHOLD) continue;
      
      const grouping = APP_CONSTANTS.COLOR_GROUPING_FACTOR;
      const key = `${Math.floor(r / grouping) * grouping},${Math.floor(g / grouping) * grouping},${Math.floor(b / grouping) * grouping}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
    
    const sortedColors = Array.from(colorMap.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([color]) => color.split(',').map(Number));
    
    if (sortedColors.length === 0) {
      return this.getDefaultPalette();
    }
    
    const [r1, g1, b1] = sortedColors[0] || [121, 134, 203];
    const [r2, g2, b2] = sortedColors[1] || [255, 138, 128];
    const [r3, g3, b3] = sortedColors[2] || [129, 199, 132];
    
    const offset = APP_CONSTANTS.COLOR_LIGHTNESS_OFFSET;
    return {
      primary: this.rgbToHex(r1, g1, b1),
      secondary: this.rgbToHex(r2, g2, b2),
      accent: this.rgbToHex(r3, g3, b3),
      light: this.rgbToHex(
        Math.min(255, r1 + offset),
        Math.min(255, g1 + offset),
        Math.min(255, b1 + offset)
      )
    };
  }

  private getDefaultPalette(): ColorPalette {
    return {
      primary: '#7986cb',
      secondary: '#ff8a80',
      accent: '#81c784',
      light: '#ffb74d'
    };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  generateCSSVariables(palette: ColorPalette): string {
    return `
      --dynamic-color-1: ${palette.primary};
      --dynamic-color-2: ${palette.secondary};
      --dynamic-color-3: ${palette.accent};
      --dynamic-color-4: ${palette.light};
      --dynamic-color-1-alpha: ${palette.primary}40;
      --dynamic-color-2-alpha: ${palette.secondary}30;
      --dynamic-color-3-alpha: ${palette.accent}25;
      --dynamic-color-4-alpha: ${palette.light}20;
    `;
  }
}

export const colorExtractor = new ColorExtractor();
