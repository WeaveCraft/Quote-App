import React, { useState } from 'react';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Quote } from '../Models/Quote';
import { ConfirmDialog } from '../components/modals/ConfirmDialog';
import { removeQuoteFromDashboard } from '../Services/AppMethods';

const QuoteWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  margin: 1% 4% 1% 4%;
  scroll-behavior: smooth;
  min-height: 70%;
  max-height: 70%;
  justify-content: center;
  padding-left: 0.1rem;
  padding-top: 1rem;
  overflow: auto;
`;

const CardWrapper = styled(Card)`
  background-color: #fff3e0;
  border: 0.01em solid #f59300;
  box-shadow: none;
  min-width: 20rem;
  max-width: 20rem;
  max-height: 18rem;
  min-height: 18rem;
  margin: 0.8rem;
`;

const CloseButtonIcon = styled(CloseIcon)`
  cursor: pointer;
  float: right;
  margin: 0.4rem 0.4rem auto auto;
`;

export const QuoteMapping = ({
  activeDash,
  quoteList,
  updateQuoteList,
}: {
  activeDash: number;
  quoteList: Quote[];
  updateQuoteList: (id: number) => void;
}) => {
  const [dialogConf, setDialogConf] = useState<{
    title: string;
    message: string;
    onSubmit: Function;
    check: boolean;
  } | null>(null);

  const removeSingleQuote = async (id: number) => {
    await removeQuoteFromDashboard(id);
    updateQuoteList(activeDash);
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
      <QuoteWrapper>
        {quoteList.map((quote) => (
          <CardWrapper key={quote.id}>
            <CloseButtonIcon
              onClick={() =>
                setDialogConf({
                  title: 'Remove Quote',
                  message: 'Are you sure?',
                  check: false,
                  onSubmit: () => removeSingleQuote(quote.id),
                })
              }
            />
            <CardContent>
              <Typography variant="h6">
                <blockquote>"{quote.text}"</blockquote>
              </Typography>
            </CardContent>
          </CardWrapper>
        ))}
      </QuoteWrapper>
    </>
  );
};
