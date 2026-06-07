"use client";

import { useMediaActions } from "../hooks/useMediaActions";

export function MediaActions() {
  const { completed, toggleCompleted } = useMediaActions();

  return (
    <div className="media-actions">
      <button className="action" type="button">Vota</button>
      <button className="action" type="button">Recensisci</button>
      <button className="action" type="button">+ Lista</button>
      <button className="action" onClick={toggleCompleted} type="button">
        {completed ? "Completato" : "Segna completato"}
      </button>
    </div>
  );
}
