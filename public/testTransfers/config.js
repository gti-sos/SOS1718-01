exports.config = {
    seleniumAddress: "http://localhost:8910",
    specs: ['t01-loadDataTransfers.js','t02-addTeamTransfers.js'],
    capabilities:{
        'browserName': 'phantomjs'
    }
}