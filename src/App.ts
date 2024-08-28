import "dotenv/config";
import ITicketMachine from "./ITicketMachine";
import TicketMachineConsole from "./TicketMachineConsole";
import TicketMachineAPI from "./TicketMachineAPI";
import TicketMachineReadFile from "./TicketMachineReadFile";

class App {
  async main() {
    const type = process.env.MACHINE_TYPE;
    const currency = process.env.CURRENCY;
    const pricePerMinute = process.env.PRICE_PER_MINUTE;

    if (!currency || !pricePerMinute) {
      throw new Error("Error in configuration");
    }

    let ticketMachine: ITicketMachine;

    if (type === "1") {
      ticketMachine = new TicketMachineConsole(currency, Number(pricePerMinute));
    } else if (type === "2") {
      ticketMachine = new TicketMachineAPI(currency, Number(pricePerMinute));
    } else if (type === "3") {
      ticketMachine = new TicketMachineReadFile(currency, Number(pricePerMinute));
    } else {
      throw new Error("Error in configuration");
    }

    await ticketMachine.startInteraction();
    ticketMachine.endInteraction();
  }
}

const app = new App();
app.main();
