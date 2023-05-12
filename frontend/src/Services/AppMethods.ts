import { Dashboard } from "../Models/Dashboard";
import { Quote } from "../Models/Quote";
import { DashboardRepository } from "../Repository/DashboardRepository";
import { QuoteRepository } from "../Repository/QuoteRepository";
import { DashboardServiceImpl } from "./DashboardServices";
import { QuoteServiceImpl } from "./QuoteService";

export async function addNewQuote(id: number) {
    let quoteRepository = new QuoteRepository<Quote>();
    let quoteService = new QuoteServiceImpl(quoteRepository);
    await quoteService.createQuote(id);
    return await quoteService.getLatestQuote();
  }
  
  export async function saveDashboard(name: string) {
    let dashRepo = new DashboardRepository<Dashboard>();
    let dashService = new DashboardServiceImpl(dashRepo);
    await dashService.createDashboard(name);
    await  dashService.updateDashboard();
  }
  
  export async function clearDashboard(id: number) {
    let quoteRepo = new QuoteRepository<Quote>();
    let quoteService = new QuoteServiceImpl(quoteRepo);
    await quoteService.clearDashboard(id);
  }
  
  export async function getAllDashboards() {
    let dashRepo = new DashboardRepository<Dashboard>();
    let dashService = new DashboardServiceImpl(dashRepo);
    return await dashService.getAllDashboards();
  }
  
  export async function getDashboardQuotes(id: number) {
    let dashRepo = new DashboardRepository<Dashboard>();
    let dashService = new DashboardServiceImpl(dashRepo);
    return await dashService.getDashboardQuotes(id);
  }
  export async function DeleteDashboard(id: number) {
    let dashRepo = new DashboardRepository<Dashboard>();
    let dashService = new DashboardServiceImpl(dashRepo);
    return await dashService.deleteDashboard(id);
  }
  
  export async function removeQuoteFromDashboard(id: number) {
    let quoteRepo = new QuoteRepository<Quote>();
    let quoteService = new QuoteServiceImpl(quoteRepo);
    await quoteService.deleteQuote(id);
  }
  
  