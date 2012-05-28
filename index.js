/*jslint node: true*/
function getCookie(req, cookieName) {
    var cookies = {},
        cn,
        output;
    if (req.headers.cookie) {
        req.headers.cookie.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            if (parts.length > 1) {
                cn = parts[0].trim();
                cookies[cn] = parts[1].trim();
            }
            /* else { */
              /* it may be secure, or http only */
              /*
              switch (parts[0].trim()) {
              case 'HttpOnly':
                  httpOnly = true;
                  break;
              case 'Secure':
                  secure = true;
                  break;
              }
            }*/
        });
        output = cookies[cookieName];
    }
    return output;
}

function setCookie(res, cookie, val, expdays, domain, secure, httpOnly) {
    var cookieVal = cookie + '=' + val,
        expdate,
        cookies;

    if (expdays) {
        expdays = parseInt(expdays, 10);
        if (!isNaN(expdays)) {
            expdate = new Date();
            expdate.setDate(expdate.getDate() + expdays);
            cookieVal += '; expires=' + expdate.toUTCString();
        }
    }

    if (domain) {
        cookieVal += '; Domain=' + domain;
    }

    if (secure) {
        cookieVal += '; Secure';
    }

    if (httpOnly) {
        cookieVal += '; HttpOnly';
    }

    if (res.getHeader('Set-Cookie')) {
        // current cookies must be kept
        cookies = res.getHeader('Set-Cookie');
        if (typeof cookies === 'string') {
            cookies = [cookies];
        }
        cookies.push(cookieVal);
        cookieVal = cookies;
    }

    res.setHeader('Set-Cookie', cookieVal);
}

function delCookie(res, cookie, domain, secure, httpOnly) {
    setCookie(res, cookie, "", -1, domain, secure, httpOnly);
}

exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.delCookie = delCookie;
