//TODO: clean this code up to be more presentable and make better
// error handling for years without data from the BEA.

let chart;

let populationAdjust = document.getElementById("check").checked;;

populateSelect();
let populationData = buildPopulation();

initJson = getRegionalGDP(1);

initData = buildData(initJson);

let initDataUS = initData[1];
initData.splice(1,1);
initData.splice(9,1);

document.getElementById("total").innerHTML = Math.floor(initDataUS[1]+0.5);

google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyB8UyJ3-N7OIrq3siNP1YNI7EMK4T5t5HQ'
});

google.charts.setOnLoadCallback(initMap);

function initMap(dataArray) {
  let data = google.visualization.arrayToDataTable(initData);

  let options = {
    resolution:"provinces",
    region:"US"
  };

  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

function redrawMap(dataArray) {
  let data = google.visualization.arrayToDataTable(dataArray);

  let options = {
    resolution:"provinces",
    region:"US"
  };
  chart.draw(data, options);
}

function handleCheck(){
  populationAdjust = document.getElementById("check").checked;
  let selected = document.getElementById("selection").value;
  json = getRegionalGDP(selected);
  dataIndustries = buildData(json);
  let dataUS = dataIndustries[1];
  dataIndustries.splice(1,1);
  dataIndustries.splice(9,1);
  document.getElementById("total").innerHTML = Math.floor(dataUS[1]+0.5);
  redrawMap(dataIndustries);
}

function handleSelect() {
  let selected = document.getElementById("selection").value;
  json = getRegionalGDP(selected);
  dataIndustries = buildData(json);
  let dataUS = dataIndustries[1];
  dataIndustries.splice(1,1);
  dataIndustries.splice(9,1);
  document.getElementById("total").innerHTML = Math.floor(dataUS[1]+0.5);
  redrawMap(dataIndustries);
}

function populateSelect() {
  let industries = getIndustries();
  let select = document.getElementById("selection")
  for(let i = 0; i < industries.length; i++) {
    let option = document.createElement("option");
    option.textContent = industries[i];
    option.value = i+1;
    select.appendChild(option)
  }
}

function getIndustries() {
  let jsonString;
  function reqListener () {
    jsonString = this.responseText;
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://www.bea.gov/api/data/?UserID=7EA6F71C-62A2-4221-A60B-7389FDD9C4C5&method=GetParameterValuesFiltered&datasetname=RegionalProduct&TargetParameter=IndustryId&Component=GDP_SAS&ResultFormat=json", false);
  oReq.send();
  let jsonData = JSON.parse(jsonString);
  let industryArray = [];
  for(let i = 0; i < jsonData.BEAAPI.Results.ParamValue.length; i++) {
    let desc = jsonData.BEAAPI.Results.ParamValue[i].Desc.substring(0, jsonData.BEAAPI.Results.ParamValue[i].Desc.indexOf("[")-1)
    industryArray.push(desc);
  }
  return industryArray;
}

function getRegionalGDP(IndustryId) {
  let jsonString;
  function reqListener () {
    jsonString = this.responseText;
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://www.bea.gov/api/data/?UserID=7EA6F71C-62A2-4221-A60B-7389FDD9C4C5&method=GetData&datasetname=RegionalProduct&Component=GDP_sAN&IndustryId="+IndustryId+"&Year=2015&GeoFips=STATE&ResultFormat=json", false);
  oReq.send();
  let jsonData = JSON.parse(jsonString);
  return jsonData;
}

function buildData(json) {
  let gdpstr = "GDP (in millions of $)"
  if(populationAdjust) {
    gdpstr = "GDP (millions dollarss per capita)";
  }
  let dataArray = [['State', gdpstr]];

  console.log(json.BEAAPI.Results.Data.length);
  for(let i = 0; i < 52; i++) {
    let gdpNum = Number(json.BEAAPI.Results.Data[i].DataValue);
    if(populationAdjust){
      pop = ((json.BEAAPI.Results.Data[i].GeoName === "United States") ? 325910220 : getPopulation(json.BEAAPI.Results.Data[i].GeoName));
      gdpNum = ((gdpNum*1000000)/(pop))
      if(pop=== -1) {
        console.log("pop adjust failed");
      }
    }
    dataArray.push([json.BEAAPI.Results.Data[i].GeoName,gdpNum]);
  }
  return dataArray;
}

function buildPopulation() {
  let jsonString;
  function reqListener () {
    jsonString = this.responseText;
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=state&DATE=9&key=befc215b63c25d4d8990c9e598b73d32954e7a56", false);
  oReq.send();
  return JSON.parse(jsonString);
}

function getPopulation(name) {
  for(let i = 1; i < populationData.length; i++) {
    if(populationData[i][1] === name) {
      return populationData[i][0];
    }
  }
  return "-1"
}