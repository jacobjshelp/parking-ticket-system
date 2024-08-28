import ITicketMachine from "./ITicketMachine";
import express, { Request } from "express";
import TicketMachineBase from "./TicketMachineBase";

export default class TicketMachineAPI extends TicketMachineBase implements ITicketMachine {
  private app = express();
  private port = process.env.PORT || 3000;

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
}
