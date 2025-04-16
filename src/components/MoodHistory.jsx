import React, { useEffect, useState } from "react";
import ConfirmModal from './ConfirmModal';

export default function MoodHisory({ history, onDelete, handleEdit }) {
    const [localHistory, setLocalHistory] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("moodHistory")) || [];
      const sorted = stored.sort((a, b) => new Date(b.date) - new Date(a.date));
      setLocalHistory(sorted);
    }, [history]);

    const triggerDelete = (date) => {
      setSelectedDate(date);
      setModalOpen(true);
    };

    const confirmDelete = () => {
      onDelete(selectedDate);
      setModalOpen(false);
      setSelectedDate(null);
      // trigger toast from parent
      if (typeof window !== "undefined" && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent("moodDeleted"));
      }
    };

    return (
      <>
        <ConfirmModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
        />

        <div style={{ marginTop: "3rem" }}>
          <h2>Your Mood History</h2>
          <div style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxHeight: "300px",
            overflowY: "auto",
            paddingRight: "1rem"
          }}>
            {localHistory.map((entry) => (
              <div key={`${entry.date}-${entry.mood.label}`} style={{
                width: "35%",
                border: "1px solid #cce3d2",
                borderRadius: "12px",
                padding: "1.5rem",
                backgroundColor: "#f0fdf4",
                boxShadow: "0 1px 4px rgba(0,0,0,0.5)"
              }}>
                <div style={{ fontSize: "17px", marginBottom: "0.3rem" }}>
                  {entry.mood.emoji} <strong>{entry.mood.label}</strong> - <em>{entry.date}</em>
                </div>
                {entry.note && (
                  <div style={{ color: "#4a4a4a", marginTop: "0.5rem", fontSize: "14px" }}>
                    <strong>Note:</strong> {entry.note}
                  </div>
                )}
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <button
                    onClick={() => handleEdit(entry)}
                    style={{
                      backgroundColor: "#bbf7d0",
                      border: "none",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "#1e6e3b",
                      marginTop: "6px"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => triggerDelete(entry.date)}
                    style={{
                      backgroundColor: "#fecaca",
                      border: "none",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "#7f1d1d",
                      marginTop: "6px"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
