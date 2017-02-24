//d3 boilerplate

var margin={t: 20, r:20, b:20, l:75};
var h=600-margin.t-margin.b;
var w= 1200-margin.l-margin.r;

 var svg = d3.select('#root').append('svg')
			.attr("width", w+margin.l+margin.r)
			.attr("height",h+margin.t+margin.b)
			.append('g')
			.attr('transform','translate('+margin.l+','+margin.t+')')
			
var data2017=[];
var data2018=[];
var data2019=[];
var data2020=[];
var data2021=[];
var data2022=[];
var dataGuaranteed=[];
var teams={};
var teamsOrdered={};

//scales
var xScale=d3.scaleBand()
				.range([0,w])
				.paddingInner([0.1])
				.paddingOuter([.1]);
				
var yScale =d3.scaleLinear()
				.range([h,0]);
//build colors
var ordinalColors=d3.schemeCategory20;
     ordinalColors.push('#000000');
     ordinalColors.push('#ffff00')
     ordinalColors.push('#0000ff')
     ordinalColors.push('#80ff00')
     ordinalColors.push('#7f7f00') 
var colors=d3.scaleOrdinal(ordinalColors);

//update line Function

var upDateLine = function(year){

         var cap ={}; 
         cap['2016-17']={cap:94143000,tax:113290000};
         cap['2017-18']= {cap:102000000,tax:122000000}; 
         cap['2018-19']= {cap:108000000,tax:128000000};
         cap['2019-20']= {cap:109000000,tax:129000000};
         cap['2021-22']= {cap:114000000,tax:134000000}; 
         cap['2022-23']= {cap:115000000,tax:135000000};        
        cap['Guaranteed']={cap:0,tax:0};        
        
           var lineData=[cap[year]]
       console.log(lineData.length)
       
     if(year=='Guaranteed'){
     
     svg.selectAll('#lineCap').data(lineData).transition().duration(5000).attrs({
											x1:function(d){return yScale(d.cap)},
											x2:function(d){return yScale(d.cap)},
											y1:function(d){return yScale(d.cap)},
											y2:function(d){return yScale(d.cap)},
											'stroke-width':1,
											stroke:'black',
											'stroke-dasharray':"5, 5"

										})
	
	svg.selectAll('#lineTax').data(lineData).transition().duration(5000).attrs({
											x1:function(d){return yScale(d.cap)},
											x2:function(d){return yScale(d.tax)},
											y1:function(d){return yScale(d.tax)},
											y2:function(d){return yScale(d.tax)},
											'stroke-width':1,
											stroke:'#8b0000 ',
											'stroke-dasharray':"5, 5"

										})
     
     
     
     
     
     
     }else{
	
		svg.selectAll('#lineCap').data(lineData).transition().duration(5000).attrs({
											x1:0,
											x2:w,
											y1:function(d){return yScale(d.cap)},
											y2:function(d){return yScale(d.cap)},
											'stroke-width':1,
											stroke:'black',
											'stroke-dasharray':"5, 5"

										})
	
	svg.selectAll('#lineTax').data(lineData).transition().duration(5000).attrs({
											x1:0,
											x2:w,
											y1:function(d){return yScale(d.tax)},
											y2:function(d){return yScale(d.tax)},
											'stroke-width':1,
											stroke:'#8b0000 ',
											'stroke-dasharray':"5, 5"

										})
	
	}
	
	}
	

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
 //function to find all the keys    
  var keysFun=function(data){
  
  
  var team= data.reduce((holder,team)=>{
   		if(Object.keys(holder).length <Object.keys(team).length){
   		return team}
   		return holder
   		},data[0])
  
  var array = Object.keys(data[teams[team['team']]]).slice(1);
  		array.pop()
 
  return array;

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
 	
 	data.forEach((player,i)=>{
 		var arrayIndex=teams[[player['Tm']]];
 		
 		array[arrayIndex][player['Player']]=player[year];
 		
 		
 		
 		
 		})
 
 	return array;
 }
 
 var graphDataKeys= function(year){
 		var array=[];
 		
 		Object.keys(teams).forEach((team)=>{
 			array.push({'team':team});
 		
 		});
 	
 	data.forEach((player,i)=>{
 		var arrayIndex=teams[[player['Tm']]];
 		
 		array[arrayIndex]['player'+Object.keys(array[arrayIndex]).length]=parseInt(player[year]);
 		
 		
 		
 		
 		})
 		
 		//Making a total for each team for yScales
 
 	 array.forEach((team,i)=>{
 	  Object.keys(team).forEach((play)=>{
 	      
 	     if(play=='team'){
 	          
 	        array[i]['total']=0;
 	     
 	     }else{
 	     
 	     array[i]['total']+=parseInt(team[play]);
 	     
 	     }
 	  
 	  	})
 	 
 	 
 	 })
 	 
 //fixing players in every team so that every team has the same amount of players but those that don't actually have a the player 
 		//the value is set to zero so that it does not return NaN
 		//First find the longest teams keys and then set teams that dont have that player add it and set it's value to 0	 
var keys=keysFun(array);
 	 
 	 keys.forEach((key)=>{
 	    array.forEach((team,i)=>{
 	    if(!(key in team)){
 	      array[i][key]=0;
 	    
 	    }
 	   })
 	})
 	 
 	 
 	 
 	 
 	 
 	 return array;
 }
//data 
	data2017=graphData('2016-17');
	data2018=graphData('2017-18');
	data2019=graphData('2018-19');
	data2020=graphData('2019-20');
	data2021=graphData('2020-21');
	data2022=graphData('2021-22');
    dataGuaranteed=graphData('Guaranteed');
 	dataKeys2017=graphDataKeys('2016-17');
 var graphData=[data2017,data2018,data2019,data2020,data2021,data2022,dataGuaranteed]
 var  graphDataMap={'2016-17':0,'2017-18':1,'2018-19':2,'2019-20':3,'2020-21':4,'2021-22':5,'Guaranteed':6}
//Chart goes here


 var keysFun=function(data){
  
  
  var team= data.reduce((holder,team)=>{
   		if(Object.keys(holder).length <Object.keys(team).length){
   		return team}
   		return holder
   		},data[0])
  
  var array = [];
   Object.keys(team).forEach((key)=>{
      if(key !='total' && key !='team'){
        array.push(key);
		 }
   })
  
  		

  return array;
 
}



//scale
   xScale.domain(dataKeys2017.map((d)=>{return d.team}))
   
   
    yScale.domain([0,d3.max(graphDataKeys('2017-18'),function(d){return d.total})])
//axis
var xAxis=d3.axisBottom(xScale)
var yAxis=d3.axisLeft(yScale)

var xAxis=svg.append('g').attr('class','xAxis').attr('transform','translate(0,'+h+')').call(xAxis);
 var yAxis=svg.append('g').attr('class','yAxis').call(yAxis);

//keys for stack data
var keys=keysFun(dataKeys2017)
//making stack data
var stack=d3.stack().keys(keys)

var stackData=stack(dataKeys2017)

  

svg.append('g').selectAll('g')
			.data(stackData).enter().append('g').attr('class','barG').attr('fill',function(d){return colors(d.key) })
			.selectAll('rect').data(function(d){return d}).enter()
			.append('rect')
			.attr('y',function(d){return yScale(d[1])})
			.attr('x',function(d){ return xScale(d.data.team)})
			.attr('width',function(d){return xScale.bandwidth()})
			.attr('height', function(d){return (yScale(d[0])-yScale(d[1]));})
			
		svg.append('line').attr('id','lineCap').attrs({
											x1:0,
											x2:w,
											y1:yScale(94143000),
											y2:yScale(94143000),
											'stroke-width':1,
											stroke:'black',
											'stroke-dasharray':"5, 5"

										})
										
		svg.append('line').attr('id','lineTax').attrs({
											x1:0,
											x2:w,
											y1:yScale(113290000),
											y2:yScale(113290000),
											'stroke-width':1,
											stroke:'#8b0000',
											'stroke-dasharray':"5, 5"

										})								
										
										
var upDate=function(year){
    console.log(year=='2017-18')
	
 	
	
	
	var data=graphDataKeys(year)
	var keys=keysFun(data);
	var stack=d3.stack().keys(keys)
	 var upDateData=stack(data)
	console.log(stackData)
if(year=='Guaranteed'){
	
	
	yScale.domain([0,d3.max(data,function(d){return d.total})])
	var yAxis=d3.axisLeft(yScale)
	
	
	svg.select('.yAxis').transition()
	.duration(5000)
	.call(yAxis);
	
	 var g =svg.selectAll('.barG')
			.data(upDateData)
			
			
	var rect=g.selectAll('rect').data(function(d){return d})
			.transition().duration(5000)
			.attr('y',function(d){return yScale(d[1])})
			.attr('x',function(d){ return xScale(d.data.team)})
			.attr('width',function(d){return xScale.bandwidth()})
			.attr('height', function(d){return (yScale(d[0])-yScale(d[1]));})
	
	}else{
	//resets scale if changed
	yScale.domain([0,d3.max(graphDataKeys('2017-18'),function(d){return d.total})])
	var yAxis=d3.axisLeft(yScale)
	
	
	svg.select('.yAxis').transition()
	.duration(5000)
	.call(yAxis);
	//writes graph
   var g =svg.selectAll('.barG')
			.data(upDateData)
			
			
	var rect=g.selectAll('rect').data(function(d){return d})
			.transition().duration(5000)
			.attr('y',function(d){return yScale(d[1])})
			.attr('x',function(d){ return xScale(d.data.team)})
			.attr('width',function(d){return xScale.bandwidth()})
			.attr('height', function(d){return (yScale(d[0])-yScale(d[1]));})	
			
			}	
		
	
	
	
	
	upDateLine(year)
	
	
}										
										
										
										

var updateGraph =function(){
             year=$(this)[0][0].value
             
             
             
            upDate(year)


} 
 
d3.select('#form').append('form').attr('id','formYear').append('select').attr('form','formYear')
		.selectAll('option')
		.data(Object.keys(graphDataMap)).enter()
		.append('option').attr('value',function(d){return d}).text(function(d){return d})
		
		d3.select('#formYear').on('change',updateGraph)




         


});
