import React, { useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";

const SocialSelect = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = [
    { value: "github", label: "GitHub", icon: <FaGithub /> },
    { value: "twitter", label: "Twitter", icon: <FaTwitter /> },
    { value: "linkedin", label: "LinkedIn", icon: <FaLinkedin /> },
    { value: "instagram", label: "Instagram", icon: <FaInstagram /> },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div
      style={{ position: "relative", width: "250px", fontFamily: "sans-serif" }}
    >
      {/* Hidden input makes it work with standard form submissions */}
      <input type="hidden" name={name} value={selected?.value || ""} />

      {/* Select Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {selected ? (
            <>
              {selected.icon} {selected.label}
            </>
          ) : (
            <span style={{ color: "#999" }}>Select platform...</span>
          )}
        </div>
        <FaChevronDown style={{ fontSize: "12px", color: "#666" }} />
      </div>

      {/* Options Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "4px",
            background: "#fff",
            zIndex: 10,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
            >
              {option.icon}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialSelect;
