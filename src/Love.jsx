import { useEffect, useState } from "react";

const slides = [
  { text: "🌹 Rose Day", date: "7th February", emoji: "🌹", poem: "A rose for the one who makes my world bloom." },
  { text: "💍 Propose Day", date: "8th February", emoji: "💍", poem: "With you, forever doesn’t feel long enough." },
  { text: "🍫 Chocolate Day", date: "9th February", emoji: "🍫", poem: "Life with you is sweeter than chocolate." },
  { text: "🧸 Teddy Day", date: "10th February", emoji: "🧸", poem: "I wish I could hug you every second." },
  { text: "🤝 Promise Day", date: "11th February", emoji: "🤝", poem: "My pinky promise — I’ll always choose you." },
  { text: "🤗 Hug Day", date: "12th February", emoji: "🤗", poem: "In your arms is my favorite place." },
  { text: "💋 Kiss Day", date: "13th February", emoji: "💋", poem: "One kiss from you feels like magic." },
  { text: "❤️ Valentine’s Day ❤️", date: "14th February", emoji: "💖", poem: "You are my today, tomorrow, and always." }
];

function Love() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    let i = 0;
    const textArray = Array.from(slides[index].text);
    setDisplayText("");

    const typing = setInterval(() => {
      setDisplayText(textArray.slice(0, i + 1).join(""));
      i++;
      if (i === textArray.length) clearInterval(typing);
    }, 50);

    return () => clearInterval(typing);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        duration: 3 + Math.random() * 3,
        size: 16 + Math.random() * 16
      };

      setHearts(prev => [...prev, newHeart]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sparkleArray = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 1 + Math.random() * 2,
      size: 2 + Math.random() * 3
    }));

    setSparkles(sparkleArray);
  }, []);

  useEffect(() => {
    if (index === slides.length - 1) {
      const pieces = Array.from({ length: 140 }).map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const velocity = 300 + Math.random() * 200;
        return {
          id: i,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`
        };
      });

      setConfetti(pieces);

      setTimeout(() => {
        setConfetti([]);
      }, 3000);
    }
  }, [index]);

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % slides.length);
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      {sparkles.map(s => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.left}vw`,
            top: `${s.top}vh`,
            width: s.size,
            height: s.size,
            backgroundColor: "white",
            borderRadius: "50%",
            animation: `twinkle ${s.duration}s infinite alternate`,
            opacity: 0.8
          }}
        />
      ))}

      {hearts.map(h => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}vw`,
            bottom: "-30px",
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s linear`,
            opacity: 0.6
          }}
        >
          ❤️
        </div>
      ))}

      {confetti.map(piece => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "8px",
            height: "8px",
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti 3s ease-out forwards`,
            transform: "translate(-50%, -50%)",
            "--vx": `${piece.vx}px`,
            "--vy": `${piece.vy}px`
          }}
        />
      ))}

      <div style={styles.container}>
        <h1 style={styles.title}>{displayText}</h1>
        <div style={styles.date}>{slides[index].date}</div>
        <div style={styles.poem}>{slides[index].poem}</div>
        <div style={styles.emoji}>{slides[index].emoji}</div>
        <button style={styles.button} onClick={nextSlide}>
          Next ❤️
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(-45deg, #ff6a88, #ff99ac, #ff4b6e, #ff758c)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 15s ease infinite",
    position: "relative",
    overflow: "hidden",
    color: "white",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  },
  glow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    zIndex: 0
  },
  container: {
    textAlign: "center",
    zIndex: 2
  },
  title: {
    fontSize: "2.5rem",
    minHeight: "60px"
  },
  date: {
    opacity: 0.8,
    letterSpacing: "2px"
  },
  poem: {
    margin: "10px 0",
    fontSize: "1.2rem"
  },
  emoji: {
    fontSize: "6rem",
    marginTop: "20px"
  },
  button: {
    marginTop: "25px",
    padding: "12px 30px",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    background: "white",
    color: "#ff416c",
    cursor: "pointer"
  }
};

export default Love;
