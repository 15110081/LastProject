import { Component, OnInit } from '@angular/core';
import * as GC from '@grapecity/spread-sheets';
import * as Excel from '@grapecity/spread-excelio';
import '@grapecity/spread-sheets-charts';
import {saveAs} from 'file-saver';
import { spread } from 'q';
import { Word } from 'src/model/word';
import { WordService } from '../service/word.service';
import { TokenStorageService } from '../auth/token-storage.service';
@Component({
  selector: 'app-excel-site',
  templateUrl: './excel-site.component.html',
  styleUrls: ['./excel-site.component.scss']
})
export class ExcelSiteComponent implements OnInit {

  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh'
  };
  private spread: GC.Spread.Sheets.Workbook;
  private excelIO;
  constructor(private wordService:WordService,private token:TokenStorageService) {
    this.excelIO = new Excel.IO();
  }
  workbookInit(args) {
    const self = this;
    self.spread = args.spread;
    const sheet = self.spread.getActiveSheet();
    sheet.getCell(0, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(0, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(0, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(0, 3).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 3).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 3).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 3).text('Test Excel').foreColor('blue');
    // const sheetArea=GC.Spread.Sheets.SheetArea;
  }

  onFileChange(args) {
    const self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (self.spread && file) {
      self.excelIO.open(file, (json) => {
        self.spread.fromJSON(json, {});
        setTimeout(() => {
          alert('load successfully');
        }, 0);
      }, (error) => {
        alert('load fail');
      });
    }
  }
  
  onClickMe(args) {
    const self = this;
    const filename = 'exportExcel.xlsx';
    const row=self.spread.getActiveSheet().getRowCount();
    const data=self.spread.getActiveSheet().getArray(1,0,row-1,5)
    data.forEach((value,index,array)=>{
      let word = new Word(null,"","","","","","");
        value.forEach((v1,i1,array)=>{
          if(i1===0) word.vocabulary=array[i1];
          if(i1===1) word.phonetic=array[i1];
          if(i1===2) word.definition=array[i1];
          if(i1===3) word.note=array[i1];
          if(i1===4) word.typeword=array[i1];
        });
        this.wordService.postWord(word,this.token.getToken()).subscribe();
    });
  //   const json = JSON.stringify(self.spread.toJSON());
  //   self.excelIO.save(json, function (blob) {
  //     saveAs(blob, filename);
  // }, function (e) {
  //     console.log(e);
  // });
  }

  ngOnInit() {
  }

}
