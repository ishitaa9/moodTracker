import React, { useEffect, useState } from 'react';
import MoodPicker from './components/MoodPicker';
import AmbientPlayer from './components/AmbientPlayer';
import MoodHisory from './components/MoodHistory';
import MoodCalendar from './components/MoodCalendar';
import { quotes } from './data/quotes';

function App() {
  const [mood, setMood] = useState(null);
  const [history, setHistory] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [toast, setToast] = useState("");
  const [quote, setQuote] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(stored);
  }, []);

  useEffect(() => {
    if (mood) {
      // convert the mood to lowercase to match the quotes keys
      const moodStr = mood.label.toLowerCase();

      // log the final moodStr
      console.log("Mood after conversion:", moodStr);

      // if quotes exist for the mood
      const moodQuotes = quotes[moodStr];

      // console.log("Quotes for this mood:", moodQuotes);

      if (moodQuotes && moodQuotes.length > 0) {
        const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
        setQuote(randomQuote);
      } else {
        setQuote("No quote available for this mood.");
      }
    }
  }, [mood]);


  const handleMoodSave = (newEntry) => {
    const filtered = history.filter((entry) => entry.date !== newEntry.date);
    const updated = [...filtered, newEntry];

    localStorage.setItem("moodHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (date) => {
    const updated = history.filter((entry) => entry.date !== date);
    localStorage.setItem("moodHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const handleMoodSelect = (mood) => {
    setMood(mood);
    console.log("Mood selected: ", mood);
  };

  return (
    <>
      <div style={{ padding: '2rem', fontFamily: "sans-serif" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>🌈 Daily Mood Tracker</h1>
        <p style={{ display: "flex", justifyContent: "center" }}> Let's track how you're feeling today</p>
        <blockquote style={{
          display: "flex",
          justifyContent: "center",
          fontStyle: 'italic',
          color: '#4a635d',
          margin: '1rem 0',
        }}>
          {quote ? `"${quote}"` : "“Be like a tree. Stay grounded, and keep growing.”"}
        </blockquote>
        <MoodPicker
          onMoodSelect={handleMoodSelect}
          onSave={handleMoodSave}
          editingEntry={editingEntry}
          clearEditing={() => setEditingEntry(null)}
          showToast={showToast}
        />
        <AmbientPlayer />
        <MoodCalendar history={history} />
        <MoodHisory history={history} onDelete={handleDelete} handleEdit={handleEdit} />
      </div>
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fefce8",
          color: "#065f46",
          padding: "0.75rem 1.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          fontSize: "0.9rem"
        }}>
          {toast}
        </div>
      )}
    </>
  );
}

export default App;
