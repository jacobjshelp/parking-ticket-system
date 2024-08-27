import "dotenv/config";
import TicketMachine from "./TicketMachine";

class App {
  async main() {
    const currency = process.env.CURRENCY;
    const pricePerMinute = process.env.PRICE_PER_MINUTE;

    if (!currency || !pricePerMinute) {
      throw new Error("Error in configuration");
    }

    const ticketMachine = new TicketMachine(currency, Number(pricePerMinute));
    await ticketMachine.startInteraction();
    ticketMachine.endInteraction();
  }
}

const app = new App();
app.main();
