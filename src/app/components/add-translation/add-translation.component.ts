import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

interface Word {
  word: string;
  highlighted: boolean;
  translation?: string;
}
interface Sentence {
  sentence: string;
  translation?: string;
}

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss']
})
export class AddTranslationComponent {
  text=''
  sentences: Sentence[] = [];
  words: Word[] = [];
  selectedSentence: Sentence = { sentence: '' };
  translatedText: string = '';
  selectedWords: string[] = [];
  hoveredWordIndex: number = -1;

  splitText() {
    this.sentences = this.text.split('.').map((sentence) => {
      return { sentence: sentence.trim() };
    }
    ).filter((sentence) => {
      return sentence.sentence.length > 0;
    });
  }

  openModal(sentence: Sentence) {
    this.selectedSentence = sentence;
    this.words = sentence.sentence.split(' ').map((word) => {
      return { word, highlighted: false };
    });
    const modal = new bootstrap.Modal(document.getElementById('translationModal') || '');
    modal.show();
    const modalElement = document.getElementById('translationModal') as HTMLElement;
    if(!modalElement.hasAttribute('listener'))
    {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.addEventListeners();
        modalElement.setAttribute('listener', 'true');
      });
    }
  }

  addEventListeners() {
    this.words.forEach((word, index) => {
      const element = document.getElementById(`word-${index}`) as HTMLElement;
      element.addEventListener('mouseover', () => {
        this.hoveredWordIndex = index;
      });
      element.addEventListener('click', () => {
        this.words[index].highlighted = !this.words[index].highlighted;
      }
      );
    });
  }

  clearPunctuation(word: string) {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
  }

  closeModal()
  {
    //remove event listeners
    this.words.forEach((word, index) => {
      const element = document.getElementById(`word-${index}`) as HTMLElement;
      element.removeEventListener('mouseover', () => {
        this.hoveredWordIndex = index;
      });
      element.removeEventListener('click', () => {
        this.words[index].highlighted = !this.words[index].highlighted;
      }
      );
    });
    this.selectedSentence = { sentence: '' };
    this.hoveredWordIndex = -1;
  }



  saveTranslation() {
    this.translatedText = this.sentences.map((sentence) => {
      return sentence.translation || sentence.sentence;
    }).join('. ');
    this.closeModal();
  }
}

