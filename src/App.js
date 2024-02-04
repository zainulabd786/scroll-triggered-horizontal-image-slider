import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const stickyRef = useRef([]);
  const [centerImageIndex, setCenterImageIndex] = useState(null);
  const images = useMemo(
    () => [
      "https://placeholder.com/640x360",
      "https://placeholder.com/640x360",
      "https://placeholder.com/640x360",
      "https://placeholder.com/640x360",
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      transform(stickyRef.current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transform = (section) => {
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector(".scroll__section");
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = Math.max(0, Math.min(percentage, 200));
    scrollSection.style.transform = `translate3d(-${percentage}vw, 0, 0)`;

    // Determine the center image
    const centerIndex = Math.round(percentage / 40);
    if (centerImageIndex !== centerIndex) {
      setCenterImageIndex(centerIndex);
    }
  };

  return (
    <div className="App">
      <section>
        <div className="container">
          <h1>Hybrid Scroll</h1>
          <p>Lorem ipsum...</p>
          <p>Lorem ipsum...</p>
        </div>
      </section>

      {/* Sticky Parent Section */}
      <div className="sticky__parent">
        <div className="sticky" ref={stickyRef}>
          <div className="scroll__section">
            {images.map((src, index) => (
              <img
                src={src}
                key={index}
                className={index === centerImageIndex ? "center-image" : ""}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <section>
        <div className="container">
          <h1>End Scroll</h1>
          <p>Lorem ipsum...</p>
          <p>Lorem ipsum...</p>
        </div>
      </section>
    </div>
  );
};

export default App;
