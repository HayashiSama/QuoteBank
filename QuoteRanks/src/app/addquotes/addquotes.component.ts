import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addquotes',
  templateUrl: './addquotes.component.html',
  styleUrls: ['./addquotes.component.css']
})
export class AddquotesComponent implements OnInit {

constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }


  quote: string;
  error: string;
  current: any;
  ngOnInit() {
  	this.current = this._httpService.viewauthor
  }

  goHome(){
  	this._router.navigate(['/list'])
  	

  }
  cancelButton(){
  	this._router.navigate(['/listquotes'])
  	console.log("going back")

  }

  submitButton(){
  	let obs = this._httpService.addQuote(this.quote, this.current);
  	obs.subscribe(data => {
  		console.log(data)
  		if((data as any).message == "Success"){
  			this._router.navigate(['/list'])
  		}
  		else{
  			this.error = "Name must be at least 3 characters"
  		}
  	})
  	console.log(this.quote)
  }

}
