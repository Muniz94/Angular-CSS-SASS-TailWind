import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value:string) {
    this.answers.push(value); // adiciona o valor ao vetor de respostas. (No caso os Alias A ou B)
    this.nextStep();
  }

  async nextStep() { // ir para a próxima questão ou se não tiver exibir o resultado
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer:String = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]; // resposta final
      // indica ao 'finalAnswer' que só pode ser 'A' ou 'B' nesse caso (results do .json)
    }
  }

  async checkResult(answers:string[]) { // verificar se é herói ou vilão
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) { // compara o anterior com o próximo para saber a frequência do item
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }
}
