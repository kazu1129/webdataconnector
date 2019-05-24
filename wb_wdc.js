(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [
        { id : "Country", dataType : tableau.dataTypeEnum.string },
        { id : "Year", dataType : tableau.dataTypeEnum.string },
        { id : "Indicator", dataType : tableau.dataTypeEnum.string },
        { id : "GDP", dataType : tableau.dataTypeEnum.float }
    ];

    var tableInfo = {
        id : "GDP",
        alias : "WORLD BANK data",
        columns : cols
    };

    schemaCallback([tableInfo]);
};

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://api.worldbank.org/v2/countries/all/indicators/NY.GDP.MKTP.CD?format=json&per_page=20000", function(resp) {     
    
            var tableData = []; 
            var resp2 = resp[1];

           for (i = 0 ; i < resp2.length; i++ ) {
                tableData.push({
                "Country": resp2[i].country.value,
                "Year": resp2[i].date,
                "Indicator": resp2[i].indicator.id,
                "GDP": resp2[i].value
            });
        }

        table.appendRows(tableData);
        doneCallback();   
    });
};

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WORLD BANK Data";
        tableau.submit();
    });
});
