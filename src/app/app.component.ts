import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  times = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  colors = ['indianred', 'lightcoral', 'salmon', 'darksalmon', 'lightsalmon', 'crimson', 'red', 'pink', 'lightpink',
    'hotpink', 'deeppink', 'mediumvioletred', 'palevioletred', 'lightsalmon', 'coral', 'tomato', 'orangered', 'darkorange', 'orange',
    'gold', 'yellow', 'papayawhip', 'moccasin', 'peachpuff', 'palegoldenrod', 'khaki', 'darkkhaki', 'thistle', 'plum', 'violet',
    'orchid', 'fuchsia', 'magenta', 'mediumorchid', 'mediumpurple', 'blueviolet', 'darkviolet', 'darkorchid', 'slateblue', 'greenyellow',
    'chartreuse', 'lawngreen', 'lime', 'limegreen', 'palegreen', 'lightgreen', 'mediumspringgreen', 'springgreen', 'mediumseagreen',
    'seagreen', 'forestgreen', 'green', 'yellowgreen', 'olivedrab', 'olive', 'mediumaquamarine', 'darkseagreen', 'lightseagreen',
    'aqua', 'cyan', 'paleturquoise', 'aquamarine', 'turquoise', 'mediumturquoise', 'darkturquoise', 'cadetblue', 'steelblue',
    'lightsteelblue', 'powderblue', 'lightblue', 'skyblue', 'lightskyblue', 'deepskyblue', 'dodgerblue', 'cornflowerblue',
    'mediumslateblue', 'royalblue', 'bisque', 'navajowhite', 'wheat', 'burlywood', 'tan', 'rosybrown', 'sandybrown',
    'goldenrod', 'darkgoldenrod', 'peru', 'chocolate', 'saddlebrown', 'sienna', 'brown'];
  dragulaTags = {
    'Monday_10': [
      { size: 2, data: '88510459#1'},
    ],
    'Monday_13': [
      { size: 2, data: '88510459#2'},
    ],
    'Tuesday_10':[
      { size: 2, data: '88621159#3'},
      { size: 2, data: '88621159#4'},
    ],
    'Tuesday_13': [
      { size: 2, data: '88621159#5'},
      { size: 2, data: '88621159#6'},
    ],
    'Wednesday_8': [
      { size: 2, data: '88510059#7'}
    ],
    'Wednesday_14': [
      { size: 2, data: '88621159#8'},
      { size: 2, data: '88621159#9'},
      { size: 2, data: '88621159#10'},
      { size: 2, data: '88621159#11'}
    ],
  };
  courseInTag = [];

  constructor() {
    Object.keys(this.dragulaTags).forEach(key => {
      this.dragulaTags[key].forEach(course => {
        course.color = this.colors[Math.floor((Math.random() * 90) + 1)]
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
      'background-color': dragAble ? '#FF0000' : '#FFFFFF',
      'cursor': dragAble ? 'pointer' : 'no-drop'
    };
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
        const index = this.courseInTag[tag].findIndex(el => el['data'] === data);
        this.courseInTag[tag].pop();
        max = (index > max ? index : max);
      }
    }
    return max;
  }
  getMaxSizeDay(day){
    let max = 0;
    this.times.forEach(time => {
      const tag = this.getDropableTag(day, time);
      max = this.dragulaTags[tag].length>max?this.dragulaTags[tag].length:max
    });
    return max;
  }
}
