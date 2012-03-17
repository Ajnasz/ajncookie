/*jslint node: true*/
function getCookie(req, cookieName) {
    var cookies = {},
        output;
    if (req.headers.cookie) {
        req.headers.cookie.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            cookies[parts[0].trim()] = parts[1].trim();
        });
        output = cookies[cookieName];
    }
    return output;
}

function setCookie(res, cookie, val) {
    res.setHeader('Set-Cookie', cookie + '=' + val);
}

exports.getCookie = getCookie;
exports.setCookie = setCookie;
