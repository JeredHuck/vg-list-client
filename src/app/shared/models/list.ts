export class List {
  id: number = 0;
  title: string;
  content: string;

  constructor(list: any) {
    this.id = list.id || 0;
    this.title = list.title || '';
    this.content = list.content || '';
  }
}
