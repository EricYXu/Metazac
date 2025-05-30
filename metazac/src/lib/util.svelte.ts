export function generateRandomNumbers(addNum1Tuple: number[], addNum2Tuple: number[], multiplyNum1Tuple: number[], multiplyNum2Tuple: number[], expoBaseTuple: number[], exponentTuple: number[], dividendTuple: number[], divisorTuple: number[], trueArray: boolean[]) {

    let validIndices = [];
    for (let i = 0; i < trueArray.length; i++) {
        if (trueArray[i] === true) {
            validIndices.push(i);
        }
    }
    let randomType = validIndices[Math.floor(Math.random() * validIndices.length)];

    if (randomType === 0) {
        let randomNumber1: number = Math.floor(Math.random() * (addNum1Tuple[1] - addNum1Tuple[0]) + addNum1Tuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (addNum2Tuple[1] - addNum2Tuple[0]) + addNum2Tuple[0]);
        let problemType: QuestionType = QuestionType.Addition;
        return { randomNumber1, randomNumber2, problemType };
    }
    else if (randomType === 1) {
        let randomNumber1: number = Math.floor(Math.random() * (addNum1Tuple[1] - addNum1Tuple[0]) + addNum1Tuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (addNum2Tuple[1] - addNum2Tuple[0]) + addNum2Tuple[0]);
        let problemType: QuestionType = QuestionType.Subtraction;
        randomNumber1 = randomNumber1 + randomNumber2;
        if (randomNumber1 === randomNumber2) {
            randomNumber1 += 1;
        }
        return { randomNumber1, randomNumber2, problemType };
    }
    else if (randomType === 2) {
        let randomNumber1: number = Math.floor(Math.random() * (multiplyNum1Tuple[1] - multiplyNum1Tuple[0]) + multiplyNum1Tuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (multiplyNum2Tuple[1] - multiplyNum2Tuple[0]) + multiplyNum2Tuple[0]);
        let problemType: QuestionType = QuestionType.Multiplication;
        return { randomNumber1, randomNumber2, problemType };
    }
    else if (randomType === 3) {
        let randomNumber1: number = Math.floor(Math.random() * (multiplyNum1Tuple[1] - multiplyNum1Tuple[0]) + multiplyNum1Tuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (multiplyNum2Tuple[1] - multiplyNum2Tuple[0]) + multiplyNum2Tuple[0]);
        let problemType: QuestionType = QuestionType.Division;
        while (randomNumber1 === 0 || randomNumber2 === 0) {
            randomNumber1 = Math.floor(Math.random() * (multiplyNum1Tuple[1] - multiplyNum1Tuple[0]) + multiplyNum1Tuple[0]);
            randomNumber2 = Math.floor(Math.random() * (multiplyNum2Tuple[1] - multiplyNum2Tuple[0]) + multiplyNum2Tuple[0]);
        }
        let product: number = randomNumber1 * randomNumber2;
        randomNumber1 = product;
        return { randomNumber1, randomNumber2, problemType };
    }
    else if (randomType === 4) {
        let randomNumber1: number = Math.floor(Math.random() * (expoBaseTuple[1] - expoBaseTuple[0]) + expoBaseTuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (exponentTuple[1] - exponentTuple[0]) + exponentTuple[0]);
        let problemType: QuestionType = QuestionType.Exponentiation;
        while (randomNumber1 === 0 || randomNumber2 === 0) {
            randomNumber1 = Math.floor(Math.random() * (expoBaseTuple[1] - expoBaseTuple[0]) + expoBaseTuple[0]);
            randomNumber2 = Math.floor(Math.random() * (exponentTuple[1] - exponentTuple[0]) + exponentTuple[0]);
        }
        return { randomNumber1, randomNumber2, problemType };
    }
    else if (randomType === 5) {
        let randomNumber1: number = Math.floor(Math.random() * (expoBaseTuple[1] - expoBaseTuple[0]) + expoBaseTuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (exponentTuple[1] - exponentTuple[0]) + exponentTuple[0]);
        let exponent = randomNumber1 ** randomNumber2;
        randomNumber2 = randomNumber1;
        randomNumber1 = exponent
        let problemType: QuestionType = QuestionType.Logarithm;
        return { randomNumber1, randomNumber2, problemType };
    }
    else {
        let randomNumber1: number = Math.floor(Math.random() * (dividendTuple[1] - dividendTuple[0]) + dividendTuple[0]);
        let randomNumber2: number = Math.floor(Math.random() * (divisorTuple[1] - divisorTuple[0]) + divisorTuple[0]);
        let problemType: QuestionType = QuestionType.Modulus;
        if (randomNumber2 > randomNumber1) {
            let temp = randomNumber1;
            randomNumber1 = randomNumber2;
            randomNumber2 = temp;
        }
        else if (randomNumber1 % randomNumber2 === 0) {
            randomNumber1 += 1
        }
        return { randomNumber1, randomNumber2, problemType };
    }
}

export class Question {
    leftNumber: number;
    rightNumber: number;
    problemType: QuestionType;

    constructor(leftNumber: number, rightNumber: number, problemType: QuestionType) {
        this.leftNumber = leftNumber;
        this.rightNumber = rightNumber;
        this.problemType = problemType;
    }

    getLeftNumber(): number {
        return this.leftNumber;
    }
    getRightNumber(): number {
        return this.rightNumber;
    }
    getProblemType(): QuestionType {
        return this.problemType;
    }
    getCorrectAnswer(): number {
        if (this.problemType === QuestionType.Addition) {
            return this.leftNumber + this.rightNumber;
        }
        else if (this.problemType === QuestionType.Subtraction) {
            return this.leftNumber - this.rightNumber;
        }
        else if (this.problemType === QuestionType.Multiplication) {
            return this.leftNumber * this.rightNumber;
        }
        else if (this.problemType === QuestionType.Division) {
            return this.leftNumber / this.rightNumber;
        }
        else if (this.problemType === QuestionType.Exponentiation) {
            return this.leftNumber ** this.rightNumber;
        }
        else if (this.problemType === QuestionType.Logarithm) {
            return Math.round(Math.log(this.leftNumber) / Math.log(this.rightNumber));
        }
        else {
            return this.leftNumber % this.rightNumber;
        }
    }
}

export enum QuestionType {
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Exponentiation,
    Logarithm,
    Modulus
}

export enum State {
    Before,
    Playing,
    Done
}
