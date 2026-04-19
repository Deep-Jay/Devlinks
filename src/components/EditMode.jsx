const EditMode = ({
  value,
  setValue,
  handleKeyDown,
  handleSave,
  handleCancel,
}) => {
  return (
    <div role="group" className="edit-mode">
      <div className="button-group">
        <button onClick={handleSave}>✔️</button>
        <button onClick={handleCancel}>❌</button>
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus // focus input immediately on edit
      />
    </div>
  );
};

export default EditMode;
