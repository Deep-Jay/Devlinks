import { useEffect, useState } from "react";
import { AddLinkForm, LinkCard, ProfileHeader, Skeleton } from "./components";
import EmptyState from "./components/EmptyState";
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
export default function App() {
  const [links, setLinks] = useState(() => {
    try {
      const savedLinks = localStorage.getItem("links");
      if (savedLinks !== null) return JSON.parse(savedLinks); // key exists — trust it
      return demoLinks;
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Devlinks Mounted");
    const fakeloading = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fakeloading);
    };
  }, []);

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

  if (isLoading) {
    return (
      <div className="container">
        <Skeleton type="header" />
        <div className="link-grid">
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ProfileHeader
        name="Jaydeep"
        bio="Blanditiis ratione quibusdam iusto sit nostrum eos commodi et. Est fugiat aut sint ut aut."
        avatar="https://avatars.githubusercontent.com/u/83915597?v=4&size=64"
      />
      {links.length === 0 ? (
        <EmptyState
          icon="🪑"
          title="No links added"
          message={
            <a className="btn" href="#form">
              Add your first link below ↴
            </a>
          }
        />
      ) : (
        <div className="link-grid">
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              id={link.id}
              url={link.url}
              icon={link.icon}
              title={link.title}
              visible={link.visible}
              onDelete={() => handleDelete(link.id)}
              onToggle={() => handleToggle(link.id)}
              onMoveUp={() => moveUp(link.id)}
              onMoveDown={() => moveDown(link.id)}
              first={index === 0}
              last={index === links.length - 1}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
      <AddLinkForm onAdd={handleAdd} checkDuplicateURL={checkDuplicateURL} />
    </div>
  );
}
