import * as signalR from '@microsoft/signalr';
import { IMessageHub } from '@/interfaces/IMessageHub';

const URL1 = import.meta.env.VITE_HUB_ADDRESS_1 ?? 'https://localhost:5001/hub'; //or whatever your backend port is
const URL2 = import.meta.env.VITE_HUB_ADDRESS_2 ?? 'https://localhost:5002/hub'; //or whatever your backend port is
class Connector {
  private connection1: signalR.HubConnection;
  private connection2: signalR.HubConnection;
  public events1: (onMessageReceived: (username: string, message: IMessageHub) => void) => void;
  public events2: (onMessageReceived: (username: string, message: IMessageHub) => void) => void;
  static instance: Connector;

  constructor() {
    this.connection1 = new signalR.HubConnectionBuilder()
      .withUrl(URL1, {
        // skipNegotiation: true,
        // transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.connection2 = new signalR.HubConnectionBuilder()
      .withUrl(URL2)
      .withAutomaticReconnect()
      .build();

    this.connection1.start().catch((err) => console.error(err.toString()));
    // .catch((err) => document.write(err));
    this.connection2.start().catch((err) => console.error(err.toString()));

    this.events1 = (onMessageReceived) => {
      this.connection1.on('messageReceived', (username, message) => {
        return onMessageReceived(username, message);
      });
    };
    this.events2 = (onMessageReceived) => {
      this.connection2.on('messageReceived', (username, message) => {
        onMessageReceived(username, message);
      });
    };
  }

  public newMessage1 = (messages: string) => {
    this.connection1.send('newMessage', 'foo', messages).then((x) => console.log('sent hub1'));
  };
  public newMessage2 = (messages: string) => {
    this.connection2.send('newMessage', 'foo', messages).then((x) => console.log('sent hub2'));
  };

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}

export default Connector.getInstance;
