import { useEffect } from "react";
import "./proModal.css";

const ProModal = ({
  isProModalOpen,
  setIsProModalOpen,
  link,
  features = [],
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsProModalOpen(false);
      }
    };

    if (isProModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isProModalOpen, setIsProModalOpen]);

  if (!isProModalOpen) return null;

  return (
    <div className="pro-modal-overlay" onClick={() => setIsProModalOpen(false)}>
      <div className="pro-modal v2" onClick={(e) => e.stopPropagation()}>
        <button
          className="pro-modal-close"
          onClick={() => setIsProModalOpen(false)}
        >
          ✕
        </button>

        <div className="pro-modal-left">
          <div className="preview-wrapper">
            <span className="preview-label">Slider</span>

            <h3 className="animated-text">
              Discover Every Feature One Slide at a Time!
            </h3>

            <div className="floating-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="pro-modal-right">
          <h2 className="title-with-icon">
            <span className="title-icon">🔓</span>
            Unlock Advanced Slider Features{" "}
          </h2>
          <p className="subtitle">
            Upgrade once and remove all limitations. Enjoy more control, more
            features, and zero restrictions.
          </p>

          <h2>What You’ll Get with Pro</h2>
          {features.length > 0 && (
            <ul className="features">
              {features.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          <div className="actions">
            {/* Only one full-width button */}
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="upgrade-btn full-width"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProModal;
