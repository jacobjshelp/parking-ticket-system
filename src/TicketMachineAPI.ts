import ITicketMachine from "./ITicketMachine";
import express, { Request } from "express";

export default class TicketMachineAPI implements ITicketMachine {
  private currency: string;
  private pricePerMinute: number;
  private app = express();
  private port = process.env.PORT || 3000;

  constructor(_currency: string, _pricePerMinute: number) {
    this.currency = _currency;
    this.pricePerMinute = _pricePerMinute;
  }

  async startInteraction(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.app.get("/:duration", (req: Request) => {
        const duration = req.params.duration;
        const price = this.calculatePrice(Number(duration));
        this.displayPrice(price);
        resolve();
      });

      this.app.listen(this.port, () => {
        console.log(`To set the wanted duration please send a GET request to http://localhost:${this.port}/:duration`);
      });
    });
  }

  endInteraction(): void {
    console.log("Thank you for parking with us!");
    process.exit();
  }

  private displayPrice(price: number) {
    console.log(`The price will be ${price}${this.currency}`);
  }

  private calculatePrice(duration: number) {
    return duration * this.pricePerMinute;
  }
}
