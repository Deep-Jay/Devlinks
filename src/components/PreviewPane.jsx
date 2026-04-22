import { LinkCard } from ".";
import { useLinks } from "../hooks/useLinks";
import EmptyState from "./EmptyState";
import ProfileHeader from "./ProfileHeader";

export default function PreviewPane() {
  const { visibleLinks, hasLinks } = useLinks();

  return (
    <>
      <ProfileHeader />
      {!hasLinks ? (
        <EmptyState icon="🪑" title="No links found" message="" />
      ) : (
        <div className="link-grid">
          {visibleLinks.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              url={link.url}
              icon={link.icon}
              title={link.title}
              visible={link.visible}
            />
          ))}
        </div>
      )}
    </>
  );
}
