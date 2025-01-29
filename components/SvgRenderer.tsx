import React from 'react';
import { SvgProps } from 'react-native-svg';

interface ISvgRenderer {
  svgName: string;
  svgModule:  { [key: string]: React.FC<SvgProps> };
  width?: number;
  height?: number;
  color?: string;
}

export const SvgRenderer = ({ svgName, svgModule, width=100, height=100, color='#000001' }: ISvgRenderer) => {
  const SvgComponent = svgModule[svgName];

  if (!SvgComponent) {
    console.error(`SVG "${svgName}" not found in Svgs`);
    return null;
  }

  return <SvgComponent width={width} height={height} color={color}/>;
};
