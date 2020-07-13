import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User, UserInfo} from 'firebase/app';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {GeoService} from '../../shared/services/geo/geo.service';
import {ContactDetails} from '../../shared/db/contact-details/contact-details';
import {BusyIndicatorService} from '../../shared/services/busy-indicator/busy-indicator.service';
import {ContactDetailsService} from '../../shared/db/contact-details/contact-details.service';
import {Router} from '@angular/router';
import {StudentsService} from '../../shared/db/students/students.service';
import {FacultiesService} from '../../shared/db/faculties/faculties.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [GeoService]
})
export class LoginComponent {
  user: User;
  defaultData: ContactDetails;
  userInfo: UserInfo;
  isStudent = false;

  constructor(
    public fireAuth: AngularFireAuth,
    public geo: GeoService,
    public router: Router,
    public busyIndicator: BusyIndicatorService,
    public contactDetails: ContactDetailsService,
    public studentDetails: StudentsService,
    public facultiesDetails: FacultiesService,
  ) {
  }

  async loginWithGoogle(confirmModal: ModalDirective, isStudent: boolean): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    this.isStudent = isStudent;
    return new Promise(async (resolve, reject) => {
      try {
        const details = await this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
        this.updateUserInfo(details);
        this.contactDetails.getDocByUid(this.defaultData.uid).then(contact => {
          if (contact.exists) {
            if (this.isStudent) {
              this.studentDetails.getDocByUid(this.defaultData.uid).then(student => {
                if (student.exists) {
                  this.router.navigate(['dashboard']);
                } else {
                  confirmModal.show();
                }
              }, reason => {
                alert('Technical Error, Please try again');
                resolve(details);
              });
            } else {
              this.facultiesDetails.getDocByUid(this.defaultData.uid).then(faculty => {
                if (faculty.exists) {
                  this.router.navigate(['dashboard']);
                } else {
                  confirmModal.show();
                }
              }, reason => {
                alert('Technical Error, Please try again');
                resolve(details);
              });
            }
          } else {
            confirmModal.show();
          }
          resolve(details);
        }, reason => {
          alert('Technical Error, Please try again');
          resolve(details);
        });
        resolve(details);
        this.busyIndicator.hide(busyIndicatorId);
      } catch (e) {
        reject(e);
        this.busyIndicator.hide(busyIndicatorId);
      }
    });
  }

  updateUserInfo(details: any): void {
    this.user = details.user;
    if (details.user.providerData) {
      this.userInfo = details.user.providerData[0];
      this.defaultData = new ContactDetails();
      this.defaultData.uid = this.userInfo.uid;
      this.defaultData.photoURL = this.userInfo.photoURL;
      this.defaultData.providerId = this.userInfo.providerId;
      this.defaultData.email = this.userInfo.email;
      this.defaultData.contactPerson = this.userInfo.displayName;
      this.defaultData.mobile = this.userInfo.phoneNumber;
    }
  }

  async registerWithGoogle(arrowFormModal: ModalDirective, confirmModal: ModalDirective, isStudent: boolean): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
        this.updateUserInfo(details);
        this.contactDetails.getDocByUid(this.defaultData.uid).then(value => {
          if (value.exists) {
            confirmModal.show();
          } else {
            arrowFormModal.show();
          }
          resolve(details);
        }, reason => {
          alert('Technical Error, Please try again');
          resolve(details);
        });

      } catch (e) {
        reject(e);
      }
    });
  }

  async logout(confirmModal: ModalDirective = null): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.fireAuth.signOut();
        if (confirmModal) {
          confirmModal.hide();
        }
        this.user = null;
        resolve('');
      } catch (e) {
        reject(e);
      }
    });
  }

  arrowFormModalShown(arrowForm: NgForm): void {
    arrowForm.resetForm(this.defaultData ? this.defaultData : {});
  }

  addNewContact(arrowFormModal: ModalDirective, arrowForm: NgForm): void {
    const uid = this.defaultData.uid;
    const photoURL = this.defaultData.photoURL;
    const providerId = this.defaultData.providerId;
    this.contactDetails.addItem({...arrowForm.value, uid, photoURL, providerId}).then(value => {
      if (this.isStudent) {
        this.studentDetails.addItem(uid).then(value1 => {
          this.router.navigate(['dashboard']);
          arrowForm.resetForm({});
          arrowFormModal.hide();
        }, reason => {
          alert('Error while saving');
          console.log(reason);
        });
      } else {
        this.facultiesDetails.addItem(uid).then(value1 => {
          this.router.navigate(['dashboard']);
          arrowForm.resetForm({});
          arrowFormModal.hide();
        }, reason => {
          alert('Error while saving');
          console.log(reason);
        });
      }
    }, reason => {
      alert('Error while saving');
      console.log(reason);
    });
  }

  registerAndLogin(arrowFormModal: ModalDirective, redirectModalWhileLogin: ModalDirective): void {
    this.contactDetails.getDocByUid(this.defaultData.uid).then(value => {
      if (value.exists) {
        if (this.isStudent) {
          this.studentDetails.addItem(this.defaultData.uid).then(value1 => {
            this.router.navigate(['dashboard']);
            arrowFormModal.hide();
            redirectModalWhileLogin.hide();
          }, reason => {
            alert('Error while saving');
            console.log(reason);
          });
        } else {
          this.facultiesDetails.addItem(this.defaultData.uid).then(value1 => {
            this.router.navigate(['dashboard']);
            arrowFormModal.hide();
            redirectModalWhileLogin.hide();
          }, reason => {
            alert('Error while saving');
            console.log(reason);
          });
        }
      } else {
        arrowFormModal.show();
        redirectModalWhileLogin.hide();
      }
    }, reason => {
      alert('Technical Error, Please try again');
    });
  }

  loginWhileRegistrationRedirect(): void {
    this.router.navigate(['dashboard']);
  }
}
