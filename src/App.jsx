import { pack, hierarchy, tree } from "d3";
import { useState } from "react";

const data = {
  name: "animals",
  children: [
    {
      name: "fish",
      children: [
        {
          name: "Marine",
          children: [{ name: "halibut" }],
        },
        {
          name: "fresh water",
          children: [{ name: "rainbow trout" }],
        },
      ],
    },
    {
      name: "mammals",
      children: [{ name: "dog" }, { name: "cat" }, { name: "mouse" }],
    },
  ],
};

// create hierarchy object with function
const animalHierarchy = () => hierarchy(data).sum(() => 1);

// create pack method and pack object
const createPack = pack().size([500, 500]).padding(20);
const animalsPack = createPack(animalHierarchy());

// create tree method and tree object
const createTree = tree().size([500, 480]);
const animalsTree = createTree(animalHierarchy());

console.log(animalsTree.links());

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="container">
      <h1>Morphing visualizations with d3</h1>{" "}
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      <svg className="main-svg">
        {toggle ? (
          <g transform="translate(0,10)">
            {animalsTree
              .links()
              .map(
                ({ source: { x: x1, y: y1 }, target: { x: x2, y: y2 } }, i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="black"
                  />
                )
              )}
            {animalsTree.descendants().map(({ x, y, data: { name } }) => (
              <circle key={name} cx={x} cy={y} r={10} />
            ))}
          </g>
        ) : (
          animalsPack
            .descendants()
            .map(({ x, y, r }, i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                fill="transparent"
                stroke="black"
              />
            ))
        )}
      </svg>
    </div>
  );
}

export default App;
