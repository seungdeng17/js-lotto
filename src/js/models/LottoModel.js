import { generateLottoNumber } from '../utils.js';

class LottoModel {
    constructor() {
        this.lottos = [];
    }

    get lottos() {
        return this._lottos;
    }

    set lottos(price) {
        const count = price / 1000;
        this._lottos = Array.from({ length: count }, () => generateLottoNumber());
    }
}

export default LottoModel