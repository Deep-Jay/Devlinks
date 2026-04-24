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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

export default function App() {
  const { links, hasLinks, linkCount, reorderLinks } = useLinks();
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // must move 8px before drag activates
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    reorderLinks(arrayMove(links, oldIndex, newIndex));
  };

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={links.map((l) => l.id)} // just the IDs in order
                  strategy={verticalListSortingStrategy}
                >
                  {links.map((link) => (
                    <LinkCard
                      key={link.id}
                      id={link.id}
                      url={link.url}
                      icon={link.icon}
                      title={link.title}
                      visible={link.visible}
                      editPane
                    />
                  ))}
                </SortableContext>
              </DndContext>
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
