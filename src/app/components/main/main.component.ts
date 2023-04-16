import { Component } from '@angular/core';
import { TextsService } from '../../services/texts.service';

interface Text {
  id: number;
  title: string;
  text: string;
  image: string;
  created_at: string;
  author: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  texts: Text[] = [];
  constructor(private textsService: TextsService) { }

  ngOnInit(): void {
    this.textsService.getTexts().subscribe((data) => {
      this.texts = data;
    });
  }
}
