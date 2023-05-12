import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmDialog } from '../components/modals/ConfirmDialog';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Dashboard } from '../Models/Dashboard';
import { Quote } from '../Models/Quote';
import { addNewQuote, clearDashboard, saveDashboard } from '../Services/AppMethods';
import { useState } from 'react';
import { PopUpErrorSnackbar } from './PopupSnack';

const ButtonWrapper = styled.div`
  display: flex;
  margin: 5% 4% 1% 4%;
`;

const OptionButton = styled(Button)({
  backgroundColor: '#FFA726',
  color: 'white',
  marginRight: '2rem',
  padding: '1rem',
  fontSize: '0.7em',
  width: '15rem',
  ':hover': {
    backgroundColor: '#F59300',
    color: 'white',
  },
});

const AddButtonIcon = styled(AddIcon)`
  margin-right: 0.3rem;
`;

const SaveButtonIcon = styled(SaveIcon)`
  margin-right: 0.3rem;
`;
const ClearButtonIcon = styled(CloseIcon)`
  margin-right: 0.3rem;
`;

const ButtonSeparator = styled.div`
  margin-left: auto;
`;
const ClearButton = styled(Button)({
  backgroundColor: '#E65100',
  color: 'white',
  padding: '1rem',
  fontSize: '0.7em',
  float: 'right',
  width: '15rem',
  ':hover': {
    backgroundColor: '#CC4700',
    color: 'white',
  },
});

export const NavButtons = ({
  chosenDashboard,
  qList,
  dashList,
  updateQuoteList,
  updateDashboardList,
}: {
  chosenDashboard: number;
  qList: Quote[];
  dashList: Dashboard[];
  updateQuoteList: (id: number) => void;
  updateDashboardList: () => void;
}) => {
  const [popUpConf, setPopUpConf] = useState<{ open: boolean; message: string } | null>(null);

  const [dialogConf, setDialogConf] = useState<{
    title: string;
    message: string;
    onSubmit: Function;
    check: boolean;
  } | null>(null);

  const removeAllQuotesFromDashboard = async () => {
    await clearDashboard(chosenDashboard);
    updateQuoteList(chosenDashboard);
    updateDashboardList();
  };

  const checkDashboardLimit = async (name: string) => {
    if (name.length < 11) {
      if (dashList.length > 9) {
        setPopUpConf({
          open: true,
          message: 'Max Dashboard limit (10) reached! Delete a dashboard to save a new one!',
        });
        return popUpConf;
      } else {
        await saveDashboard(name);
        updateDashboardList();
      }
    } else {
      setPopUpConf({
        open: true,
        message: 'Name cant be longer than 10 characters',
      });
    }
  };

  const checkQuoteLimit = async () => {
    if (qList.length > 499) {
      setPopUpConf({
        open: true,
        message: 'Max Quote limit (500) reached! Delete a quote to add a new one!',
      });
      return popUpConf;
    } else {
      await addNewQuote(chosenDashboard);
      updateQuoteList(chosenDashboard);
    }
  };

  return (
    <>
      <ConfirmDialog
        message={dialogConf?.message ?? ''}
        title={dialogConf?.title ?? ''}
        check={dialogConf?.check ?? false}
        onSubmit={(newName: string) => dialogConf?.onSubmit(newName)}
        onClose={() => setDialogConf(null)}
        open={dialogConf !== null}
      />
      <ButtonWrapper>
        <OptionButton variant="contained" className="AddButton" onClick={checkQuoteLimit}>
          <AddButtonIcon fontSize="small" /> Add quote
        </OptionButton>
        <OptionButton
          variant="contained"
          className="SaveButton"
          onClick={() =>
            setDialogConf({
              title: 'Save Dashboard',
              message: 'Name your dashboard: ',
              onSubmit: (newName: string) => checkDashboardLimit(newName),
              check: true,
            })
          }
        >
          <SaveButtonIcon fontSize="small" /> Save
        </OptionButton>
        <ButtonSeparator>
          <ClearButton
            variant="contained"
            className="position"
            onClick={() =>
              setDialogConf({
                title: 'Clear',
                check: false,
                message: 'Clear Dashboard',
                onSubmit: () => removeAllQuotesFromDashboard(),
              })
            }
          >
            <ClearButtonIcon fontSize="small" /> Clear
          </ClearButton>
        </ButtonSeparator>
      </ButtonWrapper>
      <PopUpErrorSnackbar
        message={popUpConf?.message ?? ''}
        open={popUpConf !== null}
        onClose={() => setPopUpConf(null)}
      />
    </>
  );
};
