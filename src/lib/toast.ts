// Lightweight toast without external deps
type ToastType = "success" | "error" | "info";

function show(message: string, type: ToastType = "info") {
  if (typeof window === "undefined") return;

  const el = document.createElement("div");
  const colors: Record<ToastType, string> = {
    success: "#22c55e",
    error:   "#ef4444",
    info:    "#c8a97e",
  };

  Object.assign(el.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "9999",
    background: "#141414",
    border: `1px solid ${colors[type]}44`,
    color: "#e5e5e5",
    padding: "12px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    maxWidth: "360px",
    opacity: "0",
    transform: "translateY(8px)",
    transition: "opacity 220ms ease, transform 220ms ease",
    pointerEvents: "none",
  });

  const dot = document.createElement("span");
  dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${colors[type]};flex-shrink:0`;
  el.appendChild(dot);
  el.appendChild(document.createTextNode(message));
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    setTimeout(() => el.remove(), 240);
  }, 3200);
}

export const toast = {
  success: (msg: string) => show(msg, "success"),
  error:   (msg: string) => show(msg, "error"),
  info:    (msg: string) => show(msg, "info"),
};
