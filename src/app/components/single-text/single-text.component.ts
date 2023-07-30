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
  styleUrls: ['./single-text.component.scss'],
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
  data: any = {};
  selectedWords: { base: string; translation: string }[] = [];
  wordListName: string = '';
  baseSentences = [];
  translationSentences = [];

  constructor(
    private textsService: TextsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.textsService
      .getText(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.data = data;
        this.baseSentences = this.data['base-sentences'];
        this.translationSentences = this.data['translation-sentences'];
      });
    Array.from(
      document.querySelectorAll('button[data-bs-toggle="tooltip"]')
    ).forEach((tooltipNode) => new Tooltip(tooltipNode));
  }

  tooltipText = '';
  tooltipTarget = '';

  showTranslation(tooltip, sentenceIndex: number, wordIndex: number) {
    const word = this.baseSentences[sentenceIndex]
      .split(' ')
      [wordIndex].replace(/[^\w\s]/gi, '')
      .toLowerCase();
    const translation = this.data['words-translation'].find(
      (wt: any) => wt.base.toLowerCase() === word
    )?.translation;
    if (translation) {
      this.tooltipText = translation;
      this.tooltipTarget = `#word-${sentenceIndex}-${wordIndex}`;
      setTimeout(() => {
        tooltip.open();
      }, 100);
      const triggerElement = document.querySelector(
        `#word-${sentenceIndex}-${wordIndex}`
      );
      triggerElement.addEventListener('mouseleave', () => {
        tooltip.close();
      });
    }
  }

  showTranslatedSentence(tooltip, sentenceIndex: number) {
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
  showTranslatedTitle(tooltip) {
    const translation = this.data['translation-title'];
    if (translation) {
      tooltip.close();
      this.tooltipText = translation;
      this.tooltipTarget = `#title`;
      setTimeout(() => {
        tooltip.open();
      }, 200);
      const onMouseUp = () => {
        tooltip.close();
      };
      window.addEventListener('mouseup', onMouseUp);
    }
  }
  onWordDoubleClick(sentenceIndex: number, wordIndex: number) {
    const word = this.baseSentences[sentenceIndex]
      .split(' ')
      [wordIndex].replace(/[^\w\s]/gi, '')
      .toLowerCase();
    const translation = this.data['words-translation'].find(
      (wt: any) => wt.base.toLowerCase() === word
    )?.translation;
    if (translation) {
      const selectedWord = { base: word, translation: translation };
      this.selectedWords.push(selectedWord);
    }
  }
  removeWord(index: number) {
    this.selectedWords.splice(index, 1);
  }
  saveWords() {
    console.log(this.selectedWords);
    //console log user from local storage
    console.log(JSON.parse(localStorage.getItem('user')));
    let data = {
      user_id: JSON.parse(localStorage.getItem('user')).id,
      name: this.wordListName,
      words: this.selectedWords,
    };
    this.textsService.addWordlist(data).subscribe((data) => {
      console.log(data);
    });
  }
}
