import React from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        width: "300px",
        textAlign: "center"
      }}>
        <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>
          ⚠️ This will delete your mood entry forever.
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#e5e7eb",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
