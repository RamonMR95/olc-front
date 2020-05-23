export class Course {
  public id: number;

  constructor(
    public courseName?: string,
    public yearStart?: Date,
    public yearEnd?: Date,
    public schedule?: string
  ) {}
}
