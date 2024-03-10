import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 30;
  correctAns: number = 0;
  incorrectAns: number = 0;
  interval$: any;
  interval$1:any;
  progress: string = "0";
  isCompleted: Boolean = false;
  currentQn!: number;
  answeredQns:boolean = true;
  counter1 = 300;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
    this.startTimer();
  }

  getAllQuestions() {
    this.questionService.getQuestion().subscribe(res => {
      this.questionList = res.questions
      console.log(res);
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    this.resetCounter();
    this.getProgress();
  }
 
  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    this.currentQn = currentQno
    if (currentQno === this.questionList.length) {
      this.isCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAns++;
      this.answeredQns=true;
      setTimeout(() => {
        // this.stopQuiz()
        this.currentQuestion++;
        this.resetCounter();
        this.getProgress();
      }, 1000)

    } else {

      setTimeout(() => {
        // this.stopQuiz()
        this.currentQuestion++;
        this.incorrectAns++;
        this.answeredQns=true;
        this.resetCounter();
        this.getProgress();
      }, 1000)
      this.points -= 10;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 30;
        this.points -= 10;
        this.currentQn = this.currentQuestion
        this.getProgress()
        console.log("current qn", this.currentQn);
        if (this.currentQn === this.questionList.length) {
          this.isCompleted = true;
          this.stopCounter();
        }
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 300000);
  }

  startTimer(){
    this.interval$1 = interval(1000).subscribe(val => {
      this.counter1--;
        if (this.counter1 === 0) {
          this.isCompleted = true;
          this.stopCounter();
        }
      });
    setTimeout(() => {
      this.interval$1.unsubscribe();
    }, 300000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 30;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 10;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgress() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  

}


