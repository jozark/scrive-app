import React from 'react';

export default function BackArrow(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="inherit"
        d="M7.125 1L1 7M1 7L7.125 13M1 7L15 7.00001"
        stroke="#C2C2C2"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
