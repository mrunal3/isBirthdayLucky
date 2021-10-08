import React from "react";
import "./App.css";
import { useState } from "react";
import birthday from "./images/birthday.png";

export default function App() {
  const initialState = {
    dob: "",
    number: "",
  };
  const [localState, setLocalState] = useState({ ...initialState });
  const [lucky, setLucky] = useState(false);
  const [unlucky, setUnlucky] = useState(false);

  const checkLuckyNumber = () => {
    let sum = 0;
    localState.dob
      .replaceAll("-", "")
      .split("")
      .forEach((digit) => {
        sum += Number(digit);
      });
    if (sum % Number(localState.number) === 0) {
      handleLucky();
    } else {
      handleUnlucky();
    }
  };

  const handleLucky = () => {
    setLucky(true);
    setUnlucky(false);
  };

  const handleUnlucky = () => {
    setLucky(false);
    setUnlucky(true);
  };

  const hideAll = () => {
    setLucky(false);
    setUnlucky(false);
  };

  return (
    <>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${birthday})` }}
      ></div>
      <div className="App">
        <div>
          <h1 className="heading">Is your Birthday Lucky? 🤔</h1>
          <label className="input-label" htmlFor="dob">
            Select your Birth date:
          </label>
          <input
            className="input"
            id="dob"
            type="date"
            value={localState.dob || ""}
            onChange={(e) => {
              hideAll();
              setLocalState({ ...localState, dob: e.target.value });
            }}
          />

          <label className="input-label" htmlFor="lucky_number">
            Enter your Lucky Number:
          </label>
          <input
            min="1"
            step="1"
            className="input"
            id="lucky_number"
            type="number"
            value={localState.number || ""}
            disabled={localState.dob !== "" ? false : true}
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              hideAll();
              if (e.target.value > 0) {
                setLocalState({ ...localState, number: e.target.value });
              } else if (e.target.value === "") {
                setLocalState({ ...localState, number: e.target.value });
              }
            }}
          />

          <button
            id="check-button"
            className={
              localState.dob !== "" && localState.number !== ""
                ? "enabled"
                : "disabled"
            }
            disabled={
              localState.dob !== "" && localState.number !== "" ? false : true
            }
            onClick={() => {
              checkLuckyNumber();
            }}
          >
            CHECK
          </button>
          <p className={lucky ? "" : "hide"}>
            {localState.number} is a lucky number!! 🥳 🥳 🥳
          </p>
          <p className={unlucky ? "" : "hide"}>
            {localState.number} is not that lucky 😕
          </p>
        </div>
      </div>
    </>
  );
}
