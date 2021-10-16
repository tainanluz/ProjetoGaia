import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../../shared/services/customer.service';
import {User} from '../../../shared/models/user.model';
import {Role} from '../../../shared/enums/role.enum';
import {Customer} from '../../../shared/models/customer.model';
import {AuthenticationRequest} from '../../../shared/models/authentication-request.model';
import {take} from 'rxjs/operators';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {cpf} from 'cpf-cnpj-validator';
import {Observable} from 'rxjs';
import {Gender} from '../../../shared/enums/gender';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  createAccount: FormGroup;
  id = '';

  user: User = {
    id: '',
    username: '',
    password: '',
    role: Role.ROLE_USER
  };

  customer: Customer = {
    id: '',
    cpf: '',
    birthDate: new Date(),
    instagram: '',
    name: '',
    lastName: '',
    phone: '',
    gender: Gender.MALE,
    userId: ''
  };

  authenticationRequest: AuthenticationRequest = {
    username: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.id;
      if (this.id) {
        this.customerService.getByUserId(this.id)
          .subscribe(response => {
              this.customer = response;
              this.createAccount.patchValue(response);
            },
            error => {
              console.log(error);
            });
      }
    });
    this.createForm();
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.invalid && field.touched
    };
  }

  private createForm(): void {
    this.createAccount = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        username: [{value: '', disabled: this.id ? true : false}, [Validators.required, Validators.email]],
        password: [{value: '', disabled: this.id ? true : false}, [Validators.required, Validators.minLength(8)]],
        passwordRepeat: [{value: '', disabled: this.id ? true : false}, Validators.required],
        cpf: [{value: '', disabled: this.id ? true : false}, Validators.required],
        instagram: [''],
        birthDate: [''],
        phone: ['', Validators.required],
        gender: ['']
      },
      {
        validator: [this.checkPasswords('password', 'passwordRepeat'),
          this.checkCpf('cpf')]
      }
    );
  }

  get validateFields(): any {
    return this.createAccount.controls;
  }

  changePassword(inputPassword: HTMLInputElement): void {
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      return;
    }
    inputPassword.type = 'password';
  }

  private checkPasswords(controlName: string, matchingControlName: string): Validators {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  private checkCpf(controlName: string): Validators {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors.validCpf) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (!cpf.isValid(control.value)) {
        control.setErrors({validCpf: true});
      } else {
        control.setErrors(null);
      }
    };
  }

  save(): void {
    if (!this.id) {
      this.authenticationRequest.username = this.createAccount.get('username')?.value;
      this.authenticationRequest.password = this.createAccount.get('password')?.value;

      this.tokenStorageService.registerUserSession(this.authenticationRequest)
        .pipe(
          take(1)
        ).subscribe(response => {
        this.customer.cpf = this.createAccount.get('cpf')?.value;
        this.customer.birthDate = this.createAccount.get('birthDate')?.value;
        this.customer.instagram = '@' + this.createAccount.get('instagram')?.value;
        this.customer.name = this.createAccount.get('name')?.value;
        this.customer.lastName = this.createAccount.get('lastName')?.value;
        this.customer.phone = this.createAccount.get('phone')?.value;
        this.customer.gender = this.createAccount.get('gender')?.value;
        this.customer.userId = response.id;

        this.customerService.create(this.customer)
          .pipe(take(1)).subscribe(() => {
          this.dialogSuccess.title = 'Conta criada com sucesso!';
          this.dialogSuccess.fire();
          window.location.reload();
        }, (error: ErrorWarning) => {
          this.setErrorDialog(error);
          this.dialogError.fire().then(r => {
            if (r.isConfirmed) {
              this.save();
            }
          });
        });
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
          }
        });
      });
    } else {
      this.customer.cpf = this.createAccount.get('cpf')?.value;
      this.customer.birthDate = this.createAccount.get('birthDate')?.value;
      this.customer.instagram = this.createAccount.get('instagram')?.value;
      this.customer.name = this.createAccount.get('name')?.value;
      this.customer.lastName = this.createAccount.get('lastName')?.value;
      this.customer.phone = this.createAccount.get('phone')?.value;
      this.customer.gender = this.createAccount.get('gender')?.value;
      this.customerService.update(this.customer)
        .subscribe(() => {
          this.dialogSuccess.title = 'Conta editada com sucesso!';
          this.dialogSuccess.fire();
        }, (error: ErrorWarning) => {
          this.setErrorDialog(error);
          this.dialogError.fire().then(r => {
            if (r.isConfirmed) {
              this.save();
            }
          });
        });
    }
  }

  redirect(): void {
    this.router.navigateByUrl('/');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
