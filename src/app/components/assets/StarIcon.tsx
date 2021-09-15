import React from 'react';

export default function TimeIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.99995 14.27L13.15 16.78C13.91 17.24 14.8399 16.56 14.6399 15.7L13.54 10.98L17.2099 7.80001C17.8799 7.22001 17.5199 6.12001 16.6399 6.05001L11.81 5.64001L9.91995 1.18001C9.57995 0.37001 8.41995 0.37001 8.07995 1.18001L6.18995 5.63001L1.35995 6.04001C0.479951 6.11001 0.119951 7.21001 0.789951 7.79001L4.45995 10.97L3.35995 15.69C3.15995 16.55 4.08995 17.23 4.84995 16.77L8.99995 14.27Z"
        fill="white"
      />
    </svg>
  );
}
