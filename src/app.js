const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');
const { isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());



const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});


app.post("/repositories", (request, response) => {

  const {title, url, techs} = request.body;

  const repositorie = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(repositorie);

  return response.status(200).send(repositorie);

});

app.put("/repositories/:id", (request, response) => {

  const {id} = request.params;

  

  const {title, url, techs} = request.body;

  

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0) {
	return response.status(400).json({error: 'Repositorie not found'});
  }

  const repositorie = {
	  id,
    title,
    url,
    techs,
    likes: 0
  }

repositories[repositorieIndex] = repositorie;
return response.status(200).send(repositorie);
});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const index = repositories.findIndex( repositorie => repositorie.id == id);
  if ( index < 0 ) {
    return response.status(400).json( { error: 'Repository not found.' } );
  }

  repositories.splice(index, 1);

  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {

  const {id} = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0) {
	return response.status(400).json({error: 'Repositorie not found'});
  }

  const {title, url, techs, likes} = repositories[repositorieIndex];

const repositorie = {
  id: repositories[repositorieIndex].id,
  title : title,
  url : url,
  techs : techs,
  likes : likes + 1,

};

console.log(repositorie);

repositories[repositorieIndex] = repositorie;

return response.status(200).send(repositorie);
  
});

module.exports = app;
