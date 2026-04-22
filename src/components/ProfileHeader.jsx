import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { useToggle } from "../hooks/useToggle";
import EditMode from "./EditMode";
import ThemeToggleButton from "./ThemeToggleButton";
import CopyURLButton from "./CopyURLButton";

export default function ProfileHeader({ editPane }) {
  const { name, bio, avatar, updateField } = useProfile();
  const [editName, , activeName, inactiveName] = useToggle(false);
  const [editBio, , activeBio, inactiveBio] = useToggle(false);
  const [editAvatar, , activeAvatar, inactiveAvatar] = useToggle(false);
  const [draft, setDraft] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  const handleDraftUpdate = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (field, value, inactivate) => {
    if (!value.trim()) return;
    updateField(field, value);
    inactivate();
  };

  const handleCancel = (field, value, updateValue, inactivate) => {
    updateValue(field, value);
    inactivate();
  };

  const nameKeyDown = (e) => {
    if (e.key === "Enter") handleSave("name", draft.name, inactiveName);
    if (e.key === "Escape")
      handleCancel("name", name, handleDraftUpdate, inactiveName);
  };

  const bioKeyDown = (e) => {
    if (e.key === "Enter") handleSave("bio", draft.bio, inactiveBio);
    if (e.key === "Escape")
      handleCancel("bio", bio, handleDraftUpdate, inactiveBio);
  };

  const avatarKeyDown = (e) => {
    if (e.key === "Enter") handleSave("avatar", draft.avatar, inactiveAvatar);
    if (e.key === "Escape")
      handleCancel("avatar", avatar, handleDraftUpdate, inactiveAvatar);
  };

  useEffect(() => {
    setDraft({
      name: name,
      bio: bio,
      avatar: avatar,
    });
  }, [name, bio, avatar]);

  return (
    <div className="portfolio-header">
      {editAvatar ? (
        <EditMode
          value={draft.avatar}
          setValue={(e) => handleDraftUpdate("avatar", e.target.value)}
          handleKeyDown={avatarKeyDown}
          handleSave={() => handleSave("avatar", draft.avatar, inactiveAvatar)}
          handleCancel={() =>
            handleCancel("avatar", avatar, handleDraftUpdate, inactiveAvatar)
          }
        />
      ) : (
        <img onDoubleClick={activeAvatar} src={avatar} />
      )}
      {editName ? (
        <EditMode
          value={draft.name}
          setValue={(e) => handleDraftUpdate("name", e.target.value)}
          handleKeyDown={nameKeyDown}
          handleSave={() => handleSave("name", draft.name, inactiveName)}
          handleCancel={() =>
            handleCancel("name", name, handleDraftUpdate, inactiveName)
          }
        />
      ) : (
        <h4 onDoubleClick={activeName}>{name}</h4>
      )}
      {editBio ? (
        <EditMode
          value={draft.bio}
          setValue={(e) => handleDraftUpdate("bio", e.target.value)}
          handleKeyDown={bioKeyDown}
          handleSave={() => handleSave("bio", draft.bio, inactiveBio)}
          handleCancel={() =>
            handleCancel("bio", bio, handleDraftUpdate, inactiveBio)
          }
          textarea
        />
      ) : (
        <p onDoubleClick={activeBio}>{bio}</p>
      )}
      <div className="float-actions">
        {editPane ? (
          <div className="actions">
            <CopyURLButton />
          </div>
        ) : (
          <ThemeToggleButton />
        )}
      </div>
    </div>
  );
}
