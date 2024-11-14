import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chess-front';

  constructor(
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.webSocketService.message$.subscribe((message) => {
      console.log('Received message from WebSocketService:', message);
    });

  }

  sendMove(): void {
    const move = { fromCol: 1, fromRow: 69, toCol: 2, toRow: 2 };

    this.webSocketService.sendMessage('/app/move', move);
  }

  ngOnDestroy(): void {
    this.webSocketService.ngOnDestroy();
  }
}
