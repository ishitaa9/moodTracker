import React, {useRef, useState } from 'react';

export default function AmbientPlayer() {
    const audioRef = useRef(null);
    const [ playing, setPlaying ] = useState(false);

    const togglePlay = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing)
    };

    return (
        <div style={{ marginTop: "2rem "}}>
            <button
                onClick={togglePlay}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    backgroundColor: "#a3b18a",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                }}
            >
                {playing ? "Pause Music 🎵" : "Play Music 🌿"}
            </button>
            <audio ref={audioRef} loop>
                <source src='/ambient.mp3' type='audio/mpeg' />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}