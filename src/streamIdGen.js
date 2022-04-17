const options = [
  "Tree",
  "Race",
  "Rice",
  "Keep",
  "Lace",
  "Beam",
  "Game",
  "Mars",
  "Tide",
  "Ride",
  "Hide",
  "Exit",
];

const generate = () => {
  const name = options[Math.floor(Math.random() * options.length)];

  return name.toLowerCase();
};

generate();

export default generate;
