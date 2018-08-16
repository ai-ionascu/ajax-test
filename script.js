function getData(url, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
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
        var dataItem = obj[key].toString().substring(0,15);
        dataRows.push(`<td>${dataItem}</td>`);
        });
        tableRows.push(`<tr>${dataRows}</tr>`);
    });
    return tableRows; 
}

function generatePagination(prev,next){
    if (prev && next){
        return `<button onclick = "printToDocument('${prev}')">Previous</buton>
                <button onclick = "printToDocument('${next}')">Next</buton>`;
    }
    else if (prev && !next){
        return `<button onclick = "printToDocument('${prev}')">Previous</buton>`;
    }
    else if (!prev && next){
        return `<button onclick = "printToDocument('${next}')">Next</buton>`;
    }
}

function printToDocument(url){
    document.getElementById("data").innerHTML = "";
    
    getData(url, function(data){
        var pagination;
        if (data.previous || data.next){
            pagination = generatePagination(data.previous,data.next);    
        }
        
        data = data.results;
        var tableHeader = getHeader(data[0]);
        var dataRows = getRows(data);
        document.getElementById("data").innerHTML = `<table>${tableHeader}${dataRows}</table>${pagination}`.replace(/,/g, "");
    });
}