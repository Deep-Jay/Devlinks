import { useContext } from "react";
import { LinksContext } from "../context/LinksContext";

export function useLinks() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error("useLinks must be used inside LinksProvider");
  }

  const visibleLinks = context.links.filter((l) => l.visible);
  const hiddenLinks = context.links.filter((l) => !l.visible);
  const linkCount = context.links.length;
  const hasLinks = context.links.length > 0;

  return {
    ...context,
    visibleLinks,
    hiddenLinks,
    linkCount,
    hasLinks,
  };
}
