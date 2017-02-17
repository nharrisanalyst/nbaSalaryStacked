//d3 boilerplate

var margin={t: 20, r:20, b:20, l:20};
var h=500-margin.t-margin.b;
var w= 800-margin.l-margin.r;

var data2017=[];
var data2018=[];
var data2019=[];
var data2020=[];
var data2021=[];
var data2022=[];
var dataGuaranteed=[];
var teams={};
var teamsOrdered={};

//data and making the chart
d3.csv('data/salaryData.csv',function(err,data){
    if(err){console.log('there was an error')}
     else{
//Creating Chart team map object
		for(var i = 0;i<=data.length-1;i++){
		
		
		 if(!(data[i]['Tm'] in teams)){
		 
		 teams[data[i]['Tm']]=Object.keys(teams).length;
		 
		 
		 }
		
		
		
		if(Object.keys(teams).length==30){break}
		
		
		}
     
   
//Sorting Map by alphabetical order for better graph presentation    
     
     Object.keys(teams).sort().forEach((team,i)=>{
       teamsOrdered[team]=i;
     
     })
     teams=teamsOrdered;
     console.log(teams)
     console.log(data);
     }
 //function that creates object by year for stacked bar graph D3
 var graphData= function(year){
 		var array=[];
 		
 		Object.keys(teams).forEach((team)=>{
 			array.push({'team':team});
 		
 		});
 	
 	data.forEach((player)=>{
 		var arrayIndex=teams[[player['Tm']]];
 		
 		array[arrayIndex][player['Player']]=player[year];
 		
 		
 		
 		
 		})
 
 	return array;
 }
 

 
	data2017=graphData('2016-17');
	data2018=graphData('2017-18');
	data2019=graphData('2018-19');
	data2020=graphData('2019-20');
	data2021=graphData('2020-21');
	data2022=graphData('2021-22');
    dataGuaranteed=graphData('Guaranteed');
 
 var graphData=[data2017,data2018,data2019,data2020,data2021,data2022,dataGuaranteed]
 var  graphDataMap={'2016-17':0,'2017-18':1,'2018-19':2,'2019-20':3,'2020-21':4,'2021-22':5,'Guaranteed':6}
//Chart goes here

function createGraph(year){
    if(!($('svg')==0)){d3.select('svg').remove}
    
    
  var svg = d3.select('div').append('svg')
			.attr("width", w+margin.l+margin.r)
			.attr("height",h+margin.t+margin.b)
			.append('g')
			.attr('transform','translate('+margin.l+','+margin.t+')')
			
data=[[250,250]];

svg.selectAll('circle').data(data).enter().append('circle').attrs({
		cx:function(d){return d[0]},
		cy:function(d){return d[1]},
		fill:"black",
		r:5




})






 
 

    
     






}

createGraph();



});