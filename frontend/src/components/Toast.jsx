import React from "react";

/**
 * Toast notification component.
 *
 * Props:
 *  - message  {string}   - Text to display inside the toast.
 *  - type     {string}   - "error" | "success" | "info"  (defaults to "error")
 *  - duration {number}   - ms before auto-dismiss       (defaults to 3000)
 *  - onClose  {function} - callback fired when the toast closes.
 */
function Toast({ message, type = "error", duration = 3000, onClose }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const iconMap = {
    error: "✕",
    success: "✓",
    info: "ℹ",
  };

  if (!visible) return null;

  return (
    <div className={`toast toast--${type}`} role="alert" aria-live="assertive">
      <span className="toast__icon">{iconMap[type]}</span>
      <span className="toast__message">{message}</span>
      <button
        className="toast__close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
