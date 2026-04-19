import { useState } from "react";
import { useLinks } from "../context/LinksContext";

function AddLinkForm() {
  const [formState, setFormState] = useState({
    title: "",
    url: "",
    icon: "",
  });
  const [errors, setErrors] = useState({});
  const { handleAdd, checkDuplicateURL } = useLinks();

  const handleFormStateChange = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field.name]: field.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formState.title.trim()) newErrors.title = "Title is required";

    if (!formState.url.trim()) newErrors.url = "URL is required";
    else if (!formState.url.startsWith("http"))
      newErrors.url = "URL must start with http";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (checkDuplicateURL(formState.url)) {
      setErrors({
        url: "URL already exists",
      });
      return;
    }

    handleAdd(formState);
    setFormState({
      title: "",
      url: "",
      icon: "",
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} id="form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formState.title}
        onChange={(e) => handleFormStateChange(e.target)}
      />
      {errors.title && <span className="error">{errors.title}</span>}
      <input
        type="text"
        name="url"
        placeholder="Url"
        value={formState.url}
        onChange={(e) => handleFormStateChange(e.target)}
      />
      {errors.url && <span className="error">{errors.url}</span>}
      <input
        type="text"
        name="icon"
        placeholder="Icon"
        value={formState.icon}
        onChange={(e) => handleFormStateChange(e.target)}
      />
      <button type="submit">Add Link</button>
    </form>
  );
}

export default AddLinkForm;
