import React, { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) =>
        onSelectMode(e.matches ? "dark" : "light")
      );

    onSelectMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  const onSelectMode = (mode) => {
    setMode(mode);
    if (mode === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  };

  return (
    <div className="header">
      <div className="title">Countries of the world</div>
      <div className="switch">
        {mode === "dark" ? (
          <div className="dark-toggle" onClick={() => onSelectMode("light")}>
            🔆 Light mode
          </div>
        ) : (
          <div className="dark-toggle" onClick={() => onSelectMode("dark")}>
            🌙 Dark mode
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
