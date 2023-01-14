import crfsuite from "crfsuite";

import generateDataStream from "./training";

class Trainer {
  trainer: any;

  constructor() {
    this.trainer = new crfsuite.Trainer();
  }

  append(data_path, count, offset) {
    return new Promise((resolve, reject) => {
      const dataStream = generateDataStream(data_path, count, offset);

      dataStream.on("data", ([xseq, yseq]) => {
        this.trainer.append(xseq, yseq);
      });

      dataStream.on("end", resolve);
      dataStream.on("error", reject);
    });
  }

  train(model_filename) {
    this.trainer.train(model_filename);
  }
}

export default Trainer;
