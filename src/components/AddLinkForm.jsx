import { useForm } from "../hooks/useForm";
import { useLinks } from "../hooks/useLinks";
import SocialSelect from "./SocialSelect";

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
      <select
        name="icon"
        id="social_platform"
        value={values.icon}
        onChange={handleChange}
      >
        <option value="">Icon</option>

        {/* Developer & Professional */}
        <option value="">-- Choose --</option>

        {/* Developer & Professional */}
        <option value="🐙">🐙 GitHub</option>
        <option value="💼">💼 LinkedIn</option>
        <option value="💻">💻 Stack Overflow</option>
        <option value="👾">👾 Discord</option>
        <option value="💬">💬 Slack</option>

        {/* Social & Networking */}
        <option value="🐦">🐦 Twitter / X</option>
        <option value="👥">👥 Facebook</option>
        <option value="📸">📸 Instagram</option>
        <option value="🧵">🧵 Threads</option>
        <option value="🤖">🤖 Reddit</option>

        {/* Video & Creative */}
        <option value="📺">📺 YouTube</option>
        <option value="🎮">🎮 Twitch</option>
        <option value="🎵">🎵 TikTok</option>
        <option value="🎨">🎨 Behance</option>
        <option value="📌">📌 Pinterest</option>

        {/* Communication & Web */}
        <option value="📞">📞 WhatsApp</option>
        <option value="✈️">✈️ Telegram</option>
        <option value="✍️">✍️ Medium</option>
        <option value="🌐">🌐 Website</option>
      </select>
      <button type="submit">Add Link</button>
    </form>
  );
}

export default AddLinkForm;
