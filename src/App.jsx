import { pack, hierarchy } from "d3";

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

const animalHierarchy = hierarchy(data).sum(() => 1);
const createPack = pack().size([500, 500]).padding(20);
const animalsPack = createPack(animalHierarchy);
console.log(animalsPack.descendants());

function App() {
  return (
    <>
      <svg className="main-svg">
        {animalsPack.descendants().map(({ x, y, r }) => (
          <circle cx={x} cy={y} r={r} fill="transparent" stroke="black" />
        ))}
      </svg>
    </>
  );
}

export default App;
