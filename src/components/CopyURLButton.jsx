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
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg width="15px" height="15px" viewBox="0 -0.5 21 21" version="1.1">
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-219.000000, -400.000000)"
              fill="currentColor"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M181.9,258 L165.1,258 L165.1,242 L173.5,242 L173.5,240 L163,240 L163,260 L184,260 L184,250 L181.9,250 L181.9,258 Z M170.58205,245.121 L173.86015,248.243 L182.5153,240 L184,241.414 L173.86015,251.071 L173.86015,251.071 L173.8591,251.071 L169.09735,246.536 L170.58205,245.121 Z"
                  id="done-[#1476]"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      )}
    </button>
  );
}
