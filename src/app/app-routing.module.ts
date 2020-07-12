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

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'manage-institutions', component: ManageInstitutionsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'contact-details', component: ContactDetailsComponent},
  {path: 'course-topic', component: CourseTopicComponent},
  {path: 'examples', component: ExamplesComponent},
  {path: 'interview-question', component: InterviewQuestionComponent},
  {path: 'batch', component: BatchComponent},
  {path: 'fees', component: FeesComponent},
  {path: 'course-topic-exercises', component: CourseTopicExercisesComponent},
  {path: 'course', component: CourseComponent},
  {path: 'faculty', component: FacultyComponent},
  {path: 'student', component: StudentComponent},
  {path: 'mock-interviews', component: MockInterviewsComponent},
  {path: 'attendance', component: AttendanceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
