import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  times = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  dragulaTags = {
    'Monday_8': [
      { size: 1, data: 'A' },
      { size: 2, data: 'B' },
      { size: 4, data: 'C' }
    ]
  };
  courseInTag = [];

  constructor() {
    this.updateCourseInTag();
  }
  getHeaderTime(time: string) {
    return `${time}:00 - ${+time + 1}:00`;
  }

  getDropableTag(day, time) {
    return `${day}_${time}`;
  }

  getItemInTag(tag) {
    return this.courseInTag[tag] || [];
  }

  onDrop(event) {
    this.dragulaTags[event.newParent] = this.dragulaTags[event.newParent] || [];
    this.dragulaTags[event.newParent].push(event.child);

    const index = this.dragulaTags[event.oldParent].findIndex(el => el['data'] === event.child.data);
    if (index > -1) {
      this.dragulaTags[event.oldParent].splice(index, 1);
    }
    this.updateCourseInTag();
  }

  private findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
  updateCourseInTag() {
    this.courseInTag = [];
    Object.keys(this.dragulaTags).forEach(key => {
      this.dragulaTags[key].sort((a, b) => a.size < b.size);
      this.dragulaTags[key].forEach(course => {
        const [day, time] = key.split('_');
        const timeStart = +time;
        const maxSize = this.getMaxSizeInTag(day, timeStart, course.size, course.data);
        this.addCourseBySize(day, timeStart, course.size, course.data, maxSize);
      });
    });
  }

  private addCourseBySize(day, timeStart, size, data, maxSize) {
    for (let i = timeStart; i < timeStart + size; i++) {
      const tag = this.getDropableTag(day, i);
      const dragAble = i === timeStart;
      this.addEmptyCourseByMaxSize(tag, maxSize);
      this.courseInTag[tag].push({ dragAble, size: size, data: data });
    }
  }
  private addEmptyCourseByMaxSize(tag, maxSize) {
      this.courseInTag[tag] = this.courseInTag[tag] || [];
      while (this.courseInTag[tag].length < maxSize) {
        this.courseInTag[tag].push({ dragAble: false, size: 0, data: undefined });
      }
  }
  private getMaxSizeInTag(day, timeStart, size, data) {
    let max = 0;
    for (let i = timeStart; i < timeStart + size; i++) {
      const tag = this.getDropableTag(day, i);
      if (this.courseInTag[tag]) {
        this.courseInTag[tag].push({ dragAble: false, size: 0, data: data });
        const index = this.courseInTag[tag].findIndex(el => el['data'] === data);
        this.courseInTag[tag].pop();
        max = (index > max ? index : max);
      }
    }
    return max;
  }
}
