

import openData from "../openbudget.json"

var i = 0
var fullData = []
for(; i<openData.length; i++){
    var q = openData[i]
    var s = q["Сумма"].toString().replace(/\,/g,'');
    q["Сумма"] = parseFloat(s);
    fullData.push(q);
}
var newData = { name :"root", children : [] },
    levels = ["Доходы / Расходы","Уровень бюджета","Наша классификация","Функциональная группа"];
fullData.forEach(function(d){
    // Keep this as a reference to the current level
    var depthCursor = newData.children;
    // Go down one level at a time
    levels.forEach(function( property, depth ){

        // Look to see if a branch has already been created
        var index;
        depthCursor.forEach(function(child,i){
            if ( d[property] == child.name ) index = i;
        });
        // Add a branch if it isn't there
        if ( isNaN(index) ) {
            depthCursor.push({ name : d[property], children : []});
            index = depthCursor.length - 1;
        }
        // Now reference the new child array as we go deeper into the tree
        depthCursor = depthCursor[index].children;
        // This is a leaf, so add the last element to the specified branch
        if ( depth === levels.length - 1 ) depthCursor.push({ value : d["Сумма"], year :d["Год"] });
    });
});
console.log(newData.children);

var stuff = [];
var types = [];
var dataa = [];
for(i = 0; i<newData.children[1].children[0].children.length; i++){
    stuff.push(newData.children[1].children[0].children[i])
}
var x = 0;
for(i = 0; i<stuff.length; i++){
    for(; x<stuff[i].children.length; x++){
        types.push(stuff[i].children[x].name);
        dataa.push(stuff[i].children[x]);
    }
}
console.log(dataa);
var ser = []
for (i = 0; i<dataa.length; i++){
    var arr = [];
    for (x=0; x<dataa[i].children.length; x++){
        arr.push(dataa[i].children[x].value)
    }
    arr.reverse()
    while(arr.length<20){
        arr.push(0)
    }
    arr.reverse()
    console.log(arr);
ser.push(
    {
        name:dataa[i].name,
        type: "line",
        stack: "1",
        areaStyle: {normal: {}},
        data: arr
    }
);

}
export default {
    title: {
        text: ''
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: types
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : ser
};
