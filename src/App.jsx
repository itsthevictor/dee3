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
const createPack = pack().size([500, 480]).padding(20);
const animalsPack = createPack(animalHierarchy()).descendants();

// create tree method and tree object
const createTree = tree().size([500, 470]);
const animalsTree = createTree(animalHierarchy());

const prepareData = () => {
  return animalsPack.map((packItem, i) => ({
    packItem,
    treeItem: animalsTree.descendants()[i],
  }));
};

console.log(prepareData());

const colors = ["#eaf4f4", "#cce3de", "#a4c3b2", "#6b9080"];
// math.sqrt(a^2 + b^2) = c

const lineLength = (x1, y1, x2, y2) => {
  const a = y1 - y2;
  const b = x1 - x2;
  return Math.sqrt(a ** 2 + b ** 2);
};

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="container">
      <h1>Morphing visualizations with d3</h1>{" "}
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      <svg className="main-svg">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" />
          </filter>
        </defs>
        <g transform="translate(0,10)">
          {animalsTree
            .links()
            .map(
              ({ source: { x: x1, y: y1 }, target: { x: x2, y: y2 } }, i) => (
                <line
                  key={i}
                  x1={x1}
                  x2={x2}
                  y1={y1}
                  y2={y2}
                  stroke="darkgray"
                  style={{
                    opacity: toggle ? 1 : 0,
                    transition: "all 2s",
                    strokeDasharray: lineLength(x1, y1, x2, y2),
                    strokeDashoffset: toggle ? 0 : lineLength(x1, y1, x2, y2),
                  }}
                />
              )
            )}
          {prepareData().map(
            ({
              treeItem: {
                x,
                y,
                data: { name },
                depth,
              },
              packItem: { x: cx, y: cy, r },
            }) => (
              <circle
                key={name}
                cx={toggle ? x : cx}
                cy={toggle ? y : cy}
                r={toggle ? 10 : r}
                fill={colors[depth]}
                style={{ filter: "url(#shadow)" }}
              />
            )
          )}
        </g>
      </svg>
    </div>
  );
}

export default App;
