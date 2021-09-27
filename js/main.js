const elForm = document.querySelector('#js-form');
const elSelect = document.querySelector('#js-select');
const elSearch = document.querySelector('#js-search');
const elFilter = document.querySelector('#js-filter');
const elBtn = document.querySelector('#btn');
const elList = document.querySelector('#js-list');
const elTemplate = document.querySelector('#template').content;
const elCloseBtn = document.querySelector('.js-close__btn');
const elModal = document.querySelector('#js-modal');
const elHeaderBtn = document.querySelector('#js-btn');
const elCardBtn = document.querySelector('#js-card-btn');
const elCard = document.querySelector('#card');


elHeaderBtn.addEventListener('click', function(e){
  e.preventDefault()

  elModal.classList.add('modal--active')
})

elCloseBtn.addEventListener('click', function(e){
  e.preventDefault();

  elModal.classList.remove('modal--active')
})

function renderMovies(Array, element){

  element.innerHTML = null;

  Array.forEach((arr) =>{
    const cloneTemplate = elTemplate.cloneNode(true);

    getEl('.card-img', cloneTemplate).src = arr.img;
    getEl('.card-title', cloneTemplate).textContent = arr.name;
    getEl('.card-select', cloneTemplate).textContent = arr.type;
    getEl('.card-weight', cloneTemplate).textContent = arr.weight;
    getEl('.card-age', cloneTemplate).textContent = arr.candy_count;

    element.appendChild(cloneTemplate);
  })

}

renderMovies(pokemons, elList);



function renderTypes(Array, element){
  let result = [];

  Array.forEach((arr) =>{
    arr.type.forEach(item =>{
      if(!result.includes(item)){
        result.push(item)
      }
    })
  })

  result.forEach(item =>{
    let newOption = creatEl('option');
    newOption.textContent = item;
    newOption.value = item;

    element.appendChild(newOption)
  })
}

renderTypes(pokemons, elSelect);


elForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  const InputValue = elSearch.value.trim();
  const SelectValue = elSelect.value.trim();
  const FilterValue = elFilter.value.trim();

  const regex = new RegExp(InputValue, 'gi');

  const filteredItem = pokemons.filter((item) => item.name.match(regex))


  let foundPokemon = [];

  if(SelectValue === 'All'){
    foundPokemon = filteredItem
  }else{
    foundPokemon = filteredItem.filter(item => item.type.includes(SelectValue))
  }


  if (FilterValue === 'a-z'){
    foundPokemon.sort((a,b) =>{
      if (a.name > b.name){
        return 1
      }else if (a.name < b.name){
        return -1
      }else {
        return 0
      }
    })
  }else if (FilterValue === 'z-a'){
    foundPokemon.sort((a,b) =>{
      if (a.name > b.name){
        return -1
      }else if (a.name < b.name){
        return 1
      }else {
        return 0
      }
    })
  }


  if (FilterValue === 'new-old'){
    foundPokemon.sort((a,b) =>{
      if(a.candy_count > b.candy_count){
        return 1
      }else if (a.candy_count < b.candy_count){
        return -1
      }else{
        return 0
      }
    })
  }else if (FilterValue === 'old-new'){
    foundPokemon.sort((a,b) =>{
      if(a.candy_count > b.candy_count){
        return -1
      }else if (a.candy_count < b.candy_count){
        return 1
      }else{
        return 0
      }
    })
  }



  elSearch.value = null;

  renderMovies(foundPokemon, elList)
});



