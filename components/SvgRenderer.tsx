import React from 'react';
// import * as Svgs from '@/assets/images/svgs/svgs';

interface ISvgRenderer {
  svgName: string;
  svgModule: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> };
}

const SvgRenderer = ({ svgName, svgModule }: ISvgRenderer) => {
  const SvgComponent = svgModule[svgName];

  if (!SvgComponent) {
    console.error(`SVG "${svgName}" not found in Svgs`);
    return null;
  }

  return <SvgComponent width={100} height={100}/>;
};

export default SvgRenderer;