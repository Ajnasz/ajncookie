var spawn = require('child_process').spawn;

task('default', ['test', 'jslint']);

desc('test', 'Run tests');
task('test', function (t) {
    spawn('node', ['tests/test.js'], {
        stdio: 'inherit'
    });
});

desc('jslint', 'Check syntax');
task('jslint', function (t) {
    spawn('jslint', ['index.js'], {
        stdio: 'inherit'
    });
});
