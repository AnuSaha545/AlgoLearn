export default function Tiles({
  numbers,
  algorithm,
  activeIndex,
  comparePair,
  mid,
  done
}) {

  return (
    <div className="tiles">
      {numbers.map((num, index) => {
        let cls = "tile";

        //SORT HIGHLIGHT FROM comparePair
        if (
          algorithm !== "linear" &&
          algorithm !== "binary" &&
          comparePair &&
          (index === comparePair[0] || index === comparePair[1])
        ) {
          cls += " active";
        }

        //LINEAR SEARCH POINTER
        if (
          algorithm === "linear" &&
          index === activeIndex
        ) {
          cls += " active";
        }

        // BINARY SEARCH MID POINTER
        if (
          algorithm === "binary" &&
          index === mid
        ) {
          cls += " mid";
        }

        //FINISHED STATE
        if (done) {
          cls += " done";
        }

        return (
          <div key={index} className={cls}>
            {num}
          </div>
        );
      })}

    </div>
  );
}
