import React, { useRef, useEffect, useState } from "react";
import "./block.css";
import Draggable from "react-draggable";

const Block = ({ index, timestamp, data, proof, previous_hash, position }) => {
  const blockRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (blockRef.current) {
        const rect = blockRef.current.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Draggable>
      <div
        className={`blockCard ${isVisible ? "in-view" : ""}`}
        ref={blockRef}
        style={position}
      >
        <div className="label">Index:</div>
        <div>{index}</div>
        <div className="label">Timestamp:</div>
        <div>{timestamp}</div>
        <div className="label">Data:</div>
        <div>{data}</div>
        <div className="label">Proof:</div>
        <div>{proof}</div>
        <div className="label">Previous Hash:</div>
        <div>{previous_hash}</div>
      </div>
    </Draggable>
  );
};

export default Block;
