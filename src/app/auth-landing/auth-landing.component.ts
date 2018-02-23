import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.css']
})
export class AuthLandingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // get params from activated route
    this.route.queryParams.subscribe( params => {
      console.log(params.code);
      if (params && params.code ) {
        localStorage.setItem('googleKey', params.code);
      }
    });
    this.router.navigate(['']);
  }

}
