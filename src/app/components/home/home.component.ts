import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string = ""
  constructor(private readonly supabase: SupabaseService, private readonly router: Router) { }
  async ngOnInit() {
    let profile = await this.supabase.profile;
    console.table(profile)
    this.name = profile.data?.name;
  }


  async handleLogout(): Promise<void> {
    try {
      await this.supabase.signOut()
      await this.router.navigate(['/login'])
    } catch (error) {
      console.error(error)
    }
  }
}
