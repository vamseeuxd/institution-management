import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AppHeaderComponent} from './layout/app-header/app-header.component';
import {AppFooterComponent} from './layout/app-footer/app-footer.component';
import {AppSideNavComponent} from './layout/app-side-nav/app-side-nav.component';
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
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {LoginComponent} from './pages/login/login.component';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {AddDynamicFormComponent} from './components/add-dynamic-form/add-dynamic-form.component';
import {FormsModule} from '@angular/forms';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DynamicPageSideNavComponent } from './pages/dynamic-page/dynamic-page-side-nav/dynamic-page-side-nav.component';
import { DynamicInputComponent } from './pages/dynamic-page/controls/dynamic-input/dynamic-input.component';

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
    InterviewQuestionComponent,
    LoginComponent,
    DynamicFormComponent,
    AddDynamicFormComponent,
    DynamicPageComponent,
    DynamicPageSideNavComponent,
    DynamicInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
