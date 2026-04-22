import { useState } from "react";

export default function CopyURLButton({ url }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url ? url : window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} disabled={copied}>
      {!copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="15"
          height="15"
        >
          <path
            d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
            fill="#ffffff"
          />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fillOpacity="0.01" />
          <path
            d="M29.6325 4H21.9932V27H43.9932V20.9631"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.0015 13.003L33.5649 17.4445L45.0001 6"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30.0049 43.9998C23.6752 43.9998 19.5595 43.9998 17.6579 43.9998C15.9557 43.9998 13.9159 43.4318 12.5475 41.6126C11.6229 40.3832 11.0049 38.5826 11.0049 35.9998C11.0049 31.7298 11.0049 28.063 11.0049 24.9995"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M3 32.9998L11.0046 24.9995L19.0138 32.9998"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
