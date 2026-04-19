import { useEffect, useContext, useState, createContext } from "react";

const demoLinks = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com",
    icon: "🐙",
    visible: true,
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "https://linkedin.com",
    icon: "💼",
    visible: true,
  },
  {
    id: 3,
    title: "Twitter",
    url: "https://twitter.com",
    icon: "🐦",
    visible: true,
  },
];

export const LinksContext = createContext(null);

export function LinksProvider({ children }) {
  const [links, setLinks] = useState(() => {
    try {
      const savedLinks = localStorage.getItem("links");
      if (savedLinks !== null) return JSON.parse(savedLinks);
      return demoLinks;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
    document.title = `DevLinks (${links.length})`;
  }, [links]);

  const handleDelete = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleToggle = (id) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, visible: !link.visible } : link,
      ),
    );
  };

  const handleAdd = (fields) => {
    const data = {
      ...fields,
      icon: fields.icon || "🔗",
      visible: true,
    };
    setLinks((prev) => [...prev, { id: Date.now(), ...data }]);
  };

  const checkDuplicateURL = (url) => {
    return links.find((link) => link.url === url);
  };

  // Move item up
  const moveUp = (id) => {
    setLinks((prev) => {
      const index = prev.findIndex((link) => link.id === id);
      if (index === 0) return prev; // already first — do nothing

      const updated = [...prev]; // copy array
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ]; // swap
      return updated;
    });
  };

  // Move item down in array
  const moveDown = (id) => {
    setLinks((prev) => {
      const index = prev.findIndex((link) => link.id === id);
      if (index === prev.length - 1) return prev; // already last

      const updated = [...prev];
      [updated[index + 1], updated[index]] = [
        updated[index],
        updated[index + 1],
      ];
      return updated;
    });
  };

  const handleUpdate = (id, fields) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...fields } : link)),
    );
  };

  const value = {
    links,
    setLinks,
    handleDelete,
    handleAdd,
    handleToggle,
    handleUpdate,
    moveDown,
    moveUp,
    checkDuplicateURL,
  };

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error("useLinks must be used inside LinksProvider");
  }

  return context;
}
