import { useEffect, useState } from "react";
import EditMode from "./EditMode";
import { useToggle } from "../hooks/useToggle";
import { useLinks } from "../hooks/useLinks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function LinkedCard({ id, title, url, icon, visible, editPane }) {
  const [editTitle, , activeTitle, inactiveTitle] = useToggle(false);
  const [draft, setDraft] = useState(title);
  const [editLink, , activeLink, inactiveLink] = useToggle(false);
  const [draftLink, setDraftLink] = useState(url);
  const { handleDelete, handleToggle, handleUpdate } = useLinks();

  const {
    attributes, // aria attributes for accessibility
    listeners, // event listeners for drag trigger
    setNodeRef, // ref to attach to the DOM element
    transform, // current drag position
    transition, // smooth animation
    isDragging, // true while being dragged
  } = useSortable({ id });

  // CSS.Transform.toString converts transform object to CSS string
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1, // fade while dragging
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleSave = (field, value, inactivate) => {
    if (!value.trim()) return;
    handleUpdate(id, { [field]: value });
    inactivate();
  };

  const handleCancel = () => {
    setDraft(title); // reset draft to original
    inactiveTitle();
  };

  const handleCancelLink = () => {
    setDraftLink(url); // reset draft to original
    inactiveLink();
  };

  // Save on Enter, cancel on Escape
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave("title", draft, inactiveTitle);
    if (e.key === "Escape") handleCancel();
  };

  const handleKeyDownLink = (e) => {
    if (e.key === "Enter") handleSave("url", draftLink, inactiveLink);
    if (e.key === "Escape") handleCancelLink();
  };
  useEffect(() => {
    setDraft(title);
  }, [title]);
  useEffect(() => {
    setDraftLink(url);
  }, [url]);

  if (!id || !title) {
    console.warn("Id or Title are missing");
    return null;
  }

  return (
    <div
      className="link-card"
      ref={setNodeRef} // attach ref — dnd-kit tracks this DOM node
      style={style} // apply transform + transition
      {...attributes}
    >
      <div className="info">
        {visible ? (
          <a href={url} target="_blank" className="icon">
            {icon}
          </a>
        ) : (
          <span className="icon">{icon}</span>
        )}
        <div className="title">
          {editTitle ? (
            <EditMode
              value={draft}
              setValue={(e) => setDraft(e.target.value)}
              handleKeyDown={handleKeyDown}
              handleSave={() => handleSave("title", draft, inactiveTitle)}
              handleCancel={handleCancel}
            />
          ) : (
            <p onDoubleClick={editPane && activeTitle}>{title}</p>
          )}
        </div>
        {visible && (
          <div className="url">
            {editLink ? (
              <EditMode
                value={draftLink}
                setValue={(e) => setDraftLink(e.target.value)}
                handleKeyDown={handleKeyDownLink}
                handleSave={() => handleSave("url", draftLink, inactiveLink)}
                handleCancel={handleCancelLink}
              />
            ) : (
              <p onDoubleClick={editPane && activeLink}>{url}</p>
            )}
          </div>
        )}
      </div>
      {editPane && (
        <div className="actions">
          <button onClick={() => handleDelete(id)}>Delete</button>
          <button onClick={() => handleToggle(id)}>Toggle</button>
          <button className="drag-handle" {...listeners}>
            ⠿
          </button>
        </div>
      )}
    </div>
  );
}

export default LinkedCard;
