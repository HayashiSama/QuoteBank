import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-listquotes',
  templateUrl: './listquotes.component.html',
  styleUrls: ['./listquotes.component.css']
})
export class ListquotesComponent implements OnInit {
	
 constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  author: any;

  ngOnInit() {
  	this.author = this._httpService.viewauthor;
  }

  addQuote() {
  	this._httpService.viewauthor = this.author
  	this._router.navigate(['/addquotes'])
  }

  downVote(author, quote){
  	let obs = this._httpService.vote(author, quote, -1);
  	obs.subscribe(data => {
  		console.log(data);
  		console.log("refetching")
  		this.refetchData();
  	})
  }
  upVote(author, quote){
  	let obs = this._httpService.vote(author, quote, 1);
  	obs.subscribe(data => {
  		console.log(data);
  		console.log("refetching")
  		let obs2= this._httpService.getAuthor(this.author._id)
  		this.refetchData();
  	})
  }

  
  goHome(){
  	this._router.navigate(['/list'])
  }

  deleteQuote(author, quote){
  	let obs = this._httpService.deleteQuote(author, quote);
  	obs.subscribe(data => {
  		console.log(data)
  		this.refetchData();

  	})

  }

  refetchData(){
  		let obs2= this._httpService.getAuthor(this.author._id)
  		obs2.subscribe(data=>{
	  		console.log("refetching data");
	  		if((data as any).message == "Success"){
	  			this.author = (data as any).author
	  		}
  		})
  }

}
