import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [noPosition, setNoPosition] = useState({
    top: "60%",
    left: "55%"
  });

  const moveButton = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();

    const buttonWidth = 120;
    const buttonHeight = 50;

    const maxX = wrapperRect.width - buttonWidth;
    const maxY = wrapperRect.height - buttonHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setNoPosition({
      left: x + "px",
      top: y + "px"
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heart}>❤️</div>
        <h1 style={styles.heading}>Will you be my Valentine?</h1>

        <div style={styles.buttonWrapper} ref={wrapperRef}>
          <button
            style={styles.yesBtn}
            onClick={() => navigate("/love")}
          >
            Yes
          </button>

          <button
            style={{ ...styles.noBtn, ...noPosition }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    fontFamily: "Arial",
    overflow: "hidden",
    padding: "20px",
    boxSizing: "border-box"
  },
  container: {
    textAlign: "center",
    width: "100%",
    maxWidth: "400px"
  },
  heart: {
    fontSize: "clamp(60px, 12vw, 90px)"
  },
  heading: {
    fontSize: "clamp(22px, 5vw, 32px)",
    margin: "20px 0"
  },
  buttonWrapper: {
    position: "relative",
    width: "100%",
    height: "200px",
    marginTop: "20px"
  },
  yesBtn: {
  padding: "14px 28px",
  fontSize: "18px",
  border: "none",
  borderRadius: "30px",
  backgroundColor: "#ff4b5c",
  color: "white",
  cursor: "pointer",
  outline: "none",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none"
},

noBtn: {
  padding: "14px 28px",
  fontSize: "18px",
  border: "none",
  borderRadius: "30px",
  backgroundColor: "white",
  position: "absolute",
  cursor: "pointer",
  transition: "all 0.3s ease",
  outline: "none",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none"
}

};

export default Landing;
