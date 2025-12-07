import { useState } from "react";
import "./App.css";

import Controls from "./components/Controls";
import Tiles from "./components/Tiles";

import { bubbleNextStep } from "./algorithms/bubbleSort";
import { selectionNextStep } from "./algorithms/selectionSort";
import { insertionNextStep } from "./algorithms/insertionSort";
import { linearNextStep } from "./algorithms/linearSearch";
import { binaryNextStep } from "./algorithms/binarySearch";

export default function App() {
  //user data

  const [numbers, setNumbers] = useState([]);
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("");

  //Algorithm
  const [algorithm, setAlgorithm] = useState("bubble");

  //Pointer States
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(null);

  //Highlighting the comaprison numbers
  const [comparePair, setComparePair] = useState([0, 1]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [stepText, setStepText] = useState("");

  //reset
  const reset = () => {
    setI(0);
    setJ(0);
    setMinIndex(0);
    setLow(0);
    setHigh(0);
    setMid(null);
    setComparePair([0, 1]);
    setRunning(false);
    setDone(false);
    setStepText("");
  };

  //Taking the input
  const setUserNumbers = () => {
    reset();
    const list = input
      .split(",")
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n));
    setNumbers(list);
  };

  const randomNumbers = () => {
    reset();
    setNumbers(
      Array.from({ length: 8 },
        () => Math.floor(Math.random() * 90) + 10)
    );
  };

  //Let's start.....
  const startAlgo = () => {
    if (numbers.length === 0)
      return alert("Add numbers first!");
    setRunning(true);
    if (algorithm === "binary") {
      setLow(0);
      setHigh(numbers.length - 1);
    }
  };

  const nextStep = () => {
    if (!running || done) return;
    const arr = [...numbers];

    //For Bubble Sort
    if (algorithm === "bubble") {
      if (i >= arr.length - 1) {
        setDone(true);
        return;
      }

      // store highlight FIRST
      setComparePair([j, j + 1]);
      setStepText(`Comparing ${arr[j]} & ${arr[j + 1]}`);
      const r = bubbleNextStep(arr, i, j);
      setNumbers(r.updatedArray);
      if (j >= arr.length - i - 2) {
        setJ(0);
        setI(p => p + 1);
      } else {
        setJ(p => p + 1);
      }
    }

    //SELECTION SORT 
    else if (algorithm === "selection") {
      if (i >= arr.length - 1) {
        setDone(true);
        return;
      }

      setComparePair([j, minIndex]);
      setStepText(`Selecting minimum for index ${i}`);
      const r = selectionNextStep(arr, i, j, minIndex);
      setNumbers(r.updatedArray);
      setI(r.nextI);
      setJ(r.nextJ);
      setMinIndex(r.minIndex);
    }

    //INSERTION SORT 
    else if (algorithm === "insertion") {

      if (i >= arr.length - 1) {
        setDone(true);
        return;
      }

      setComparePair([j, j + 1]);
      setStepText(`Inserting element`);
      const r = insertionNextStep(arr, i, j);

      setNumbers(r.updatedArray);
      setI(r.nextI);
      setJ(r.nextJ);
    }

    //LINEAR SEARCH 
    else if (algorithm === "linear") {

      setComparePair([i, i]);
      setStepText(`Checking index ${i}`);
      const r = linearNextStep(arr, i, parseInt(target));

      if (r.found) {
        setStepText(`Found ${target} at index ${i}`);
        setDone(true);
        return;
      }

      if (r.done) {
        setStepText("Element not found");
        setDone(true);
        return;
      }
      setI(r.nextIndex);
    }

    //BINARY SEARCH 
    else if (algorithm === "binary") {
      setComparePair([mid, mid]);
      const r =
        binaryNextStep(arr, low, high, parseInt(target));
      setMid(r.mid);
      if (r.found) {
        setStepText(`Found ${target} at index ${r.mid}`);
        setDone(true);
        return;
      }

      if (r.done) {
        setStepText("Element not found");
        setDone(true);
        return;
      }
      setLow(r.nextLow);
      setHigh(r.nextHigh);
    }
  };


  //COMPLEXITY 
  const complexity = {
    bubble: "Time O(n²) | Space O(1)",
    selection: "Time O(n²) | Space O(1)",
    insertion: "Time O(n²) | Space O(1)",
    linear: "Time O(n) | Space O(1)",
    binary: "Time O(log n) | Space O(1)"
  };


  return (

    <div className="app">

      <h1>
        AlgoLearn
        <span className="subtitle">
          Array Algorithm Visualizer
        </span>
      </h1>

      <Controls
        input={input}
        setInput={setInput}
        target={target}
        setTarget={setTarget}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        randomNumbers={randomNumbers}
        setUserNumbers={setUserNumbers}
        startAlgo={startAlgo}
        nextStep={nextStep}
      />

      <Tiles
        numbers={numbers}
        algorithm={algorithm}
        activeIndex={i}
        comparePair={comparePair}
        mid={mid}
        done={done}
      />

      {!done && (<p className="step">
        {stepText}
      </p>)}
      
      {done && <p className="complexity">
          {complexity[algorithm]}
        </p>
      }

    </div>
  );
}
