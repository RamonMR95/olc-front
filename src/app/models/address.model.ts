export class Address {
  public id: number;

  constructor(
    public street: string,
    public province: string,
    public city: string,
    public zip: string,
    public country: string
  ) {}
}
