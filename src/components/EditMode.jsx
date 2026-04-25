const EditMode = ({
  value,
  setValue,
  handleKeyDown,
  handleSave,
  handleCancel,
  textarea,
}) => {
  return (
    <div role="group" className="edit-mode">
      <div className="button-group">
        <button onClick={handleSave}>✔️</button>
        <button onClick={handleCancel}>❌</button>
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={setValue}
          onKeyDown={handleKeyDown}
          autoFocus
          rows="4"
        ></textarea>
      ) : (
        <input
          value={value}
          onChange={setValue}
          onKeyDown={handleKeyDown}
          autoFocus // focus input immediately on edit
        />
      )}
    </div>
  );
};

export default EditMode;
