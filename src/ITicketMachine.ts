export default interface ITicketMachine {
  startInteraction(): Promise<void>;
  endInteraction(): void;
}
