import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

type SurveyType = 'radio' | 'checkbox' | 'text';

@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
})
export class SurveyModalComponent {
  title = '';
  // support multiple questions
  questions: { id: string; text: string; type: SurveyType; options: { id: string; text: string }[] }[] = [
    { id: `${Date.now()}-0`, text: '', type: 'radio', options: [{ id: `${Date.now()}-opt0`, text: '' }, { id: `${Date.now()}-opt1`, text: '' }] },
  ];

  constructor(private modalController: ModalController) {}

  addQuestion() {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    this.questions.push({ id, text: '', type: 'radio', options: [{ id: `${id}-opt0`, text: '' }, { id: `${id}-opt1`, text: '' }] });
  }

  trackByQuestion(index: number, item: { id: string }) {
    return item.id;
  }

  removeQuestion(index: number) {
    if (this.questions.length <= 1) return;
    this.questions.splice(index, 1);
  }

  addOption(questionIndex: number) {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    this.questions[questionIndex].options.push({ id, text: '' });
  }

  trackByOption(index: number, item: { id: string; text: string }) {
    return item.id;
  }

  removeOption(questionIndex: number, optIndex: number) {
    if (this.questions[questionIndex].options.length <= 1) return;
    this.questions[questionIndex].options.splice(optIndex, 1);
  }

  cancel() {
    this.modalController.dismiss();
  }

  save() {
    // validate questions
    for (const q of this.questions) {
      if (!q.text.trim()) {
        alert('Введите текст вопроса.');
        return;
      }
      if (q.type !== 'text') {
        const opts = q.options.map((o) => o.text.trim()).filter((o) => o.length > 0);
        if (opts.length < 2) {
          alert('Введите хотя бы два варианта для каждого вопроса.');
          return;
        }
        // replace options objects with plain strings for the saved survey
        (q as any).options = opts;
      } else {
        (q as any).options = [];
      }
    }

    const survey = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      title: this.title.trim() || (this.questions[0] && this.questions[0].text) || 'Опрос',
      questions: this.questions,
      answers: [] as any[],
    };

    this.modalController.dismiss(survey);
  }
}
