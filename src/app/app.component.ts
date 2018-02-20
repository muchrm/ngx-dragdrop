import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  times = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  list = [];
  dragulaTags = {
    'Monday_8': [
      'A', 'B'
    ]
  };
  constructor(private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
    });
  }
  getHeaderTime(time: string) {
    return `${time}:00 - ${+time + 1}:00`;
  }

  getDragulaTag(day, time) {
    return `${day}_${time}`;
  }

  getItemInTag(tag) {
    return this.dragulaTags[tag] || [];
  }
  private onDrop(args) {
    const [chield, parent] = args;
    this.dragulaTags[parent.id] = this.dragulaTags[parent.id] || [];
    this.dragulaTags[parent.id].push(chield.id);
    console.log(this.dragulaTags);
  }
}
