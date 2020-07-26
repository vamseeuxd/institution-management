import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './app-side-nav.component.html',
  styleUrls: ['./app-side-nav.component.scss']
})
export class AppSideNavComponent implements OnInit {
  @Input() menuOpen = false;
  menuList = [
    {label: 'Dashboard', id: 'dashboard', route: 'dashboard'},
    {label: 'Dynamic Form', id: 'dynamic-form', route: 'dynamic-form'},
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

  constructor(
    public fireAuth: AngularFireAuth,
    public router: Router,
    public authentication: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
  }

  logOutUser(): void {
    const isConfirmed = confirm('Are you sure! Do you want to logout?');
    if (isConfirmed) {
      this.fireAuth.signOut().then(value => {
        this.router.navigate(['authentication']);
      }, reason => {
        alert('Technical Error, Please try again.');
      });
    }
  }
}
