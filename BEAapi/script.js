let chart;

populateSelect();

initJson = getRegionalGDP(1);

initData = buildData(initJson);

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

function handleSelect() {
  let selected = document.getElementById("selection").value;
  json = getRegionalGDP(selected);
  dataIndustries = buildData(json);
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
  let dataArray = [['State', 'GDP']];

  console.log(json.BEAAPI.Results.Data.length)
  for(let i = 1; i < 52; i++) {
      dataArray.push([json.BEAAPI.Results.Data[i].GeoName,Number(json.BEAAPI.Results.Data[i].DataValue)])
  }
  return dataArray;
}