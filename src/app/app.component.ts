import { RouterOutlet } from '@angular/router';
import { Component, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'calendario-beck';
  view: string = 'week';
  snapDraggedEvents = true;

  dayStartHour = 6;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: colors.yellow,
      start: new Date(),
      draggable: true,
    },
    {
      title: 'A non draggable event',
      color: colors.blue,
      start: new Date(),
    },
  ];

  refresh: Subject<any> = new Subject();

  eventTimesChanged({ event, newStart, newEnd }: any): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(null);
  }
  public segmentIsValid(date: Date) {
    // valid if time is greater than 0800 andd less than 1700
    return date.getHours() >= 8 && date.getHours() <= 17;
  }
  beforeDayViewRender(day: CalendarDayViewBeforeRenderEvent): void {
    // day.body.hourGrid.forEach((hour) => {
    //   hour.segments.forEach((segment) => {
    //     if (!this.segmentIsValid(segment.date)) {
    //       delete segment.cssClass;
    //       segment.cssClass = 'cal-disabled';
    //     }
    //   });
    // });
  }
  beforeWeekViewRender(body: CalendarWeekViewBeforeRenderEvent): void {
    body.hourColumns.forEach((hourCol) => {
      hourCol.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (!this.segmentIsValid(segment.date)) {
            delete segment.cssClass;
            segment.cssClass = 'cal-disabled';
          }
        });
      });
    });
  }
}
