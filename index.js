const submitButton = document.getElementById('submit-request');

submitButton.onclick = function(e) {
    const inputData = document.getElementById('input-data').value;
    console.log(JSON.parse(JSON.parse(inputData)));
    const outputData = removeTWMetadata(JSON.parse(JSON.parse(inputData)));
    console.log(JSON.stringify(outputData));
    document.getElementById('output-data').value = JSON.stringify(outputData);
}

function removeTWMetadata(jsonObj) {
    var attributesList = ["@metadata", "selected"];
    for (var k in jsonObj) {
        //remove attributes
        if (attributesList.indexOf(k) != -1) {
            delete jsonObj[k];
        }
        if (typeof jsonObj[k] === "object") {
            //remove metadata from arrays
            if (jsonObj[k] != undefined && jsonObj[k].items != undefined) {
                jsonObj[k] = jsonObj[k].items;
            }
            var jsonObjModified = removeTWMetadata(jsonObj[k]);
            if (jsonObjModified != undefined) {
                jsonObj[k] = jsonObjModified;
            }
        }
    }
    return jsonObj;
}