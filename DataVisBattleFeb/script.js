let chart;

dataJson = JSON.parse(data);

let initData = getData(1995)

google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyB8UyJ3-N7OIrq3siNP1YNI7EMK4T5t5HQ'
});

google.charts.setOnLoadCallback(initMap);

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
    colorAxis: {minValue: 1, maxValue: 4, colors: ['#f4e573', '#f4a473', '#f47573', '#c3f473']}
  };
  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

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
    colorAxis: {minValue: 1, maxValue: 4, colors: ['#f4e573', '#f4a473', '#f47573', '#c3f473']}
  };
  chart.draw(data, options);
}

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

function handleRange() {
  let selected = document.getElementById("selection").value;
  document.getElementById("selectedYear").innerHTML = selected;
  redrawMap(getData(selected));
}