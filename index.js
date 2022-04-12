const submitButton = document.getElementById('submit-request');

submitButton.onclick = function(e) {


    try {
        const inputData = document.getElementById('input-data').value;
        const json = inputData.substring(1,inputData.length-3);
        const outputData = removeTWMetadata(JSON.parse(JSON.parse(json)));
        document.getElementById('output-data').value = JSON.stringify(outputData);
    } catch (e) {
        document.getElementById('output-data').value = 'An error exists on input variable. ' + e.message;
        console.log(e);
    }
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