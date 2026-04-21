import { useEffect, useState } from "react";
import EditMode from "./EditMode";
import { useToggle } from "../hooks/useToggle";
import { useLinks } from "../hooks/useLinks";

function LinkedCard({ id, title, url, icon, visible, first, last }) {
  const [editTitle, , activeTitle, inactiveTitle] = useToggle(false);
  const [draft, setDraft] = useState(title);
  const [editLink, , activeLink, inactiveLink] = useToggle(false);
  const [draftLink, setDraftLink] = useState(url);
  const { handleDelete, handleToggle, moveUp, moveDown, handleUpdate } =
    useLinks();

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
          {editTitle ? (
            <EditMode
              value={draft}
              setValue={setDraft}
              handleKeyDown={handleKeyDown}
              handleSave={() => handleSave("title", draft, inactiveTitle)}
              handleCancel={handleCancel}
            />
          ) : (
            <p onDoubleClick={activeTitle}>{title}</p>
          )}
        </div>
        {visible && (
          <div className="url">
            {editLink ? (
              <EditMode
                value={draftLink}
                setValue={setDraftLink}
                handleKeyDown={handleKeyDownLink}
                handleSave={() => handleSave("url", draftLink, inactiveLink)}
                handleCancel={handleCancelLink}
              />
            ) : (
              <p onDoubleClick={activeLink}>{url}</p>
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
