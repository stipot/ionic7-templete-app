import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SurveyModalComponent } from './survey-modal.component';

type SurveyType = 'radio' | 'checkbox' | 'text';

interface Question {
  id: string;
  text: string;
  type: SurveyType;
  options: string[];
}

interface QuestionAnswer {
  questionId: string;
  answer: string | string[];
}

interface SurveyAnswer {
  respondent: string;
  answers: QuestionAnswer[];
  createdAt: string;
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
  answers: SurveyAnswer[];
}

@Component({
  selector: 'app-getforms',
  templateUrl: './getforms.component.html',
  styleUrls: ['./getforms.component.scss'],
})
export class GetformsComponent implements OnInit {
  surveys: Survey[] = [];
  activeSurvey?: Survey;
  selectedResultSurvey?: Survey;
  showAllResults = false;
  respondentName = '';
  answerMap: { [questionId: string]: string | string[] } = {};

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.loadSurveys();
  }

  private get storageKey() {
    return 'getforms_surveys';
  }

  private loadSurveys() {
    const data = localStorage.getItem(this.storageKey);
    this.surveys = data ? JSON.parse(data) : [];
  }

  private saveSurveys() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.surveys));
  }

  async openCreateSurveyModal() {
    const modal = await this.modalController.create({
      component: SurveyModalComponent,
    });

    await modal.present();
    const result = await modal.onDidDismiss();
    if (result?.data) {
      this.surveys.unshift(result.data as Survey);
      this.saveSurveys();
    }
  }

  openSurvey(survey: Survey) {
    this.activeSurvey = survey;
    this.selectedResultSurvey = undefined;
    this.showAllResults = false;
    this.respondentName = '';
    this.answerMap = {};
    survey.questions.forEach((q) => {
      this.answerMap[q.id] = q.type === 'checkbox' ? [] : '';
    });
  }

  submitAnswer() {
    if (!this.activeSurvey) {
      return;
    }

    const respondent = this.respondentName.trim();
    if (!respondent) {
      alert('Введите имя респондента.');
      return;
    }

    const answers: QuestionAnswer[] = [];
    for (const q of this.activeSurvey.questions) {
      const val = this.answerMap[q.id];
      if (q.type === 'radio' && !val) {
        alert('Выберите вариант для вопроса: ' + q.text);
        return;
      }
      if (q.type === 'checkbox' && (!Array.isArray(val) || val.length === 0)) {
        alert('Выберите хотя бы один вариант для вопроса: ' + q.text);
        return;
      }
      if (q.type === 'text' && !String(val).trim()) {
        alert('Введите ответ для вопроса: ' + q.text);
        return;
      }

      answers.push({ questionId: q.id, answer: Array.isArray(val) ? val : String(val).trim() });
    }

    const resultAnswer: SurveyAnswer = {
      respondent,
      answers,
      createdAt: new Date().toLocaleString(),
    };

    const index = this.surveys.findIndex((item) => item.id === this.activeSurvey?.id);
    if (index !== -1) {
      this.surveys[index].answers.push(resultAnswer);
      this.saveSurveys();
      alert('Ответ сохранён.');
      this.activeSurvey = undefined;
      this.respondentName = '';
      this.answerMap = {};
    }
  }

  selectResultSurvey(survey: Survey) {
    this.selectedResultSurvey = survey;
    this.activeSurvey = undefined;
    this.showAllResults = false;
  }

  toggleAllResults() {
    this.showAllResults = !this.showAllResults;
    if (this.showAllResults) {
      this.activeSurvey = undefined;
      this.selectedResultSurvey = undefined;
    }
  }

  isOptionCheckedFor(questionId: string, option: string) {
    return Array.isArray(this.answerMap[questionId]) && (this.answerMap[questionId] as string[]).includes(option);
  }

  toggleOptionFor(questionId: string, option: string, checked: boolean) {
    if (!Array.isArray(this.answerMap[questionId])) {
      this.answerMap[questionId] = [];
    }
    const selected = this.answerMap[questionId] as string[];
    if (checked) {
      if (!selected.includes(option)) selected.push(option);
    } else {
      const idx = selected.indexOf(option);
      if (idx > -1) selected.splice(idx, 1);
    }
  }

  deleteSurvey(survey: Survey, event: any) {
    event.stopPropagation();
    if (confirm(`Вы уверены, что хотите удалить опрос "${survey.title}"?`)) {
      const index = this.surveys.findIndex((item) => item.id === survey.id);
      if (index !== -1) {
        this.surveys.splice(index, 1);
        this.saveSurveys();
        if (this.activeSurvey?.id === survey.id) {
          this.activeSurvey = undefined;
        }
      }
    }
  }

  trackByOption(index: number, option: string) {
    return option;
  }

  formatAnswer(value: string | string[]) {
    return Array.isArray(value) ? value.join(', ') : value;
  }

  get hasAnyResults() {
    return this.surveys.some((survey) => survey.answers.length > 0);
  }

  getQuestionText(survey: Survey | undefined, questionId: string) {
    if (!survey) return '';
    const q = survey.questions.find((x) => x.id === questionId);
    return q ? q.text : questionId;
  }
}

