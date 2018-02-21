import { Component } from '@angular/core';
import { COLORS } from './ngx-dragdrop/colors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  times = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  colors = COLORS;
  dragulaTags = {
    'Monday_10': [
      { size: 2, data: { id: 1, courseCode: 885101, section: 3 } },
    ],
    'Monday_13': [
      { size: 2, data: { id: 2, courseCode: 885101, section: 3 } },
    ],
    'Tuesday_10': [
      { size: 2, data: { id: 3, courseCode: 885101, section: 3 } },
      { size: 3, data: { id: 4, courseCode: 885101, section: 3 } },
    ],
    'Tuesday_13': [
      { size: 2, data: { id: 5, courseCode: 885101, section: 3 } },
      { size: 2, data: { id: 6, courseCode: 885101, section: 3 } },
    ],
    'Wednesday_8': [
      { size: 5, data: { id: 7, courseCode: 885101, section: 3 } }
    ],
    'Wednesday_14': [
      { size: 2, data: { id: 8, courseCode: 885101, section: 3 } },
      { size: 1, data: { id: 9, courseCode: 885101, section: 3 } },
      { size: 2, data: { id: 10, courseCode: 885101, section: 3 } },
      { size: 3, data: { id: 11, courseCode: 885101, section: 3 } }
    ],
    'Subjects': [
      { size: 2, data: { id: 12, courseCode: 885101, section: 3 } },
      { size: 5, data: { id: 13, courseCode: 885101, section: 3 } },
      { size: 6, data: { id: 14, courseCode: 885101, section: 3 } },
      { size: 4, data: { id: 15, courseCode: 885101, section: 3 } }
    ],
  };
  courseInTag = [];

  constructor() {
    Object.keys(this.dragulaTags).forEach(key => {
      this.dragulaTags[key].forEach(course => {
        course.color = this.colors[Math.floor((Math.random() * 90) + 1)];
      });
    });
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

  getStyle(dragAble) {
    return {
      'overflow': dragAble ? '' : 'hidden',
      'cursor': dragAble ? 'pointer' : 'no-drop'
    };
  }

  onDrop(event) {
    this.dragulaTags[event.newParent] = this.dragulaTags[event.newParent] || [];
    this.dragulaTags[event.newParent].push(event.child);

    const index = this.dragulaTags[event.oldParent].findIndex(el => el.data !== undefined && el.data.id === event.child.data.id);
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
        this.addCourseBySize(day, timeStart, course.size, course.data, course.color, maxSize);
      });
    });
  }

  private addCourseBySize(day, timeStart, size, data, color, maxSize) {
    for (let i = timeStart; i < timeStart + size; i++) {
      const tag = this.getDropableTag(day, i);
      const dragAble = i === timeStart;
      this.addEmptyCourseByMaxSize(tag, maxSize);
      this.courseInTag[tag].push({ dragAble, size: size, data: data, color });
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
        const index = this.courseInTag[tag].findIndex(el => el.data !== undefined && el.data.id === data.id);
        this.courseInTag[tag].pop();
        max = (index > max ? index : max);
      }
    }
    return max;
  }
  public getCourseCode(course) {
    return course ? course.courseCode : 0;
  }
}
