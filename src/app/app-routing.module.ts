import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageInstitutionsComponent} from './pages/manage-institutions/manage-institutions.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ContactDetailsComponent} from './pages/contact-details/contact-details.component';
import {CourseTopicComponent} from './pages/course-topic/course-topic.component';
import {BatchComponent} from './pages/batch/batch.component';
import {FeesComponent} from './pages/fees/fees.component';
import {CourseTopicExercisesComponent} from './pages/course-topic-exercises/course-topic-exercises.component';
import {CourseComponent} from './pages/course/course.component';
import {FacultyComponent} from './pages/faculty/faculty.component';
import {StudentComponent} from './pages/student/student.component';
import {MockInterviewsComponent} from './pages/mock-interviews/mock-interviews.component';
import {AttendanceComponent} from './pages/attendance/attendance.component';
import {ExamplesComponent} from './pages/examples/examples.component';
import {InterviewQuestionComponent} from './pages/interview-question/interview-question.component';
import {LoginComponent} from './pages/login/login.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {DynamicPageComponent} from './pages/dynamic-page/dynamic-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['authentication']);

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dynamic-page'},
  {path: 'authentication', component: LoginComponent},
  {path: 'dynamic-form', component: DynamicFormComponent},
  {path: 'dynamic-page', component: DynamicPageComponent},
  {
    path: 'manage-institutions',
    component: ManageInstitutionsComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'contact-details',
    component: ContactDetailsComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'course-topic',
    component: CourseTopicComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: 'examples', component: ExamplesComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'interview-question',
    component: InterviewQuestionComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: 'batch', component: BatchComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'fees', component: FeesComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'course-topic-exercises',
    component: CourseTopicExercisesComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: 'course', component: CourseComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'faculty', component: FacultyComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'student', component: StudentComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'mock-interviews',
    component: MockInterviewsComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
