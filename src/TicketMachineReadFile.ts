import ITicketMachine from "./ITicketMachine";
import fs from "node:fs";
import TicketMachineBase from "./TicketMachineBase";

export default class TicketMachineReadFile extends TicketMachineBase implements ITicketMachine {
  private timeout = 7;

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
