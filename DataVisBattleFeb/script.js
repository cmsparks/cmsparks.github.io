//TODO: clean this code up to be more presentable and condense it.

let chart;
let year = 1995;
let animate = true;

dataJson = JSON.parse(data);

let initData = getData(year)

google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyB8UyJ3-N7OIrq3siNP1YNI7EMK4T5t5HQ'
});

google.charts.setOnLoadCallback(initMap);

//animation interval
setInterval(() => {
    let percData = getPercentage(year);
    if(animate===true) {
      if(year===2015) {
        year=1994
      }
      else {
        year = Number(year)+1;
      }
      redrawMap(getData(year));
      document.getElementById("selection").value = year;
      document.getElementById("selectedYear").innerHTML = year;
    }
    document.getElementById("NLPerc").innerHTML = "<p>"+(percData[0]/.5)+"%</p>"
    document.getElementById("SBPerc").innerHTML = "<p>"+(percData[1]/.5)+"%</p>"
    document.getElementById("CBPerc").innerHTML = "<p>"+(percData[2]/.5)+"%</p>"
    document.getElementById("LPerc").innerHTML = "<p>"+(percData[3]/.5)+"%</p>"
}, 750);

// takes initialization data and draws the map initially
function initMap() {
  var data = new google.visualization.DataTable()
  data.addColumn('string','State');
  data.addColumn('number', 'value');
  data.addColumn({type:'string', role: 'tooltip'})
  data.addRows(initData);

  let options = {
    sizeAxis: { minValue: 1, maxValue: 4 },
    resolution:"provinces",
    region:"US",
    tooltip:{isHtml: true},
    legend: 'none',
    backgroundColor: '#f8f8f8',
    colorAxis: {minValue: 1, maxValue: 4, colors: ['#f4e573', '#f4a473', '#f47573', '#c3f473']}
  };
  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

//redraws the map
function redrawMap(dataArray) {
  var data = new google.visualization.DataTable()
  data.addColumn('string','State');
  data.addColumn('number', 'value');
  data.addColumn({type:'string', role: 'tooltip'});
  data.addRows(dataArray);
  let options = {
    sizeAxis: { minValue: 1, maxValue: 4 },
    resolution:"provinces",
    region:"US",
    tooltip:{isHtml: true},
    legend: 'none',
    backgroundColor: '#f8f8f8',
    colorAxis: {minValue: 1, maxValue: 4, colors: ['#f4e573', '#f4a473', '#f47573', '#c3f473']}
  };
  chart.draw(data, options);
}

//returns data array for a given year
function getData(year) {
  let data = [];
  for (let i = 0; i < dataJson.length; i++){
    if(dataJson[i][year] === "No Law") {
      data.push([dataJson[i].State, 1, "Status: No Law"]);
    }
    else if(dataJson[i][year] === "Statutory Ban") {
      data.push([dataJson[i].State, 2, "Status: Statutory Ban"]);
    }
    else if(dataJson[i][year] === "Constitutional Ban") {
      data.push([dataJson[i].State, 3, "Status: Constitutional Ban"]);
    }
    else {
      data.push([dataJson[i].State, 4, "Status: Legal"]);
    }
  }
  return data;
}

function getPercentage(year) {
  let data = getData(year);
  let returnData = [0,0,0,0]
  for(let i = 0; i < data.length; i++) {
    if(data[i][1] === 1) {
      returnData[0] = returnData[0]+1
    }
    else if(data[i][1] === 2) {
      returnData[1] = returnData[1]+1
    }
    else if(data[i][1] === 3) {
      returnData[2] = returnData[2]+1
    }
    else {
      returnData[3] = returnData[3]+1
    }
  }
  console.log(returnData);
  return returnData;
}

//handles changes in the input range
function handleRange() {
  let selected = document.getElementById("selection").value;
  document.getElementById("selectedYear").innerHTML = selected;
  year = selected;
  redrawMap(getData(selected));
}

function handleCheck() {
  animate = document.getElementById("enableLoop").checked
}