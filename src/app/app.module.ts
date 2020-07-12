import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { AppSideNavComponent } from './layout/app-side-nav/app-side-nav.component';
import { ManageInstitutionsComponent } from './pages/manage-institutions/manage-institutions.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { CourseTopicComponent } from './pages/course-topic/course-topic.component';
import { BatchComponent } from './pages/batch/batch.component';
import { FeesComponent } from './pages/fees/fees.component';
import { CourseTopicExercisesComponent } from './pages/course-topic-exercises/course-topic-exercises.component';
import { CourseComponent } from './pages/course/course.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { StudentComponent } from './pages/student/student.component';
import { MockInterviewsComponent } from './pages/mock-interviews/mock-interviews.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ExamplesComponent } from './pages/examples/examples.component';
import { InterviewQuestionComponent } from './pages/interview-question/interview-question.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppSideNavComponent,
    ManageInstitutionsComponent,
    DashboardComponent,
    ContactDetailsComponent,
    CourseTopicComponent,
    BatchComponent,
    FeesComponent,
    CourseTopicExercisesComponent,
    CourseComponent,
    FacultyComponent,
    StudentComponent,
    MockInterviewsComponent,
    AttendanceComponent,
    ExamplesComponent,
    InterviewQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
