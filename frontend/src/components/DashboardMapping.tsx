import { useState } from 'react';
import styled from '@emotion/styled';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dashboard } from '../Models/Dashboard';
import { ConfirmDialog } from '../components/modals/ConfirmDialog';
import { DeleteDashboard } from '../Services/AppMethods';

const DashboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1% 2% 1% 4%;
`;

const DashboardButtonHolder = styled.div`
  background-color: #f57c19;
  border-radius: 46px;
  color: white;
  width: 15rem;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  margin-top: 0.5rem;
  margin-right: 3.25rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  &:hover {
    background-color: #eb6f0a;
  }
`;

const DashboardButton = styled(IconButton)`
  background-color: #ffff;
  margin-left: 10.8rem;
  margin-top: 0.3rem;
  position: absolute;
  &:hover {
    background-color: #fff;
  }
`;

const DashboardCloseButton = styled(CloseIcon)`
  color: #f57c19;
`;

const DashboardNameHolder = styled(Typography)`
  margin: 4.5% 9% 4.5% 9%;
  pointer-events: none;
  font-size: 1em;
`;

export const DashboardMapping = ({
  dashList,
  activeDash,
  onClickDashboard,
  updateDashboardList,
  updateQuoteList,
}: {
  dashList: Dashboard[];
  activeDash: number;
  onClickDashboard: (id: number) => void;
  updateDashboardList: () => void;
  updateQuoteList: (id: number) => void;
}) => {
  const [dialogConf, setDialogConf] = useState<{
    title: string;
    message: string;
    onSubmit: Function;
    check: boolean;
  } | null>(null);

  const deleteDashboard = async (id: number) => {
    await DeleteDashboard(id);
    updateDashboardList();
    updateQuoteList(id);
  };

  return (
    <DashboardWrapper>
      <ConfirmDialog
        message={dialogConf?.message ?? ''}
        title={dialogConf?.title ?? ''}
        check={dialogConf?.check ?? false}
        onSubmit={(newName: string) => dialogConf?.onSubmit(newName)}
        onClose={() => setDialogConf(null)}
        open={dialogConf !== null}
      />
      {dashList.map((dashboard) => (
        <DashboardButtonHolder
          style={dashboard.id === activeDash ? { backgroundColor: '#8FCB56' } : {}}
          key={dashboard.id}
          onClick={() => onClickDashboard(dashboard.id)}
        >
          <DashboardNameHolder>{dashboard.name}</DashboardNameHolder>
          <DashboardButton
            onClick={() =>
              setDialogConf({
                title: 'Remove Dashboard',
                message: `Are you sure you wish to remove ${dashboard.name} dashboard?`,
                check: false,
                onSubmit: () => {
                  deleteDashboard(dashboard.id);
                },
              })
            }
          >
            <DashboardCloseButton />
          </DashboardButton>
        </DashboardButtonHolder>
      ))}
    </DashboardWrapper>
  );
};
