import React from 'react';

export default function MoreIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="3"
      height="10"
      viewBox="0 0 3 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.25 2.5C1.9375 2.5 2.5 1.9375 2.5 1.25C2.5 0.5625 1.9375 0 1.25 0C0.5625 0 0 0.5625 0 1.25C0 1.9375 0.5625 2.5 1.25 2.5ZM1.25 3.75C0.5625 3.75 0 4.3125 0 5C0 5.6875 0.5625 6.25 1.25 6.25C1.9375 6.25 2.5 5.6875 2.5 5C2.5 4.3125 1.9375 3.75 1.25 3.75ZM1.25 7.5C0.5625 7.5 0 8.0625 0 8.75C0 9.4375 0.5625 10 1.25 10C1.9375 10 2.5 9.4375 2.5 8.75C2.5 8.0625 1.9375 7.5 1.25 7.5Z"
        fill="inherit"
      />
    </svg>
  );
}
