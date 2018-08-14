function getData(type, cb){
    var xhr = new XMLHttpRequest();
    var data;
    
    xhr.open("GET", "https://swapi.co/api/" + type + "/");
    xhr.send();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            cb(JSON.parse(this.responseText));
        }
    };
}

function getHeader(obj){
    var tableHeader = [];
    Object.keys(obj).forEach(function(key){
        tableHeader.push(`<th>${key}</th>`);
    });
    return `<tr>${tableHeader}</tr>`;
}

function getRows(obj){
    var tableRows = []; 
    obj.forEach(function(obj){
        var dataRows=[];
        Object.keys(obj).forEach(function(key){
        dataRows.push(`<td>${obj[key]}</td>`);
        });
        tableRows.push(`<tr>${dataRows}</tr>`);
    })
    return tableRows; 
}

function printToDocument(type){
    
    document.getElementById("data").innerHTML = "";
    
    getData(type, function(data){
        data = data.results;
        var tableHeader = getHeader(data[0]);
            var dataRows = getRows(data);
        document.getElementById("data").innerHTML = `<table>${tableHeader}${dataRows}</table>`;
    });
}
