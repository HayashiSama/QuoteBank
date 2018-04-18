import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  
  authors = [];
  ngOnInit() {
  	this.getAuthors();
  }

  getAuthors(){
  	let obs = this._httpService.getAuthors();
  	obs.subscribe(data => {
  		this.authors = (data as any).data
  	})
  }
  addAuthor(){
  	this._router.navigate(['/add']);
  }
  editAuthor(author){
  	console.log(author);
  	this._httpService.selected = author;
  	this._router.navigate(['/edit']);
  }

  viewQuotes(author){
  	console.log(author);
  	this._httpService.viewauthor = author;
  	this._router.navigate(['/listquotes'])

  }

  goHome(){
  	this._router.navigate(['/list'])
  }


}
