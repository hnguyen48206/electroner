var gridContent = [
    { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false },
    { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true },
    { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false },
    { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false }
];

function refreshGrid() {
    //call DataBase
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,

        data: clients,

        fields: [
            { name: "Name", type: "text", width: 150, validate: "required" },
            { name: "Age", type: "number", width: 50 },
            { name: "Address", type: "text", width: 200 },
            { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
            { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
            { type: "control" }
        ]
    });
}

function showHideLoadingScreen(index) {
    if (index == 'show') {
        document.getElementById('loadingScreen').style.display = "block";
        document.getElementById('content').style.display = "none";
    }
    else {
        document.getElementById('loadingScreen').style.display = "none";
        document.getElementById('content').style.display = "block";
    }
    const M = require('materialize-css');
}