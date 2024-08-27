import "dotenv/config";
import TicketMachine from "./TicketMachine";

class App {
  async main() {
    const type = process.env.MACHINE_TYPE;
    const currency = process.env.CURRENCY;
    const pricePerMinute = process.env.PRICE_PER_MINUTE;

    if (!currency || !pricePerMinute) {
      throw new Error("Error in configuration");
    }

    const ticketMachine = new TicketMachine(currency, Number(pricePerMinute));

    if (type === "1") {
      await ticketMachine.startInteractionConsole();
      ticketMachine.endInteraction();
    } else if (type === "2") {
      await ticketMachine.startInteractionAPI();
      ticketMachine.endInteractionAndCloseProgram();
    } else if (type === "3") {
      await ticketMachine.startInteractionReadFile();
      ticketMachine.endInteractionReadFile();
    }
  }
}

const app = new App();
app.main();
