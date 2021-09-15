import React from 'react';

export default function MoreIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="5"
      height="20"
      viewBox="0 0 5 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 5C3.875 5 5 3.875 5 2.5C5 1.125 3.875 0 2.5 0C1.125 0 0 1.125 0 2.5C0 3.875 1.125 5 2.5 5ZM2.5 7.5C1.125 7.5 0 8.625 0 10C0 11.375 1.125 12.5 2.5 12.5C3.875 12.5 5 11.375 5 10C5 8.625 3.875 7.5 2.5 7.5ZM2.5 15C1.125 15 0 16.125 0 17.5C0 18.875 1.125 20 2.5 20C3.875 20 5 18.875 5 17.5C5 16.125 3.875 15 2.5 15Z"
        fill="white"
      />
    </svg>
  );
}
