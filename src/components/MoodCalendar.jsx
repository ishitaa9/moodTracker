import React from "react";

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export default function MoodCalendar({ history, handleEdit }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const entriesByDate = {};
  history.forEach((entry) => {
    entriesByDate[entry.date] = entry;
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // Sunday = 0
  const paddingStart = firstDay === 0 ? 6 : firstDay - 1;

  const calendarDays = [];
  for (let i = 0; i < paddingStart; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    calendarDays.push({
      day,
      entry: entriesByDate[dateStr] || null,
    });
  }

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>🗓️ Your Mood Calendar — {today.toLocaleString("default", { month: "long" })}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "0.5rem",
          marginTop: "1rem",
          backgroundColor: "#f0fdf4",
          padding: "1rem",
          borderRadius: "16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} style={{ fontWeight: "bold", textAlign: "center", color: "#4a635d" }}>
            {day}
          </div>
        ))}

        {calendarDays.map((cell, idx) => (
          <div
            key={idx}
            className={`mood-cell`}
            style={{
              position: "relative",
              height: "60px",
              borderRadius: "12px",
              backgroundColor: cell?.entry ? "#d9f99d" : "#fefce8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              fontSize: "1rem",
              color: "#374151",
              boxShadow: cell?.entry ? "inset 0 0 0 2px #4ade80" : "inset 0 0 0 1px #e2e8f0",
              cursor: cell?.entry?.note ? "pointer" : "default",
            }}
          >
            {cell ? (
              <>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{cell.day}</div>
                <div style={{ fontSize: "1.2rem" }}>
                  {cell.entry?.mood?.emoji}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
