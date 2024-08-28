import ITicketMachine from "./ITicketMachine";
import fs from "node:fs";

export default class TicketMachineReadFile implements ITicketMachine {
  private currency: string;
  private pricePerMinute: number;
  private timeout = 7;

  constructor(_currency: string, _pricePerMinute: number) {
    this.currency = _currency;
    this.pricePerMinute = _pricePerMinute;
  }

  async startInteraction(): Promise<void> {
    console.log("Enter your wanted parking duration in minutes in the file called duration.txt");
    await this.sleep();

    let duration: number | undefined = undefined;
    while (duration === undefined) {
      duration = await this.attemptToReadFile();
    }
    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  endInteraction(): void {
    fs.writeFile("./data/duration.txt", "", function () {
      console.log("Duration file has been reset");
      console.log("Thank you for parking with us!");
    });
  }

  private displayPrice(price: number) {
    console.log(`The price will be ${price}${this.currency}`);
  }

  private calculatePrice(duration: number) {
    return duration * this.pricePerMinute;
  }

  private sleep() {
    return new Promise((resolve) => {
      console.log(`Waiting ${this.timeout} seconds`);
      setTimeout(resolve, this.timeout * 1000);
    });
  }

  private async attemptToReadFile(): Promise<undefined | number> {
    try {
      const data = fs.readFileSync("./data/duration.txt", "utf8");
      if (data === "") {
        console.log("The file is still empty, please input a duration");
        await this.sleep();
      } else {
        return Number(data);
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}
