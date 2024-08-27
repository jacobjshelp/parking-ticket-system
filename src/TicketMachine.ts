import { rawlist } from "@inquirer/prompts";

export default class TicketMachine {
  private currency: string;
  private pricePerMinute: number;

  constructor(_currency: string, _pricePerMinute: number) {
    this.currency = _currency;
    this.pricePerMinute = _pricePerMinute;
  }

  async startInteraction() {
    const duration = await this.askForDurationInConsole();
    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  endInteraction() {
    console.log("Thank you for parking with us!");
  }

  private displayPrice(price: number) {
    console.log(`The price will be ${price}${this.currency}`);
  }

  private calculatePrice(duration: number) {
    return duration * this.pricePerMinute;
  }

  private async askForDurationInConsole() {
    const answer = await rawlist({
      message: "Select a duration",
      choices: [
        { name: "30 minutes", value: 30 },
        { name: "1 hour", value: 60 },
        { name: "2 hours", value: 120 },
        { name: "4 hours", value: 240 },
        { name: "8 hours", value: 480 },
      ],
    });
    return answer;
  }
}
