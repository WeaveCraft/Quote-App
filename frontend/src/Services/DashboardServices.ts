import { Dashboard } from "../Models/Dashboard";
import { Quote } from "../Models/Quote";
import {DashboardRepository} from '../Repository/DashboardRepository'

export interface DashboardService{
    
    createDashboard(name:string) : Promise<void>;
    updateDashboard() : Promise<void>;
    getAllDashboards(): Promise<Dashboard[]|null>
    getDashboardQuotes(id:number): Promise<Quote[]>;
    deleteDashboard(id:number) : Promise<void>;
}

export class DashboardServiceImpl implements DashboardService{
    dashboardRepo: DashboardRepository<Dashboard>;

    constructor(dashboardRepo: DashboardRepository<Dashboard>){
        this.dashboardRepo = dashboardRepo;
    }
    async deleteDashboard(id: number): Promise<void> {
        return await this.dashboardRepo.delete(id);
    }
    async getDashboardQuotes(id: number): Promise<Quote[]> {
        return await this.dashboardRepo.getDashboardQuotes(id);
    }
   async getAllDashboards(): Promise<Dashboard[]|null> {
       const data =await this.dashboardRepo.getAll(); 
       if(data == null){
        return null;
       }
       return data;
    }
   async  createDashboard(name: string): Promise<void> {
        await this.dashboardRepo.create(name);
    }
    async updateDashboard(): Promise<void> {
        await this.dashboardRepo.update();
    }
   
 
}