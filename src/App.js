import React, { Component } from 'react';
import './App.css';
//import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'


class App extends Component {
  state={
    recipes:[
     /* { recipeName:'xxx', ingredients:['hot','spicy','tasty']},
      { recipeName:'aaa', ingredients:['hot','spicy','tasty']},
      { recipeName:'zzz', ingredients:['hot','spicy','tasty']}*/
    ],
    showAdd:false,
    showEdit:false,
    currentIndex:0,
    newRecipe:{recipeName:"",ingredients:[]}
  }

  deleteRecipe(index){
  let recipes=this.state.recipes.slice();
  recipes.splice(index,1);
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
}

updateNewRecipe(recipeName, ingredients){
   this.setState({
    newRecipe:{recipeName:recipeName,ingredients:ingredients}
  });
}

saveNewRecipe(){
  let recipes=this.state.recipes.slice();
  recipes.push({
    recipeName:this.state.newRecipe.recipeName,ingredients:this.state.newRecipe.ingredients
  });
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
  this.setState({newRecipe:{recipeName:'',ingredients:[]}});
  this.close();
}
close=()=>{
  if(this.state.showAdd){
    this.setState({showAdd: false})
  }
  if(this.state.showEdit){
    this.setState({showEdit:false});
  }
}

open=(state,currentIndex)=>{
 this.setState({[state]: true});
this.setState({currentIndex});
}

updateRecipeName(recipeName,currentIndex){
  let recipes=this.state.recipes.slice();
  recipes[currentIndex]={recipeName: recipeName,ingredients:recipes[currentIndex].ingredients};
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
}

updateIngredients(ingredients,currentIndex){
  let recipes=this.state.recipes.slice();
  recipes[currentIndex]={recipeName:recipes[currentIndex].recipeName,ingredients:ingredients};
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});

}

componentDidMount(){
  let recipes=JSON.parse(localStorage.getItem("recipes")) || [];
  this.setState({recipes});
}
  render() {
    const {recipes,newRecipe,currentIndex}=this.state;
    return (
      <div className="App container">
        <h2>React - RecipeBox</h2>
        {recipes.length>0 && (
        <div>  
        <PanelGroup accordion id="acc">
          {recipes.map((recipe, index) =>(
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ul className="list-group">
                {recipe.ingredients.map((item) => (
                  <li key={item} className="list-group-item">{item}</li>
                ))}
                </ul>
                <ButtonToolbar>
                  <Button bsStyle="danger" onClick={(event)=>
                    this.deleteRecipe(index)
                    }>Delete Recipe</Button>
                  <Button bsStyle="default" onClick={(event)=>this.open("showEdit",index)}>Edit Recipe</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
           ))}
        </PanelGroup>
        <Modal show={this.state.showEdit} onHide={this.close}>
           <Modal.Header closeButton>
              <Modal.Title>Edit Recipe</Modal.Title>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl 
                  type="text" 
                  value={recipes[currentIndex].recipeName} 
                  placeholder="Enter Text"
                  onChange={(event)=>this.updateRecipeName(event.target.value,currentIndex)}               
                  >
                  </FormControl>
                  <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl 
                  componentClass="textarea" 
                  //value={newRecipe.recipeName} 
                  placeholder="Enter Ingredients(seperated by comma)"
                  onChange={(event)=>this.updateIngredients(event.target.value.split(","),currentIndex  )}               
                  value={recipes[currentIndex].ingredients} 
                  >
                  </FormControl>
                  </FormGroup>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
           </Modal.Header>           
        </Modal>
        </div>
      )}
        <Modal show={this.state.showAdd} onHide={this.close}>
           <Modal.Header closeButton>
              <Modal.Title>Add Recipe</Modal.Title>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl 
                  type="text" 
                  value={newRecipe.recipeName} 
                  placeholder="Enter Recipe Name"
                  onChange={(event)=>this.updateNewRecipe(event.target.value,newRecipe.ingredients)}               
                  >
                  </FormControl>
                  <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl 
                  type="textarea" 
                  //value={newRecipe.recipeName} 
                  placeholder="Enter Ingredients(seperated by comma)"
                  onChange={(event)=>this.updateNewRecipe(newRecipe.recipeName,event.target.value.split(","))}               
                  value={newRecipe.ingredients} 
                  >
                  </FormControl>
                  </FormGroup>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={(event)=>this.saveNewRecipe()}>Save New Recipe</Button>
              </Modal.Footer>
           </Modal.Header>           
        </Modal>
        <Button bsStyle="primary" onClick={(event)=>this.open("showAdd",currentIndex)}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
