import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'lab-notebook-app';
  selectedWord = '';
  qtyWords = 0;
  similarWordList = '';
  selectedText = '';
  resultBody;
  constructor() {
  }

  ngOnInit(): void {
    this.resultBody = document.getElementById('resultContent');
    }

  checkWord(): void {
    this.cleanSearch();
    if (this.selectedWord !== '' || this.selectedText === '') {
      this.findSelectedWords();
    }
  }

  findSelectedWords(): any {
    const txt = this.selectedText.split(/\s|\\n/g);
    const similarList = [];
    const partOfWord = this.selectedWord.substring(0, this.selectedWord.length / 2);
    const similarRegex = new RegExp('((?<!\\w)' + partOfWord + '\\w+)', 'gi');
    txt.forEach((item, index) => {
      if (item == this.selectedWord) {
        txt[index] = '<mark>' + item + '</mark>';
        this.qtyWords = this.qtyWords + 1;
      } else if (item.match(similarRegex)) {
        // console.log(item.match(similarRegex));
        similarList.push(item);
        txt[index] = '<span class="similarWord">' + item + '</span>';
      } else if (item == '') {
        txt[index] = '<br /><br />';
      }
    });
    this.similarWordList = similarList.join(', ');
    // console.log(this.similarWordList);
    this.resultBody.innerHTML = txt.join(' ');
  }

  cleanSearch(): void  {
    this.resultBody.innerHTML = '';
    this.qtyWords = 0;
    this.similarWordList = '';
  }
}
