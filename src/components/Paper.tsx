import React, { JSX } from 'react';
import { Paper, SxProps } from '@mui/material';
import { Theme } from '@emotion/react';

interface paperProps {
    // eslint-disable-next-line react/require-default-props
    height?: number,
    // eslint-disable-next-line react/require-default-props
    additionalStyle?: any
    children: React.ReactElement
}

const PaperItem = ({
 height, additionalStyle, children,
}: paperProps): JSX.Element => (
  <Paper
    sx={{
            p: 2,
            display: 'flex',
        flexDirection: 'column',
            height,
            width: '100%',
        ...additionalStyle,
        } as SxProps<Theme>}
  >
    {children}
  </Paper>
);

export default PaperItem;
