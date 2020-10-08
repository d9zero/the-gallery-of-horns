'use strict'

const animalArr = [];

$.ajax('./data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(hornInfo => {
    hornInfo.forEach (animal=>{
      new Horn(animal);
    })
    sortByAlpha();
    animalArr.forEach(type => {
      $('main').append(type.createHtml());
    })
  sortKeywords();
})

function Horn(object){
  this.image_url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = `${object.horns} Horns`;
  animalArr.push(this);
}

Horn.prototype.createHtml = function (){
  let template = $('#animals').html();
  let html = Mustache.render(template, this);
  return html;
}

function sortKeywords () {
  let keywordArr = [];
  animalArr.forEach(oneHornObj =>{
    if (keywordArr.includes(oneHornObj.keyword)=== false){
      keywordArr.push(oneHornObj.keyword);
    }
  })
  keywordArr.forEach(keyword =>{
    const $newDropDown = $(`<option value= "${keyword}">${keyword}</option>`);
    $('#sortingKeyword').append($newDropDown);
  })
}

$('#sortingOther').on('change', function() {
  $('main').empty();
  if (this.value === 'alphabetical'){
    console.log('sortByAlpha');
    sortByAlpha();
  } else if (this.value === 'hornNumber') {
    console.log('sortByHorns');
    sortByHorns();
  }
  animalArr.forEach((creature) => {
    $('main').append(creature.createHtml());
  })
})

const sortByHorns = () => {
  animalArr.sort((a, b) => {
    a = a.horns;
    b = b.horns;
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  })
}

const sortByAlpha = () => {
  animalArr.sort((a, b) => {
    a = a.title.toLowerCase();
    b = b.title.toLowerCase();
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  })
}

$('#sortingKeyword').on('change', function(){
  if(this.value === 'loadAll'){
    $('section').show();
  }else {
    $('section').hide();
    $(`section[class=${this.value}]`).show();
  }
})
