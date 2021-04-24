export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const getEls = (selector, parent = document) => parent.querySelectorAll(selector);

export const generateLottoNum = () => {
    const MAX_SIZE = 6;
    const numbers = new Set();

    while (numbers.size < MAX_SIZE) {
        const number = Math.floor(Math.random() * 45) + 1;
        numbers.add(number);
    }

    return [...numbers];
};

export const checkLottos = (lottos, lottoNums) => {
    const map = new Map();
    const [bonusNum] = lottoNums.splice(6, 1);
    lottos.forEach(lotto => {
        let matcingCount = lottoNums.reduce((count, num) => {
            if (lotto.includes(num)) count++;
            return count;
        }, 0);

        if (matcingCount < 3) return;
        if (matcingCount === 5 && lotto.includes(bonusNum)) matcingCount = 5.5;
        let value = map.get(matcingCount) ?? 0;
        map.set(matcingCount + '', ++value);
    });
    return map;
};

export const calcEarningRate = (purchasedPrice, winLottos) => {
    const prizeMoney = {
        '3': 5000,
        '4': 50000,
        '5': 1500000,
        '5.5': 30000000,
        '6': 2000000000,
    }

    const totalPrizeMoney = [...winLottos].reduce((money, winLotto) => {
        const [grade, count] = winLotto;
        return money + prizeMoney[grade] * count;
    }, 0) - purchasedPrice;

    return (totalPrizeMoney / purchasedPrice) * 100;
};
