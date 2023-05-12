export interface IQuoteRepository<Quote> {
    get(): Promise<Quote[]>;
    create(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    clear(id: number): Promise<void>;
}
