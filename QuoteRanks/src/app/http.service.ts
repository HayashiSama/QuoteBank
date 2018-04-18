import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  selected: any;
  viewauthor: any;
  getAuthors(){
  	return this._http.get('/authors');
  }

  getAuthor(id){
  	return this._http.get('/author/' + id);
  }
  newAuthor(name){
  	return this._http.post('/new', {name: name})
  }

  editAuthor(author){
  	console.log(author)
  	return this._http.put('/edit', {id: author._id, name: author.name})
  }
  addQuote(quote, author){
  	console.log(quote)
  	console.log(author)
  	return this._http.put('/addquote', {id: author._id, quote: quote})

  }

  vote(author, quote, amount){
  	return this._http.put('/vote', {id: author._id, quote: quote, increment: amount})
  }

  deleteQuote(author, quote){
  	return this._http.delete('/deletequote/' + author._id + '/' + quote.quote)
  }

 
  



}
