/*jslint node: true*/
var cookie = require('../index');
var assert = require('assert');
var http = require('http');


var srv = http.createServer((function () {
    var called = 0;
    return function (req, res) {
        called += 1;

        // on second call test, if the previously sent cookie is sent back
        if (called === 2) {
            assert.equal(cookie.getCookie(req, 'foo'), 'bar', "Client didn't sent back the same" +
                " cookie back to me :(");
            cookie.delCookie(res,  'foo');
        } else {
            cookie.setCookie(res, 'foo', 'bar', null, null, false, true);
            cookie.setCookie(res, 'baz', 'qux', null, null, true, false);
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('OK');
        if (called === 2) {
            srv.close();
        }
    };
}()));
srv.listen(1111, '127.0.0.1');
var conf = {
    host: '127.0.0.1',
    port: 1111,
    path: '/'
};
http.get(conf, function (res) {
    var cookies = res.headers['set-cookie'], props;
    assert.equal(cookies.length, 2);
    props = {
        Secure: false,
        HttpOnly: false
    };
    cookies[0].split(';').forEach(function (c) {
        props[c.trim()] = true;
    });
    assert.equal(props['foo=bar'], true);
    assert.equal(props.Secure, false, 'cookie should not be secure');
    assert.equal(props.HttpOnly, true, 'cookie is not http only');

    props = {
        Secure: false,
        HttpOnly: false
    };
    cookies[1].split(';').forEach(function (c) {
        props[c.trim()] = true;
    });
    assert.equal(props.Secure, true, 'cookie should be secure');
    assert.equal(props.HttpOnly, false, 'cookie is http only');

    conf.headers = {
        'Cookie': cookies.join('; ')
    };

    // another request to test if we can send back the right cookies and a
    // cookie delete could be done
    http.get(conf, function (res) {
        // in the response there must be one cookie delete request
        var cookies = res.headers['set-cookie'],
            cookieProps = {};
        assert.equal(cookies.length, 1);
        cookies[0].split(';').forEach(function (item) {
            var props = item.trim().split('='),
                output = {};

            cookieProps[props[0]] = props[1];
        });
        assert.equal(new Date(cookieProps.expires).getTime() < Date.now(), true);
        console.log('tests passed');
    });
});
