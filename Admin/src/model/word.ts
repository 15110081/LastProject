export class Word {
  id: number;
  vocabulary: string;
  phonetic: string;
  note: string;
  definition: string;
  typeword: string;
  title: string;
 audioword:string;
  constructor(
    definition: string,
    note: string,
    phonetic: string,
    typeword: string,
    vocabulary: string,
  ) {
      this.definition=definition;
      this.note=note;
      this.phonetic=phonetic;
      this.typeword=typeword;
      this.vocabulary=vocabulary;
  }
}
