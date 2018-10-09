import { Component, OnInit, AfterViewInit } from '@angular/core';

interface Log {
  png: string;
}

@Component({
  selector: 'app-canvas-write',
  templateUrl: './canvas-write.component.html',
  styleUrls: ['./canvas-write.component.scss']
})
export class CanvasWriteComponent implements OnInit, AfterViewInit {
  x = 0;
  y = 0;
  canvas: HTMLCanvasElement | null = null;
  canvas_content: CanvasRenderingContext2D | null = null;
  move_flag = false;
  now_size = 10;
  sizes = [{ text: '大', value: 20 }, { text: '中', value: 10 }, { text: '小', value: 5 }];
  now_color = '#000000';
  logs: Log[] = [];
  now_index = -1;
  colors = [{ color_name: '黒色', code: '#000000' }, { color_name: '赤色', code: '#ff0000' }, { color_name: '黄色', code: '#ffff00' }];
  img_path = '../../../../assets/shima.png';

  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.canvas = document.querySelector('#flont_img');
    this.canvas_content = this.canvas.getContext('2d'); // canvasの種類指定
    this.set_back_img();
    this.canvas_content.globalAlpha = 1;
  }

  mouse_down(e: MouseEvent) {
    e.preventDefault();
    this.canvas_content.beginPath();
    this.x = e.layerX;
    this.y = e.layerY;
    this.canvas_content.moveTo(this.x, this.y);
  }

  mouse_move(e: MouseEvent) {
    if (e.buttons === 1) {
      this.x = e.layerX;
      this.y = e.layerY;
      this.move_flag = true;
      this.canvas_content.lineTo(this.x, this.y);
      this.canvas_content.lineCap = 'round';
      this.canvas_content.lineWidth = this.now_size;
      this.canvas_content.strokeStyle = this.now_color;
      this.canvas_content.stroke();
    }
  }

  mouse_up(e: MouseEvent) {
    if (!this.move_flag) {
      this.canvas_content.lineTo(this.x - 1, this.y - 1);
      this.canvas_content.lineCap = 'round';
      this.canvas_content.lineWidth = this.now_size;
      this.canvas_content.strokeStyle = this.now_color;
      this.canvas_content.stroke();
    }
    this.move_flag = false;
    this.save_log();
  }

  set_back_img() {
    const canvas: HTMLCanvasElement = document.querySelector('#back_img');
    const canvas_content = canvas.getContext('2d');
    const img = new Image();
    img.src = this.img_path;
    img.onload = () => canvas_content.drawImage(img, 0, 0, 800, 800);
  }

  save_log() {
    const png = this.canvas.toDataURL();
    this.logs = this.logs.filter((d, i) => i <= this.now_index);
    this.logs.push({ png });
    this.now_index = this.logs.length - 1;
  }

  prev_draw_img() {
    if (this.now_index === -1) {
      return;
    }
    this.now_index--;
    if (this.now_index === -1) {
      this.reset_canvas();
      return;
    }
    this.log_render();
  }

  next_draw_img() {
    if (this.logs.length <= this.now_index + 1) {
      return;
    }
    this.now_index++;
    this.log_render();
  }

  log_render() {
    this.reset_canvas();
    const erase_flag = this.canvas_content.globalCompositeOperation === 'destination-out' ? true : false;
    this.change_pencil(); // 消しゴムモードだとレンダリングが出来ないっぽい
    this.draw(this.logs[this.now_index].png, erase_flag);
  }

  reset_canvas() {
    this.canvas_content.clearRect(0, 0, this.canvas_content.canvas.clientWidth, this.canvas_content.canvas.clientHeight);
  }

  draw(src: string, erase_flag: boolean) {
    const img = new Image();
    img.src = src;
    const canvas_content = this.canvas_content;
    img.onload = () => {
      canvas_content.drawImage(img, 0, 0);
      if (erase_flag) {
        this.change_eraser();
      } // 消しゴムモードに戻す
    };
  }

  change_eraser() {
    this.canvas_content.globalCompositeOperation = 'destination-out';
  }

  change_pencil() {
    this.canvas_content.globalCompositeOperation = 'source-over';
  }

  all_delete() {
    this.reset_canvas();
    this.now_index = -1;
    this.logs = [];
  }
}
