import { Quote } from "../Models/Quote";
import {QuoteRepository} from '../Repository/QuoteRepository'

export interface QuoteService{
    createQuote(id: number):Promise<void>;
    getLatestQuote():Promise<Quote[]>;
    clearDashboard(id:number):Promise<void>;
    deleteQuote(id:number):Promise<void>;
}

export class QuoteServiceImpl implements QuoteService{
    quoteRepo: QuoteRepository<Quote>;

    constructor(quoteRepo: QuoteRepository<Quote>){
        this.quoteRepo = quoteRepo;
    }
    async deleteQuote(id: number): Promise<void> {
       await this.quoteRepo.delete(id);
    }
    async clearDashboard(id: number): Promise<void> {
        this.quoteRepo.clear(id);
    }
   async getLatestQuote(): Promise<Quote[]> {
        return await this.quoteRepo.get();
    }

    async createQuote(id:number): Promise<void> {
       await this.quoteRepo.create(id);
        
    }
}