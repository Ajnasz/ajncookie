var spawn = require('child_process').spawn;

desc('default', 'Run tests');
task('default', function (t) {
    spawn('node', ['tests/test.js'], {
        stdio: 'inherit'
    });
});
