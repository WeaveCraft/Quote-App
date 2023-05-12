import axios from 'axios';
// import { IDashboardRepository } from './Interface/IDashboardRepository';
import { ExtensionTwoTone } from '@mui/icons-material';
import { IDashboardRepository } from './Interface/IDashboardRepository';
import { Quote } from '../Models/Quote';

const apiUrlDashboard = 'http://localhost:3001/api/v1/dashboard';

export class DashboardRepository<Dashboard> implements IDashboardRepository<Dashboard> {

 async getDashboardQuotes(id: number): Promise<Quote[]> {
  const res =  await fetch(
      `${apiUrlDashboard}/getQuotesRelatedToDashboard/?dashboardId=${id}`);
      const data = res.json();
      
      return data;
  }
  async getAll(): Promise<Dashboard[]|null> {
     const res = await fetch(apiUrlDashboard);
     if(res.status=== 404){
      return null;
     }
     else{
      const data = res.json();
      return data;
     }
    
  }

  async get(): Promise<Dashboard> {
    const res = await axios.get<Dashboard>(`${apiUrlDashboard}/latest`);
    const data = res.data;
    return data;
  }

  async create(name: string): Promise<void> {
    await fetch(`${apiUrlDashboard}?name=${name}`, {
      method: 'POST',
    });
  }

  async update(): Promise<void> {
    await fetch(`${apiUrlDashboard}/save`, {
              method: 'POST',
            });
  }

  async delete(id: number): Promise<void> {
    await fetch(`${apiUrlDashboard}/${id}`, {
      method: 'DELETE',
    });
  }
}



