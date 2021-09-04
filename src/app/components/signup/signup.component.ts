import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
  });
  constructor(private supabase: SupabaseService, private router: Router) { }


  async signUp() {

    try {
      let signupRes = await this.supabase.signUp(this.signUpForm.value.email, this.signUpForm.value.password);
      console.log(signupRes);
      let profile = await this.supabase.createProfile(signupRes.user.id, this.signUpForm.value.name);
      console.log(profile)
    } catch (error) {
      console.error(error);
    }
  }

}






