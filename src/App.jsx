import { useEffect, useState } from "react";
import { AddLinkForm, LinkCard, ProfileHeader, Skeleton } from "./components";
import EmptyState from "./components/EmptyState";
import { useLinks } from "./context/LinksContext";

export default function App() {
  const { links } = useLinks();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Devlinks Mounted");
    const fakeloading = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fakeloading);
    };
  }, [setIsLoading]);

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
              first={index === 0}
              last={index === links.length - 1}
            />
          ))}
        </div>
      )}
      <AddLinkForm />
    </div>
  );
}
