export default function Controls({
  input,
  setInput,
  target,
  setTarget,
  algorithm,
  setAlgorithm,
  randomNumbers,
  setUserNumbers,
  startAlgo,
  nextStep
}){

  return(
    <div className="controls">
      <input
        placeholder="Enter array: "
        value={input}
        onChange={e=>setInput(e.target.value)}
      />

      <button onClick={setUserNumbers}>
        Use Input
      </button>

      <button onClick={randomNumbers}>
        Random
      </button>

      <select
        value={algorithm}
        onChange={e=>setAlgorithm(e.target.value)}
      >

        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="linear">Linear Search</option>
        <option value="binary">Binary Search</option>

      </select>

      {(algorithm==="linear" || algorithm==="binary") &&
        <input
          placeholder="Target"
          value={target}
          onChange={e=>setTarget(e.target.value)}
        />
      }

      <button onClick={startAlgo}>
        Start
      </button>

      <button onClick={nextStep}>
        Next Step
      </button>

    </div>
  );
}
