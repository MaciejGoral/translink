import { Component } from '@angular/core';
import { TextsService } from '../../services/texts.service';
import { ActivatedRoute } from '@angular/router';
import { Tooltip } from 'bootstrap';


interface Text {
  id: number;
  title: string;
  text: string;
  image: string;
  created_at: string;
  author: string;
}

@Component({
  selector: 'app-single-text',
  templateUrl: './single-text.component.html',
  styleUrls: ['./single-text.component.scss']
})
export class SingleTextComponent {
  text: Text = {
    id: 0,
    title: '',
    text: '',
    image: '',
    created_at: '',
    author: '',
  };
 data={
    "creation-date":"22-12-2022 12:12:11",
    "owner": "user1",
    "image": "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    "base-language": "english",
    "base-title": "title here",
    "translation-title": "tytuł tutaj",
    "base-sentences": ["What do you want?", "Are you crazy? - asked the Doctor", "I am not crazy, you are just very explicite example of an ignorant"],
    "translation-sentences": ["Czego ty chcesz?", "Czy pan jest szalony? - spytał Doktor", "Nie jestem szalony, to po prostu pan jest jaskrawym przypadkiem ignoranta"],
    "words-translation" : [
        {"base": "what", "translation": "czego", "sentence-index": 0, "id": 1},
        {"base": "asked", "translation": "spytał", "sentence-index": 1, "id":2}
    ]
}

  constructor(private textsService: TextsService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.textsService.getText(this.route.snapshot.params['id']).subscribe((data) => {
      this.text = data;
    });
    Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode));
  }
  baseSentences = this.data['base-sentences'];
  translationSentences = this.data['translation-sentences'];
  tooltipText = '';
  tooltipTarget = '';

  showTranslation(tooltip,sentenceIndex: number, wordIndex: number) {
    const word = this.baseSentences[sentenceIndex].split(' ')[wordIndex].replace(/[^\w\s]/gi, '').toLowerCase();
    const translation = this.data['words-translation'].find((wt: any) => wt.base.toLowerCase() === word)?.translation;
    if (translation) {
      this.tooltipText = translation;
      this.tooltipTarget = `#word-${sentenceIndex}-${wordIndex}`;
      setTimeout(() => {
        tooltip.open();
      }, 100);
      const triggerElement = document.querySelector(`#word-${sentenceIndex}-${wordIndex}`);
      triggerElement.addEventListener('mouseleave', () => {
        tooltip.close();
      });
    }
  }

  showTranslatedSentence(tooltip,sentenceIndex: number) {
    const translation = this.translationSentences[sentenceIndex];
    if (translation) {
      tooltip.close();
      this.tooltipText = translation;
      this.tooltipTarget = `#sentence-${sentenceIndex}`;
      setTimeout(() => {
        tooltip.open();
      }, 200);
      const onMouseUp = () => {
        tooltip.close();
      };
      window.addEventListener('mouseup', onMouseUp);
    }
  }

}
