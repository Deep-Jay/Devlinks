import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme } = useTheme();
  return (
    <button className="sw-toggle" onClick={toggleTheme}>
      <svg
        className="sw-toggle-icon sw-ico-moon"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <span className="sw-track">
        <span className="sw-thumb"></span>
      </span>
      <svg
        className="sw-toggle-icon sw-ico-sun"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="currentColor"
          stroke="none"
        ></circle>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
      </svg>
    </button>
  );
}
