import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socketClient: CompatClient | null = null;
  private readonly websocketUrl = 'http://localhost:8080/chess-websocket';

  // Subject to emit messages received from the server
  private messageSubject = new Subject<any>();
  message$ = this.messageSubject.asObservable();

  constructor(private _: RxStomp) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    const ws = new SockJS(this.websocketUrl);
    ws.onopen = () => console.log('SockJS connection opened.');
    ws.onclose = (e) => console.log('SockJS connection closed:', e);
    ws.onerror = (e) => console.error('SockJS connection error:', e);

    this.socketClient = Stomp.over(ws);

    this.socketClient.connect(
      {},
      () => {
        console.log('STOMP connection successful');
        this.subscribeToTopic('/topic/move');
      },
      (err: any) => {
        console.error('STOMP connection error:', err);
      }
    );
  }

  private subscribeToTopic(topic: string): void {
    this.socketClient?.subscribe(topic, (message) => {
      console.log('Received message:', message.body);
      this.messageSubject.next(message.body);
    });
  }

  // Method to send a message to a destination
  public sendMessage(destination: string, body: any): void {
    if (this.socketClient && this.socketClient.connected) {
      this.socketClient.send(destination, {}, JSON.stringify(body));
    }
  }

  ngOnDestroy(): void {
    if (this.socketClient !== null) {
      this.socketClient.disconnect(() => {
        console.log('WebSocket disconnected');
      });
      this.socketClient = null;
    }
  }
}
