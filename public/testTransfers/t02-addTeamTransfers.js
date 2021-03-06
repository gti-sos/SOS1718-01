var fs = require("fs");
var path = require("path");
var config = require("./config");

describe('Add team', function(){
    it('should add a new team', function(){
        browser
        .get(config.getAppUrl())
        .then(function(){
            element.all(by.repeater('team in teams'))
            .then(function(myteams){
                browser.driver.sleep(2000);
                
                element(by.model('newteam.city')).sendKeys('a');
                element(by.model('newteam.year')).sendKeys('2015');
                element(by.model('newteam.team')).sendKeys('a');
                element(by.model('newteam.timaxexp')).sendKeys('1');
                element(by.model('newteam.tilessexp')).sendKeys('2');
                element(by.model('newteam.tispa')).sendKeys('2');
                
                element(by.buttonText('Add')).click().then(function(){
                    element.all(by.repeater('team in teams')).then(function (teams){
                        expect(teams.length).toEqual(myteams.length+1);
                    });
                });
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'public/testTransfers','output','t02.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
        
            });
        });
    });
});