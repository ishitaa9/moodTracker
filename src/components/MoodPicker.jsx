import React, { useEffect, useState } from 'react';

const moods = [
    { emoji: "🌞", label: "Joyful" },
    { emoji: "⛅", label: "Calm" },
    { emoji: "🌧️", label: "Low" },
    { emoji: "🌪️", label: "Stressed" },
    { emoji: "🌻", label: "Grateful" },
    { emoji: "🍂", label: "Reflective" },
    { emoji: "🌊", label: "Peaceful" },
    { emoji: "🔥", label: "Motivated" },
    { emoji: "🌫️", label: "Anxious" },
    { emoji: "🌙", label: "Tired" },
    { emoji: "🌈", label: "Hopeful" },
    { emoji: "🌵", label: "Resilient" }
];

export default function MoodPicker({ onMoodSelect, onSave, editingEntry, clearEditing, showToast }) {
    const [ selectedMood, setSelectedMood ] = useState(editingEntry?.mood || null);
    const [ note, setNote ] = useState(editingEntry?.note || "");

    useEffect(() => {
        if (editingEntry) {
            setSelectedMood(editingEntry.mood);
            setNote(editingEntry.note);
        }
    }, [editingEntry]);

    const handleMoodClick = (mood) => {
        setSelectedMood(mood);
        onMoodSelect(mood);
    };

    const handleSave = () => {
        if (!selectedMood) return;

        const date = new Date().toISOString().split("T")[0];
        const newEntry = {
            date,
            mood: selectedMood,
            note: note.trim(),
        };

        onSave(newEntry);
        setSelectedMood(null);
        setNote("");
        clearEditing();

        showToast('Mood saved for today! ✅');
    };

    return (
        <div>
            <h2 style={{ display: "flex", justifyContent: "center"}}>How are you feeling today?</h2>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1rem", marginTop: "1rem", justifyContent: "center"}}>
                {moods.map((mood) => (
                    <button
                    key={mood.label}
                    onClick={() => handleMoodClick(mood)}
                    style={{
                        fontSize: "1.5rem",
                        padding: "0.5rem",
                        backgroundColor:
                            selectedMood?.label === mood.label ? "#bbf7d0" : "#e6f4ea",
                        border: "2px solid #a3b18a",
                        borderRadius: "50%",
                        cursor: "pointer",
                        boxShadow: selectedMood?.label === mood.label
                            ? "0 0 8px #a3b18a"
                            : "none",
                            transition: "0.3s ease-out",
                            transform: selectedMood?.label === mood.label ? "scale(1.1)" : "scale(1)",
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    >
                        {mood.emoji}
                    </button>
                ))}
            </div>
            {selectedMood && (
                <p style={{
                    marginTop: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                    textShadow: "2px 2px 4px rgba(93, 134, 93, 0.6), -2px -2px 4px rgba(144, 238, 144, 0.6)"
                }}>
                    You Feel {selectedMood.label}
                </p>
            )}
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", textAlign: "center" }}>
                    Want to add a note?
                </label>
                <textarea
                    rows="4"
                    value={note}
                    onChange={(e)=>setNote(e.target.value)}
                    placeholder="Write your thoughts here..."
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width:"70%",
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontFamily: "Inter, sans-serif",
                        resize: "vertical",
                    }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <button
                onClick={handleSave}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                    backgroundColor: "#a3b18a",
                    color: "#fff",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "1rem",
                }}
                disabled={!selectedMood}
            >
                Save Mood
            </button>
            </div>
        </div>
    );
}
