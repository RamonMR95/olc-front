export class News {
  public id: number;

  constructor(
    public title: string,
    public content: string,
    public writer: string,
    public createdAt?: Date
  ) {}
}
