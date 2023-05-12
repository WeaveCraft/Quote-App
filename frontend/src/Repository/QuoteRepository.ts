import { Quote } from "../Models/Quote";
// import { IQuoteRepository } from "./Interface/IQuoteRepository";
import axios from 'axios';
import { IQuoteRepository } from "./Interface/IQuoteRepository";

const apiUrlQuote = 'http://localhost:3001/api/v2/quote';

export class QuoteRepository<Quote> implements IQuoteRepository<Quote>{

 async get(): Promise<Quote[]> {
           const res=  await axios.get<Quote[]>(apiUrlQuote);
           const data = res.data;
           return data;
    }
   async delete(id: number): Promise<void> {
        await fetch(`${apiUrlQuote}/?id=${id}`, {
                  method: 'DELETE',
                });
    }
    async create(id:number) : Promise<void>{
        await fetch(`${apiUrlQuote}?dashboardId=${id}`, {
            method: 'POST',
          });
    }

    async clear(id: number): Promise<void> {
        await fetch(`${apiUrlQuote}/dashboard/${id}`, {
                  method: 'DELETE',
                });
      }
}
   
