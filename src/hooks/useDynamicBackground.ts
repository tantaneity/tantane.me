import { useState, useEffect } from 'react';
import { ColorPalette, colorExtractor } from '../utils/colorExtractor';

const DEFAULT_PALETTE: ColorPalette = {
  primary: '#E8D7C1',
  secondary: '#D7C0AE',
  accent: '#F0E4D4',
  light: '#F5EFE6'
};

export const useDynamicBackground = (imageSrc?: string) => {
  const [palette, setPalette] = useState<ColorPalette>(DEFAULT_PALETTE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageSrc) return;

    const extractColors = async () => {
      setIsLoading(true);
      try {
        const colors = await colorExtractor.extractColorsFromImage(imageSrc);
        setPalette(colors);
        
        const root = document.documentElement;
        const cssVars = colorExtractor.generateCSSVariables(colors);
        
        cssVars.split(';')
          .filter(v => v.trim())
          .forEach(varDeclaration => {
            const [property, value] = varDeclaration.split(':').map(s => s.trim());
            if (property && value) {
              root.style.setProperty(property, value);
            }
          });
        
      } catch (error) {
        console.error('Error extracting colors:', error);
        setPalette(DEFAULT_PALETTE);
      } finally {
        setIsLoading(false);
      }
    };

    extractColors();
  }, [imageSrc]);

  return { palette, isLoading };
};
