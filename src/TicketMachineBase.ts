export default class TicketMachineBase {
  protected currency: string;
  protected pricePerMinute: number;

  constructor(_currency: string, _pricePerMinute: number) {
    this.currency = _currency;
    this.pricePerMinute = _pricePerMinute;
  }

  protected displayPrice(price: number) {
    console.log(`The price will be ${price}${this.currency}`);
  }

  protected calculatePrice(duration: number) {
    return duration * this.pricePerMinute;
  }
}
