import React from 'react';

export default function PauseIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 14C3.1 14 4 13.1 4 12V2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14ZM8 2V12C8 13.1 8.9 14 10 14C11.1 14 12 13.1 12 12V2C12 0.9 11.1 0 10 0C8.9 0 8 0.9 8 2Z"
        fill="white"
      />
    </svg>
  );
}
