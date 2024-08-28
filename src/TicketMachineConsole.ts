import { rawlist } from "@inquirer/prompts";
import ITicketMachine from "./ITicketMachine";
import TicketMachineBase from "./TicketMachineBase";

export default class TicketMachineConsole extends TicketMachineBase implements ITicketMachine {
  async startInteraction() {
    const duration = await this.askForDurationInConsole();
    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  endInteraction() {
    console.log("Thank you for parking with us!");
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

  protected calculatePrice(duration: number): number {
    return duration * this.pricePerMinute + 5;
  }
}
