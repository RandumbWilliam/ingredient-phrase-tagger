import path from "path";

import Trainer from "./trainer";
import Tagger from "./tagger";

const data_path = path.join(__dirname, "nyt-ingredients-snapshot-2015.csv");
const model_filename = path.join(__dirname, "model.crfsuite");

const Train = () => {
  const trainer = new Trainer();

  trainer.append(data_path, 20000, 0).then(() => {
    trainer.train(model_filename);
  });
};

const Tag = () => {
  const tagger = new Tagger();

  const is_opened = tagger.open(model_filename);
  console.log("File model is opened:", is_opened);

  const input = [
    "1 pound carrots, young ones if possible",
    "Kosher salt, to taste",
    "2 tablespoons sherry vinegar",
    "2 tablespoons honey",
    "2 tablespoons extra-virgin olive oil",
    "1 medium-size shallot, peeled and finely diced",
    "1/2 teaspoon fresh thyme leaves, finely chopped",
    "Black pepper, to taste",
  ];

  const data = tagger.tag(input);
  console.log(data);
};

Tag();
