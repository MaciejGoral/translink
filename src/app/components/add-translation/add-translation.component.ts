import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { TextsService } from 'src/app/services/texts.service';

interface Word {
  word: string;
  highlighted: boolean;
  translation?: string;
  sentenceIndex?: number;
  wordIndex?: number;
}
interface Sentence {
  sentence: string;
  translation?: string;
  sentenceIndex?: number;
}

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss'],
})
export class AddTranslationComponent {
  text = '';
  sentences: Sentence[] = [];
  words: Word[] = [];
  translatedWords: Word[] = [];
  selectedSentence: Sentence = { sentence: '' };
  translatedText: string = '';
  selectedWords: string[] = [];
  hoveredWordIndex: number = -1;
  originalLanguage: string = '';
  translationLanguage: string = '';
  title: string = '';
  translatedTitle: string = '';
  constructor(private textsService: TextsService) {}
  splitText() {
    this.sentences = this.text
      .split('.')
      .map((sentence, index) => {
        return { sentence: sentence.trim(), sentenceIndex: index + 1 };
      })
      .filter((sentence) => {
        return sentence.sentence.length > 0;
      });
  }

  openModal(sentence: Sentence) {
    this.selectedSentence = sentence;
    this.words = sentence.sentence.split(' ').map((word, wordIndex) => {
      return {
        word,
        highlighted: false,
        sentenceIndex: sentence.sentenceIndex,
        wordIndex: wordIndex + 1,
      };
    });
    const modal = new bootstrap.Modal(
      document.getElementById('translationModal') || ''
    );
    modal.show();
    const modalElement = document.getElementById(
      'translationModal'
    ) as HTMLElement;
    if (!modalElement.hasAttribute('listener')) {
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
      element.addEventListener('mouseout', () => {
        this.hoveredWordIndex = -1;
      });
      element.addEventListener('click', () => {
        this.words[index].highlighted = !this.words[index].highlighted;
      });
    });
  }

  clearPunctuation(word: string) {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
  }

  closeModal() {
    this.words.forEach((word, index) => {
      const element = document.getElementById(`word-${index}`) as HTMLElement;
      element.removeEventListener('mouseover', () => {
        this.hoveredWordIndex = index;
      });
      element.removeEventListener('mouseout', () => {
        this.hoveredWordIndex = -1;
      });
      element.removeEventListener('click', () => {
        this.words[index].highlighted = !this.words[index].highlighted;
      });
    });
    this.selectedSentence = { sentence: '' };
    this.hoveredWordIndex = -1;
  }

  saveTranslation() {
    console.log(this.words);
    this.words.forEach((word) => {
      if (word.translation) {
        this.translatedWords.push(word);
      }
    });
    this.translatedText = this.sentences
      .map((sentence) => {
        if (sentence.translation && sentence.translation.trim() !== '') {
          return sentence.translation.trim() + '.';
        }
        return '';
      })
      .join(' ');

    this.closeModal();
  }
  saveWholeTranslation() {
    let data = this.prepareData();
    this.textsService.addTranslation(data).subscribe((res) => {
      console.log(res);
    });
  }
  prepareData() {
    // Current date and time
    const creationDate = new Date().toLocaleString();

    // Assuming 'user1' as the owner, 'title here' as the base title, and 'tytuł tutaj' as the translation title
    const owner = JSON.parse(localStorage.getItem('user')).email;
    const baseTitle = this.title;
    const translationTitle = this.translatedTitle;

    // Cloudinary image URL
    const imageUrl =
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';

    // Extracting base sentences and translation sentences
    const baseSentences = this.sentences.map((sentence) => sentence.sentence);
    const translationSentences = this.sentences.map(
      (sentence) => sentence.translation || ''
    );

    // Creating the words-translation array
    const wordsTranslation = this.translatedWords.map((word, index) => {
      return {
        base: this.clearPunctuation(word.word),
        translation: word.translation || '',
        'sentence-index': word.sentenceIndex || 0,
        id: word.wordIndex,
      };
    });

    // Constructing the data object
    const data = {
      'creation-date': creationDate,
      owner,
      image: imageUrl,
      'base-language': this.originalLanguage,
      'translation-language': this.translationLanguage,
      'base-title': baseTitle,
      'translation-title': translationTitle,
      'base-sentences': baseSentences,
      'translation-sentences': translationSentences,
      'words-translation': wordsTranslation,
    };
    return data;
  }
}
