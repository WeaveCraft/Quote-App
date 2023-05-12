import { useState, useEffect, useCallback, ReactEventHandler } from 'react';
import styled from '@emotion/styled';
import { PopUpErrorSnackbar } from '../components/PopupSnack';
import { Dashboard } from '../Models/Dashboard';
import { Quote } from '../Models/Quote';
import { NavButtons } from '../components/NavButtons';
import { QuoteMapping } from '../components/QuoteMapping';
import { DashboardMapping } from '../components/DashboardMapping';
import { getAllDashboards, getDashboardQuotes } from '../Services/AppMethods';

const AppWrapper = styled.div`
  background-color: #efebe9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const QuotePage = () => {
  const [quoteList, setQuoteList] = useState<Quote[]>([]);
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [activeDashboard, setActiveDashboard] = useState<number>(0);

  const dashboardFetch = useCallback(async () => {
    const data = await getAllDashboards();
    if (data === null) {
      setDashboardList([]);
    } else {
      setDashboardList(data);
    }
  }, []);

  useEffect(() => {
    dashboardFetch();
  }, []);

  const getDashQuotes = async (dashboardId: number) => {
    setActiveDashboard(dashboardId);
    const data = await getDashboardQuotes(dashboardId);
    setQuoteList(data);
  };
  useEffect(() => {
    getDashQuotes(activeDashboard);
  }, [activeDashboard]);

  const updateQuoteView = async (id: number) => {
    await getDashQuotes(id);
  };

  const onClickDashboard = async (id: number) => {
    setActiveDashboard(id);
    await dashboardFetch();
  };

  return (
    <AppWrapper>
      <NavButtons
        chosenDashboard={activeDashboard}
        qList={quoteList}
        dashList={dashboardList}
        updateQuoteList={updateQuoteView}
        updateDashboardList={dashboardFetch}
      />
      <QuoteMapping
        activeDash={activeDashboard}
        quoteList={quoteList}
        updateQuoteList={updateQuoteView}
      />
      <DashboardMapping
        dashList={dashboardList}
        activeDash={activeDashboard}
        onClickDashboard={onClickDashboard}
        updateDashboardList={dashboardFetch}
        updateQuoteList={updateQuoteView}
      />
    </AppWrapper>
  );
};
