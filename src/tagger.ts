import crfsuite from "crfsuite"

import {importData, exportData} from "./utils";

class Tagger {
    tagger: any;

    constructor() {
        this.tagger = new crfsuite.Tagger();
    }

    open(model_filename) {
        return this.tagger.open(model_filename);
    }

    close() {
        return this.tagger.close();
    }

    tag(input) {
        const data = exportData(input);

        const instances = data.map(xeq => {
            const yseq = this.tagger.tag(xeq);
            return [xeq, yseq];
        });

        return importData(instances);
    }
}

export default Tagger;