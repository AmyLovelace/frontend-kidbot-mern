import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { createStory } from '../clients/Client';
import { StoryPrompt } from '../types/StoryPrompt.types';

const StoryForm = () => {
  const [genre, setGenre] = useState('Acción');
  const [age, setAge] = useState(3);
  const [characterName, setCharacterName] = useState('');
  const [themeOne, setThemeOne] = useState('Dinosaurios');
  const [themeTwo, setThemeTwo] = useState('Dragones');
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState({storyTitle: '', storyContent: ''});
  const [isNameEmpty,setIsNameEmpty] = useState(true);
  const [errorMessage,setErrorMessage] = useState('');

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  };

  const handleCharacterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };
  
  useEffect(() => {
    if (characterName.length > 0) {
      setIsNameEmpty(false);
    } else {
      setIsNameEmpty(true);
      setErrorMessage('');
    }
  }, [characterName]);

  const handleThemeOneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeOne(event.target.value);
  };

  const handleThemeTwoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeTwo(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(isNameEmpty){
      setErrorMessage('Debes rellenar campo del personaje');
    }else{

      try {
        const storyData: StoryPrompt = {
          genre,
          age,
          characterName,
          themeOne,
          themeTwo,
          userId : '64864c4530118edbba31b60e'//TODO CAMBIAR AQUÍ
        };
        setIsLoading(true);
        const response = await createStory(storyData);
        setIsLoading(false);
        console.log('Historia creada:', response);
        const story = {
          storyTitle: response.storyTitle ,
          storyContent : response.storyContent
        }
        
        setStory(story);
        // Restablecer los valores del formulario
        setGenre('');
        setAge(3);
        setCharacterName('');
        setThemeOne('');
        setThemeTwo('');
      } catch (error) {
        console.error('Error al crear la historia:', error);
      }
    }
    
  };

  return (
    

      <div className="container">
        <div className="container text-center mb-5">
          <h1>KidBot</h1>
          <h3>Crea tu historia con inteligencia artificial </h3>
        </div>
        <div className="row justify-content-center g-5">
          <div className="col-md-3 card">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="characterName">El personaje será:</label>
                <input type="text" id="characterName" placeholder='Escribe un nombre...' className="form-control" value={characterName} onChange={handleCharacterNameChange} />
             { isNameEmpty ? <p>{errorMessage}</p> : null }
             </div>
              <div className="form-group">
                <label htmlFor="age">¿Cuantos años tienes?</label>
                <input type="number" id="age" className="form-control" defaultValue={3} value={age} onChange={handleAgeChange} />
              </div>

            
              <div className="form-group">
                <label htmlFor="themeOne">Que contenga:</label>
                <select id="themeOne" className="form-select" value={themeOne} onChange={handleThemeOneChange}>
                  <option value="Dinosaurios">Dinosaurios</option>
                  <option value="Princesas">Princesas</option>
                  <option value="Superhéroes">Superhéroes</option>
                  <option value="Genio">Genio</option>
                  <option value="Piratas">Piratas</option>
                  <option value="Bailarinas">Bailarinas</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="themeTwo">Y también:</label>
                <select id="themeTwo" className="form-select" value={themeTwo} onChange={handleThemeTwoChange}>
                  <option value="Dragones">Dragones</option>
                  <option value="Extraterrestres">Extraterrestres</option>
                  <option value="Brujas">Brujas</option>
                  <option value="Robots">Robots</option>
                  <option value="Hadas">Hadas</option>
                  <option value="Unicornios">Unicornios</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="genre">En un mundo de:</label>
                <select id="genre" className="form-select" value={genre} onChange={handleGenreChange}>
                  <option value="Acción">Acción</option>
                  <option value="Fantasía">Fantasía</option>
                  <option value="Aventuras">Aventuras</option>
                  <option value="Batallas">Batallas</option>
                  <option value="Ciencia Ficción">Ciencia Ficción</option>
                  <option value="Magia">Magia</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Crear tu historia!</button>
            </form>
            </div>
          </div>
          <div className="col-md-8 card ms-2">
          <div className="card-body d-flex align-items-center justify-content-center">
            {isLoading ? <div className="spinner-grow text-info " role="status">
            </div> : 
            <div>
              <h5>{story.storyTitle}</h5>
              <p>{story.storyContent}</p>
              </div>
            }</div>
          </div>
        </div>
      </div>
    
  );
};

export default StoryForm;
