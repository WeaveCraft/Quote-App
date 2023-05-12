import { Quote } from "../../Models/Quote";

export interface IDashboardRepository<Dashboard> {
    get(): Promise<Dashboard>;
    getAll(): Promise<Dashboard[]|null>;
    create(name: string): Promise<void>;
    update(): Promise<void>;
    delete(id: number): Promise<void>;
    getDashboardQuotes(id:number) :Promise<Quote[]>;
   
}
