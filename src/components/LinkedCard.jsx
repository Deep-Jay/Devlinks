import { useEffect, useState } from "react";
import EditMode from "./EditMode";
import { useLinks } from "../context/LinksContext";

function LinkedCard({ id, title, url, icon, visible, first, last }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [draftLink, setDraftLink] = useState(url);
  const { handleDelete, handleToggle, moveUp, moveDown, handleUpdate } =
    useLinks();

  const handleSave = (field, value, setEditing) => {
    if (!value.trim()) return;
    handleUpdate(id, { [field]: value });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(title); // reset draft to original
    setIsEditing(false);
  };

  const handleCancelLink = () => {
    setDraftLink(url); // reset draft to original
    setIsEditingLink(false);
  };

  // Save on Enter, cancel on Escape
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave("title", draft, setIsEditing);
    if (e.key === "Escape") handleCancel();
  };

  const handleKeyDownLink = (e) => {
    if (e.key === "Enter") handleSave("url", draftLink, setIsEditingLink);
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
    <div className="link-card">
      <div className="info">
        {visible ? (
          <a href={url} target="_blank" className="icon">
            {icon}
          </a>
        ) : (
          <span className="icon">{icon}</span>
        )}
        <div className="title">
          {isEditing ? (
            <EditMode
              value={draft}
              setValue={setDraft}
              handleKeyDown={handleKeyDown}
              handleSave={() => handleSave("title", draft, setIsEditing)}
              handleCancel={handleCancel}
            />
          ) : (
            <p onDoubleClick={() => setIsEditing(true)}>{title}</p>
          )}
        </div>
        {visible && (
          <div className="url">
            {isEditingLink ? (
              <EditMode
                value={draftLink}
                setValue={setDraftLink}
                handleKeyDown={handleKeyDownLink}
                handleSave={() =>
                  handleSave("url", draftLink, setIsEditingLink)
                }
                handleCancel={handleCancelLink}
              />
            ) : (
              <p onDoubleClick={() => setIsEditingLink(true)}>{url}</p>
            )}
          </div>
        )}
      </div>
      <div className="actions">
        <button onClick={() => handleDelete(id)}>Delete</button>
        <button onClick={() => handleToggle(id)}>Toggle</button>
        {!first && <button onClick={() => moveUp(id)}>⬆️</button>}
        {!last && <button onClick={() => moveDown(id)}>⬇️</button>}
      </div>
    </div>
  );
}

export default LinkedCard;
