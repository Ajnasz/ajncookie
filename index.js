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

function setCookie(res, cookie, val, expdays) {
    var cookieVal = cookie + '=' + val;	
    if (expdays) {
      expdays = parseInt(expdays);
      if (!isNaN(expdays) {
        var expdate = new Date();
	expdate.setDate(expdate.getDate() + expdays);
	cookieVal += '; expires=' + expdate.toUTCString();
      }      
    }
    res.setHeader('Set-Cookie', cookieVal);
}

function delCookie(res, cookie) {
    setCookie(res, cookie, "", -1);
}

exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.delCookie = delCookie;
