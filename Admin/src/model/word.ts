export class Word {
  id: number;
  vocabulary: string;
  phonetic: string;
  note: string;
  definition: string;
  typeword: string;
  imageWord:string;
  createdDatetime:string;
  updatedDatetime:string;
  constructor(
    definition: string,
    note: string,
    phonetic: string,
    typeword: string,
    vocabulary: string,
    imageWord:string
  ) {
      this.definition=definition;
      this.note=note;
      this.phonetic=phonetic;
      this.typeword=typeword;
      this.vocabulary=vocabulary;
      this.imageWord=imageWord;
  }
}
