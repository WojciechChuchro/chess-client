import { Component, OnDestroy, OnInit } from "@angular/core";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { RxStomp } from "@stomp/rx-stomp";
import { NgFor, NgStyle, NgIf } from "@angular/common";
@Component({
  selector: "app-game",
  standalone: true,
  imports: [NgFor, NgStyle, NgIf],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.sass",
})
export class GameComponent implements OnInit, OnDestroy {
  board: any;
  isLoading: boolean = true;
  private socketClient: CompatClient | null = null;
  private readonly websocketUrl = "http://localhost:8080/chess-websocket";
  selectedCell: { row: number; col: number } | null = null;
  moveDetails: string | null = null;

  constructor(private _: RxStomp) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {}

  private initializeWebSocketConnection(): void {
    const ws = new SockJS(this.websocketUrl);

    this.socketClient = Stomp.over(ws);

    this.socketClient.connect(
      {},
      {},
      () => {
        console.log("STOMP connection successful");
        this.isLoading = false;
        this.socketClient?.subscribe("/topic/move", (board) => {
          console.log(JSON.parse(board.body));
          this.board = JSON.parse(board.body);
        });
      },
      (err: any) => {
        console.error("STOMP connection error:", err);
      },
    );
  }
  selectCell(rowIndex: number, colIndex: number) {
    if (!this.selectedCell) {
      this.selectedCell = { row: rowIndex, col: colIndex };
    } else {
      const fromRow = this.selectedCell.row;
      const fromCol = this.selectedCell.col;
      const toRow = rowIndex;
      const toCol = colIndex;
      this.sendMove({ fromCol, fromRow, toCol, toRow });

      this.selectedCell = null;
    }
  }

  public sendMove(move: {
    fromCol: number;
    fromRow: number;
    toCol: number;
    toRow: number;
  }): void {
    if (this.socketClient && this.socketClient.connected) {
      this.socketClient.send("/app/move", {}, JSON.stringify(move));
    }
  }
  public play(): void {
    const move = { fromCol: 99, fromRow: 99, toCol: 1, toRow: 1 };
    if (this.socketClient && this.socketClient.connected) {
      this.socketClient.send("/app/move", {}, JSON.stringify(move));
    }
  }

  public resign(): void {
    if (this.socketClient !== null) {
      this.socketClient.disconnect(() => {
        this.board = null;
      });
      this.socketClient = null;
    }
  }

  ngOnDestroy(): void {
    if (this.socketClient !== null) {
      this.socketClient.disconnect(() => {
        console.log("WebSocket disconnected");
      });
      this.socketClient = null;
    }
  }
}
