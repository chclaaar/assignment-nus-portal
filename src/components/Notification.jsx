const icons = { error: "!", success: "✓", info: "i" };

export default function Notification({ notice, onClose }) {
  if (!notice) return null;
  const { type = "error", title, text } = notice;

  return (
    <div
      className={`notification notification-${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      <span className="notification-icon" aria-hidden="true">{icons[type]}</span>
      <div className="notification-body">
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <button type="button" className="notification-close" onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
