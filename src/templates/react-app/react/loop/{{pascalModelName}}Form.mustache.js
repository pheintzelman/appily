import { useState } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { addVideoGame } from '../api/videoGame';
import './VideoGameForm.scss';

export function VideoGameForm() {
  const cta = 'Add';
  const [videoGame, setVideoGame] = useState({ title: '', yearPublished: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (event) => {
    const updatedVideoGame = { ...videoGame, [field]: event.target.value };
    setVideoGame(updatedVideoGame);
    console.log(updatedVideoGame);
  };

  function add(videoGame) {
    return async (event) => {
      setIsLoading(true);
      await addVideoGame(videoGame);
      setIsLoading(false);
    };
  }

  return (
    <Container maxWidth="sm" className="{{pascalModelName}}Form">
      <h1>{{ modelName }}</h1>
      <form noValidate autoComplete="off">
        <TextField
          className="TextField"
          id="videoGameFormTitle"
          label="Title"
          value={videoGame.title}
          onChange={handleChange('title')}
          variant="filled"
          fullWidth
          disabled={isLoading}
        />

        <TextField
          className="TextField"
          id="videoGameFormYearPublished"
          label="Year Published"
          value={videoGame.yearPublished}
          onChange={handleChange('yearPublished')}
          variant="filled"
          fullWidth
          disabled={isLoading}
        />

        <Button
          className="cta"
          id="videoGameFormCta"
          color="primary"
          onClick={add(videoGame)}
          disabled={isLoading}
        >
          {cta}
        </Button>
      </form>
    </Container>
  );
}
