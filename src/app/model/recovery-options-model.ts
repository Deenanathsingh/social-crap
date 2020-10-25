export class RecoveryOptions {

    recoveryEmail: string;
    firstQuestion: string;
    firstAnswer: string;
    secondQuestion: string;
    secondAnswer: string;

    constructor(recoveryEmail: string, firstQuestion: string, firstAnswer: string, secondQuestion: string, secondAnswer: string) {
        this.recoveryEmail = recoveryEmail;
        this.firstQuestion = firstQuestion;
        this.firstAnswer = firstAnswer;
        this.secondQuestion = secondQuestion;
        this.secondAnswer = secondAnswer;
    }


}