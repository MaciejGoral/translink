import { Component } from '@angular/core';
import { TextsService } from 'src/app/services/texts.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  wordslist: any[] = [];
  constructor(private textsService: TextsService) {}

  ngOnInit(): void {
    this.textsService
      .getWordlists(JSON.parse(localStorage.getItem('user')).id)
      .subscribe((wordslist: any) => {
        this.wordslist = wordslist;
        console.log(this.wordslist);
      });
  }
  deleteWordList(wordListId: number) {
    this.textsService.deleteWordList(wordListId).subscribe(() => {
      this.wordslist = this.wordslist.filter(
        (wordlist) => wordlist.id !== wordListId
      );
    });
  }
}
