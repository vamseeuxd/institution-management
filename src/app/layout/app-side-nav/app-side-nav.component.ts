import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './app-side-nav.component.html',
  styleUrls: ['./app-side-nav.component.scss']
})
export class AppSideNavComponent implements OnInit {
  @Input() menuOpen = false;
  menuList = [
    {label: 'Dashboard', id: 'dashboard', route: 'dashboard'},
    {label: 'Contact Details', id: 'ContactDetails', route: 'contact-details'},
    {label: 'Institutions', id: 'manageInstitutions', route: 'manage-institutions'},
    {label: 'Courses', id: 'Course', route: 'course'},
    /*{label: 'Course Topic', id: 'CourseTopic', route: 'course-topic'},
    {label: 'Course Topic Examples', id: 'examples', route: 'examples'},
    {label: 'Course Topic Interview Questions', id: 'interviewQuestion', route: 'interview-question'},
    {label: 'Course Topic Exercises', id: 'CourseTopicExercises', route: 'course-topic-exercises'},*/
    {label: 'Mock Interviews', id: 'MockInterviews', route: 'mock-interviews'},
    {label: 'Faculties', id: 'Faculty', route: 'faculty'},
    {label: 'Students', id: 'Student', route: 'student'},
    {label: 'Batches', id: 'Batch', route: 'batch'},
    {label: 'Fees', id: 'Fees', route: 'fees'},
    {label: 'Attendance', id: 'Attendance', route: 'attendance'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
