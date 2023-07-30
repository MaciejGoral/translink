import { Component } from '@angular/core';
import { TextsService } from '../../services/texts.service';

interface Text {
  id: number;
  title: string;
  text: string;
  image: string;
  created_at: string;
  author: string;
  base_language: string;
  translation_language: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  texts: Text[] = [];
  filteredTexts: Text[] = []; // Array to store filtered texts
  searchInput: string = ''; // Variable to store search input
  sortBy: string = ''; // Variable to store current sorting criteria
  selectedBaseLanguage: string = ''; // Variable to store the selected base language
  selectedTranslationLanguage: string = ''; // Variable to store the selected translation language

  constructor(private textsService: TextsService) {}

  ngOnInit(): void {
    this.textsService.getTexts().subscribe((data) => {
      for (let text of data) {
        this.texts.push({
          id: text.id,
          title: text['base-title'],
          text: text['base-sentences']
            .map((sentence: any) => sentence)
            .join('. ')
            .concat('.'),
          image: text.image,
          created_at: text['creation-date'],
          author: text.owner,
          base_language: text['base-language'],
          translation_language: text['translation-language'],
        });
      }
      console.log(this.texts);
      this.filteredTexts = this.texts.slice(); // Initialize filtered texts with all texts
    });
  }

  // Custom filter function for search
  applySearchFilter() {
    if (this.searchInput.trim() === '') {
      // If search input is empty, show all texts
      this.filteredTexts = this.texts.slice();
    } else {
      this.filteredTexts = this.texts.filter(
        (text) =>
          text.title.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          text.text.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          text.author.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          text.base_language
            .toLowerCase()
            .includes(this.searchInput.toLowerCase()) ||
          text.translation_language
            .toLowerCase()
            .includes(this.searchInput.toLowerCase())
      );
    }
  }

  // Sorting function
  sortTexts(criteria: string) {
    this.sortBy = criteria;
    if (criteria === 'name') {
      this.filteredTexts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'date') {
      this.filteredTexts.sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );
    }
  }

  applyFilters() {
    this.filteredTexts = this.texts.filter((text) => {
      const baseLanguageMatch =
        this.selectedBaseLanguage === '' ||
        text.base_language === this.selectedBaseLanguage;
      const translationLanguageMatch =
        this.selectedTranslationLanguage === '' ||
        text.translation_language === this.selectedTranslationLanguage;

      const searchMatch =
        text.title.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        text.text.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        text.author.toLowerCase().includes(this.searchInput.toLowerCase());

      return baseLanguageMatch && translationLanguageMatch && searchMatch;
    });
  }
}
