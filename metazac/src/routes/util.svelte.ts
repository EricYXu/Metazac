const QUESTIONTYPECOUNT = 4;

export function generateRandomNumbers(addSubtractLower: number, addSubtractUpper: number, multiplyDivideLower: number, multiplyDivideUpper: number) { 
    let randomType = Math.floor(Math.random() * QUESTIONTYPECOUNT); 
    if (randomType === 0) {
        let randomNumber1: number = Math.floor(Math.random() * (addSubtractUpper - addSubtractLower) + addSubtractLower);
        let randomNumber2: number = Math.floor(Math.random() * (addSubtractUpper - addSubtractLower) + addSubtractLower);
        let problemType: QuestionType = QuestionType.Addition;
        return {randomNumber1, randomNumber2, problemType};
    }
    else if (randomType === 1) {
        let randomNumber1: number = Math.floor(Math.random() * (addSubtractUpper - addSubtractLower) + addSubtractLower);
        let randomNumber2: number = Math.floor(Math.random() * (addSubtractUpper - addSubtractLower) + addSubtractLower);
        let problemType: QuestionType = QuestionType.Subtraction;
        if (randomNumber1 < randomNumber2) {
            let temp = randomNumber2;
            randomNumber2 = randomNumber1;
            randomNumber1 = temp;
        }
        else if (randomNumber1 === randomNumber2) {
            randomNumber1 += 1;
        }
        return {randomNumber1, randomNumber2, problemType};
    }
    else if (randomType === 2) {
        let randomNumber1: number = Math.floor(Math.random() * (multiplyDivideUpper - multiplyDivideLower) + multiplyDivideLower);
        let randomNumber2: number = Math.floor(Math.random() * (multiplyDivideUpper - multiplyDivideLower) + multiplyDivideLower);
        let problemType: QuestionType = QuestionType.Multiplication;  
        return {randomNumber1, randomNumber2, problemType};
    }
    else {
        let randomNumber1: number = Math.floor(Math.random() * (multiplyDivideUpper - multiplyDivideLower) + multiplyDivideLower);
        let randomNumber2: number = Math.floor(Math.random() * (multiplyDivideUpper - multiplyDivideLower) + multiplyDivideLower);
        let product: number = randomNumber1 * randomNumber2;
        randomNumber1 = product;
        if (randomNumber2 === 0) {
            randomNumber2 = 1;
        }
        let problemType: QuestionType = QuestionType.Division;
        return {randomNumber1, randomNumber2, problemType};
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
        else {
            return this.leftNumber / this.rightNumber;
        }
    }
}

export enum QuestionType {
    Addition,
    Subtraction,
    Multiplication,
    Division
}

export enum State {
    Before,
    Playing,
    Done
}