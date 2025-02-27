"use client";
import "./switchbutton.css";
import React, { useState } from "react";

interface Props {
  onSwitch: boolean;
  setOnSwitch:() => void ;
}

export const SwitchButton: React.FC<Props> = ({ onSwitch, setOnSwitch }) => {
  return (
    <div className="switchbutton-outline" onClick={() => setOnSwitch()}>
      <div className={`switchbutton ${onSwitch ? "active" : ""}`}>
        <div className="switchbutton-slide"></div>
      </div>
    </div>
  );
};
