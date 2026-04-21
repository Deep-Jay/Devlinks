import { useForm } from "../hooks/useForm";
import { useLinks } from "../hooks/useLinks";

function AddLinkForm() {
  const { handleAdd, checkDuplicateURL } = useLinks();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { title: "", url: "", icon: "" },
    (values) => {
      const newErrors = {};

      if (!values.title.trim()) newErrors.title = "Title is required";

      if (!values.url.trim()) newErrors.url = "URL is required";
      else if (!values.url.startsWith("http"))
        newErrors.url = "URL must start with http";

      if (checkDuplicateURL(values.url)) {
        newErrors.url = "URL already exists";
      }

      return newErrors;
    },
  );

  return (
    <form onSubmit={handleSubmit(handleAdd)} id="form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
      />
      {errors.title && <span className="error">{errors.title}</span>}
      <input
        type="text"
        name="url"
        placeholder="Url"
        value={values.url}
        onChange={handleChange}
      />
      {errors.url && <span className="error">{errors.url}</span>}
      <input
        type="text"
        name="icon"
        placeholder="Icon"
        value={values.icon}
        onChange={handleChange}
      />
      <button type="submit">Add Link</button>
    </form>
  );
}

export default AddLinkForm;
