let chart;

let year = 1995

dataJson = JSON.parse(data);

let initData = getData(year)

let animate = true;

google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyB8UyJ3-N7OIrq3siNP1YNI7EMK4T5t5HQ'
});

google.charts.setOnLoadCallback(initMap);

//animation interval
setInterval(() => {
    if(year===2015) {
      year=1994
    }
    else {
      year = Number(year)+1;
    }
    if(animate===true) {
      redrawMap(getData(year));
      document.getElementById("selection").value = year;
      document.getElementById("selectedYear").innerHTML = year;
    }
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