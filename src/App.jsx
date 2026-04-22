import { useEffect, useState } from "react";
import {
  AddLinkForm,
  EmptyState,
  LinkCard,
  ProfileHeader,
  Skeleton,
} from "./components";
import { useLinks } from "./hooks/useLinks";
import PreviewPane from "./components/PreviewPane";

export default function App() {
  const { links, hasLinks, linkCount } = useLinks();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeloading = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fakeloading);
    };
  }, []);

  useEffect(() => {
    document.title = `DevLinks (${linkCount})`;
  }, [linkCount]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="split-pane">
          <div className="edit-pane">
            <Skeleton type="header" />
            <div className="link-grid">
              <Skeleton type="card" />
              <Skeleton type="card" />
              <Skeleton type="card" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="preview-pane"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="split-pane">
        <div className="edit-pane">
          <ProfileHeader editPane />
          {!hasLinks ? (
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
                  editPane
                />
              ))}
            </div>
          )}
          <AddLinkForm />
        </div>
        <div className="divider"></div>
        <div className="preview-pane">
          <PreviewPane />
        </div>
      </div>
    </div>
  );
}
