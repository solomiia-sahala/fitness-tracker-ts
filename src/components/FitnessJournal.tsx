import React, { JSX, useState } from 'react';
import { CssBaseline, Button } from '@mui/material';
import Container from '@mui/material/Container';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ClearIcon from '@mui/icons-material/Clear';
import { Camera } from './camera';
import { useUserContext } from '../contexts/userContext';
import Loader from './Loader';

export const Root = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 50px 0 100px;
`;

export const Footer = styled.footer`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: silver;
`;

const FitnessJournal = (): JSX.Element => {
  const { userId, firebase } = useUserContext();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState<Blob| null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveImage = (): void => {
    setIsLoading(true);
    firebase.uploadFile(userId, cardImage!)
      .catch((err) => console.error(err.message))
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      { isLoading && <Loader isLoading={isLoading} />}
      <Root>
        {isCameraOpen && (
        <>
          {cardImage && <h2>Preview</h2>}
          <Camera
            onCapture={(blob) => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        </>
        )}

        <Footer>
          { isCameraOpen ? (
            <>
              <Button
                variant="contained"
                endIcon={<ClearIcon />}
                onClick={() => {
                  setIsCameraOpen(false);
                  setCardImage(undefined);
                }}
                color="inherit"
              >
                Close Camera
              </Button>
              <button type="button" onClick={saveImage}>Save</button>
            </>
          ) : (
            <Button
              variant="contained"
              endIcon={<PhotoCameraIcon />}
              onClick={() => setIsCameraOpen(true)}
            >
              Open Camera
            </Button>
          )}
        </Footer>
      </Root>
    </Container>
  );
};
export default FitnessJournal;
