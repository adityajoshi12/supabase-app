import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private supabase: SupabaseService, private router: Router) { }
  ngOnInit(): void {
    const isSignedIn = !!this.supabase.getSession()?.user
    console.log(isSignedIn)
    if (!isSignedIn) {
      this.router.navigate(['/login'])
    } else this.router.navigate([''])
  }


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  });
  async login() {

    try {
      let loginRes = await this.supabase.login(this.loginForm.value.email, this.loginForm.value.password)
      console.log(loginRes)
      await this.router.navigate(['/'])
    } catch (error) {

    }

  }
}
