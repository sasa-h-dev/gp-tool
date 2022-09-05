var cmdString = 'sfdx force:apex:execute --loglevel debug -f test.apex'
var cp = require('child_process');

const regex =
    /(.*USER_DEBUG(\|[^\|]*){2}\|)((.|\n)+?)((\n[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{1,3}|$))/g;

function filterApexLogs(input) {
    let output = "";
    let m;

    while ((m = regex.exec(input)) !== null) {
        if (m[3]) {
            output += m[3] + "\n";
        }
    }
    if(output) return output.trim();
    else return input
}

cp.exec(cmdString, function (err, stdout, stderr) {
    if (err) {
        console.log("error: " + err);
    }
    if (stderr) {
        console.log("error: " + stderr);
    }
    console.log(filterApexLogs(stdout))
});