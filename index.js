/*
Copyright (C) 2012-2013 Lajos Koszti ajnasz@ajnasz.hu

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*jslint node: true*/
function getCookie(req, cookieName) {
    "use strict";
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

function setCookie(res, cookie, val, expiration, domain, secure, httpOnly, path) {
    "use strict";
    var cookieVal = cookie + '=' + val,
        expdate,
        cookies;

    if (expiration) {
        // expiration can be a Date object
        if (expiration instanceof Date) {
            expdate = expiration;
        // expiration can be a unix timestamp
        } else {
            expdate = new Date(expiration);
        }
        cookieVal += '; expires=' + expdate.toUTCString();
    }

    if (domain) {
        cookieVal += '; Domain=' + domain;
    }

    if (path) {
        cookieVal += '; Path=' + path;
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

var day = 60 * 60 * 24 * 1000;

function delCookie(res, cookie, domain, secure, httpOnly, path) {
    "use strict";
    // minus a day
    setCookie(res, cookie, "", Date.now() - day, domain, secure, httpOnly, path);
}

exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.delCookie = delCookie;
