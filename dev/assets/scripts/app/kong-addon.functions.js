/*!
 * Kong Addon for www.kongregate.com v1.5
 * https://github.com/Forthtilliath/Kong-Addon
 *
 * Copyright 2020 Forth
 * Released under the MIT license
 *
 * @fileoverview List of functions used
 * @author Forth
 * @version 2
 */
"use strict";

(function ($) {
    // Usable with $.function
    $.extend({
        /** Display a message to the player at the top of the screen
         *  @param {number} set a timer to show the message
         *  @param {string} set the title of the message
         *  @param {string|null|undefined} set the contenair of the message
         */
        displayMessage: function (timer, title, message) {
            if (typeof (message) == 'undefined') message = '';
            // If not existing, we add the box
            if (!$('#forth_messagebox').length) $('<div id="forth_messagebox"><div id="forth_messagetitle"></div></div>').appendTo("body");
            //if (!$('#forth_messagebox').length) $('<div').prop('id', 'forth_messagetitle').appendTo($('<div').prop('id', 'forth_messagebox')).appendTo("body");
            //if (!$('#forth_messagebox').length) $.createDiv('forth_messagebox').append($.createDiv('forth_messagetitle')).appendTo("body");
            $("#forth_messagetitle").text(title);
            $("#forth_messagedesc").text(message);
            $("#forth_messagebox").fadeIn("slow").delay(timer).fadeOut("slow");
        },

        /** Generate a code to display an icon
         *  @param {string} set the classes to the icon
         *  @return {string} Element i
         */
        createIcon: function (classes) {
            return $('<i>').addClass(classes).prop('outerHTML');
        },
        /** Create a block div with classes, title and contenue
         *  @param id {string} set the id of the div
         *  @param value {string} set the value of the div
         *  @param classes {string} set the classes style of the div
         *  @param title {string} set the title of the div
         *  @return {object} Element div
         */
        createDiv: function (id, value, classes, title) {
            let div = $('<div>')
            if (typeof id !== 'undefined') div.prop('id', id);
            if (typeof value !== 'undefined') div.html(value);
            if (typeof classes !== 'undefined') div.addClass(classes);
            if (typeof title !== 'undefined') div.prop('title', title);
            return div;
        },

        /** Parse a string to boolean
         * @param val {string} 'true' or 'false'
         * @return {boolean}
         */
        parseBool: function (val) {
            return val === true || val === "true"
        },

        /** Return the value of a cookie, if this one doesn't exist, this return default value
         *  @param name {string} set the name of the cookie
         *  @param defaultValue {string|number|boolean} set the value returned if the cookie doesn't exist
         *  @return {string} Value of the cookie or defaultValue
         */
        getCookieAll: function (name, defaultValue) {
            return $.getCookie(name, defaultValue, 0);
        },
        getCookieGame: function (name, defaultValue) {
            return $.getCookie(name, defaultValue, 1);
        },
        getCookie: function (name, defaultValue, iCatCookie) {
            let sCookieName, iCookieTime, sCookiePath;
            if (iCatCookie == 0) { // All
                sCookieName = COOKIE_NAME_ALL;
                iCookieTime = COOKIE_TIME_ALL;
                sCookiePath = '/';
            } else if (iCatCookie == 1) { // Game
                sCookieName = COOKIE_NAME_GAME;
                iCookieTime = COOKIE_TIME_GAME;
                sCookiePath = window.location.pathname;
            }

            if (Cookies.get(sCookieName) === undefined) { // If global cookie doesn't exist
                Cookies.set(sCookieName, '', { // We create it
                    expires: iCookieTime,
                    path: sCookiePath
                });
            }
            let sValue = Cookies.get(sCookieName);
            if (sValue.indexOf(name) != -1) {
                let aCookiesTmp = sValue.split(';');
                let found = aCookiesTmp.find(element => element.startsWith(name));
                let aValue = found.split("=");
                return aValue[1];
            } else {
                return defaultValue;
            }
        },
        /** Create or modify a cookie
         *  @param name {string} set the id of the cookie
         *  @param value {string} set the value
         */
        setCookieAll: function (name, value) {
            $.setCookie(name, value, 0);
        },
        setCookieGame: function (name, value) {
            $.setCookie(name, value, 1);
        },
        setCookie: function (name, value, iCatCookie) {
            let sCookieName, iCookieTime, sCookiePath;
            if (iCatCookie == 0) { // All
                sCookieName = COOKIE_NAME_ALL;
                iCookieTime = COOKIE_TIME_ALL;
                sCookiePath = '/';
            } else if (iCatCookie == 1) { // Game
                sCookieName = COOKIE_NAME_GAME;
                iCookieTime = COOKIE_TIME_GAME;
                sCookiePath = window.location.pathname;
            }

            if (Cookies.get(sCookieName) === undefined) { // If global cookie doesn't exist
                Cookies.set(sCookieName, '', { // We create it
                    expires: iCookieTime,
                    path: sCookiePath
                });
            }
            let oldValue = Cookies.get(sCookieName);
            let newValue = '';
            if (oldValue.indexOf(name) == -1) { // If cookie doesn't exist
                if (oldValue !== '') oldValue += ';';
                newValue = oldValue + name + "=" + value; // We add the new cookie at the end
            } else { // If cookie exists
                let aCookiesTmp = oldValue.split(';'); // We put all cookie in an array
                const found = aCookiesTmp.find(element => element.startsWith(name)); // We get the cookie
                let i = aCookiesTmp.indexOf(found); // We get the indice of the cookie to be able to replace it
                aCookiesTmp[i] = name + '=' + value; // We replace it
                newValue = aCookiesTmp.join(';'); // We convert it in string to make the new cookie
            }
            Cookies.set(sCookieName, newValue, { // We modifiy the cookie with new datas
                expires: iCookieTime,
                path: sCookiePath
            });
        },

        /** Excute an active script in the page to affect the values of kong's vars
         *  @param code {string} Code javasscript to execute
         */
        execScript: function (code) {
            let script = document.createElement('script');
            script.textContent = `${ code };`;
            (document.head || document.documentElement).appendChild(script);
            script.remove();
        },
        /** Change the text size in the chat box
         *  @param val {number} set the text size for chat, timestamp and input
         */
        changeTextSize: function (val) {
            // Add a cssrule to dynamise the text size
            jCSSRule(".chat_message_window_username", "font-size", val + "px"); // Username
            jCSSRule(".chat_message_window_undecorated_username", "font-size", val + "px"); // Kong bot
            jCSSRule(".chat_message_window p .message", "font-size", val + "px"); // Message
            jCSSRule(".chat_input", "font-size", val + "px"); // Chat input
            jCSSRule(".chat_message_window p .timestamp", "font-size", (val - 2) + "px !important"); // Timestamp
        },
        /** Remove elements from html */
        removeElements: function (a) {
            a.forEach(function (b) {
                if ($(b).length > 0) $(b).remove();
            });
        },
        removeElements2: function (o) {
            o.forEach(function (b) {
                if (b.length > 0) b.remove();
            });
        },
        /** Resize the game box
         *  @param {number} set the width of the box
         */
        setWidthGame: function (w) {
            $("#gameholder").css("width", w);
            $("#game").css("width", w);
        },
        /** Resize the game box
         *  @param {number} set the width of the box
         */
        setWidthBoth: function (w) {
            $("#maingame").css("width", w);
            $("#maingamecontent").css("width", w);
            $("#flashframecontent").css("width", w);
        },
        /** Resize the game box
         *  @param {number} set the height of the box
         */
        setHeightBoth: function (h) {
            $("#maingame").css("height", h);
            $("#maingamecontent").css("height", h);
            $("#flashframecontent").css("height", h);
        },
        /** Resize the chat box
         *  @param {number} add the width of the box
         */
        setWidthChat: function (w) {
            if (typeof (w) == 'undefined') w = 0;

            $("#chat_container").css("width", `calc( ${WIDTH_CHAT_DEFAULT} + ${w}px - 3px )`);
            $("#kong_game_ui>div").css("width", `calc( ${WIDTH_CHAT_DEFAULT} + ${w}px - 3px - 16px )`);
            $(".chat_input").css("width", `calc( ${WIDTH_CHAT_DEFAULT} + ${w}px - 3px - 16px - 8px )`);
            $(".chat_char_countdown").css("width", `calc( ${WIDTH_CHAT_DEFAULT} + ${w}px - 3px - 16px - 8px )`);
        },
        /** Transform an array ['a','b','c'] to [['a',0],['b',0],['c',0]] usable in script function
         *  @param a {array} set the array to become a double array
         *  @param d {number} set the default value
         */
        getArrayDoubleToString: function (a, d) {
            let s = "";
            if (typeof (d) == 'undefined') d = 0;
            a.forEach(function (v, i) {
                s += i > 0 ? "," : "";
                s += `['${v}', ${d}]`;
            });

            return `[${s}]`;
        },
        /** Display a message in the console
         *  @param nLevel {number} set the level required to display the message
         *  @param text {string} set the text to display
         */
        log: function (nLevel, text) {
            if (DEBUG_LEVEL >= nLevel) console.log(text);
        },
        /** Change the color of button and the cursor in function of the active mode
         *  @param {number} set the id of the mode
         */
        setStyleDisplayMode: function (i) {
            let bt_1 = '#' + features.get('displayMode').divName + ' button:first-child';
            let bt_2 = '#' + features.get('displayMode').divName + ' button:not(:first-child):not(:last-child)';
            let bt_3 = '#' + features.get('displayMode').divName + ' button:last-child';

            jCSSRule(bt_1, "color", (i == -1) ? (darkMode ? color_white : color_black) : bgColor_grey_13);
            jCSSRule(bt_1, "cursor", (i == -1) ? "default" : "pointer");
            jCSSRule(bt_2, "color", (i == 0) ? (darkMode ? color_white : color_black) : bgColor_grey_13);
            jCSSRule(bt_2, "cursor", (i == 0) ? "default" : "pointer");
            jCSSRule(bt_3, "color", (i == 1) ? (darkMode ? color_white : color_black) : bgColor_grey_13);
            jCSSRule(bt_3, "cursor", (i == 1) ? "default" : "pointer");
        },
        /** Remove all styles of the button message of the website when we click on it
         *  Per default, when we open new messages on a new tab, the link doesn't change
         */
        removeStyleUnreadMessage: function () {
            $("#profile_control_unread_message_count").text(''); // Remove the number of unread messages
            $("#profile_control_unread_message_count").removeClass('has_messages mls'); // Remove the class
            $("#profile_bar_messages").removeClass('alert_messages'); // Remove the class
            $("#my-messages-link").attr('title', ''); // Remove the title
        },
        /** Copy the text of the div inside another div
         *  @param fromDiv {string} Div origin
         *  @param toDiv {string} Div target
         */
        copyText: function (fromDiv, toDiv) {
            $(fromDiv).text($(toDiv).text());
        },
        /** Create a element svg
         *  @param href {string} Link of the svg
         *  @param width {number} Width to display
         *  @param height {number} Height to display
         *  @return {Element} SVG
         */
        createElementSVG: function (href /*, width, height*/ ) {
            var svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
                useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            //svgElem.setAttribute("width", width);
            //svgElem.setAttribute("height", height);

            useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
            svgElem.appendChild(useElem);

            return svgElem;
        },
        /** Load sprites to be able to display svg
         */
        loadSpritesSvg: function () {
            $.get(chrome.runtime.getURL("assets/images/sprites/buttons.svg"), function (data) {
                var div = document.createElement("div");
                div.style.display = 'none';
                div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
                document.body.insertBefore(div, document.body.childNodes[0]);
            });
        },
        /**
         * Verifie si un argument existe
         * @param arg : Argument à vérifier
         * @param def : Valeur par defaut à retourner
         * @return Soit la valeur de l'argument si l'existe, sinon la valeur par defaut
         */
        getArg: function (arg, def) {
            if (typeof arg !== 'undefined') {
                return arg;
            } else {
                return def;
            }
        }
    });

    // Usable with $(selector).function
    $.fn.extend({
        /** Set a button with new value and new title
         *  @param {string} set the value
         *  @param {string} set the title
         */
        setButton: function (value, title) {
            this.html(value);
            this.prop('title', title);
        },
        /** Center an element in the middle of the screen  */
        centrerElementAbsolu: function () {
            //console.error("WHYYY");
            $(window).scrollTop(0); // Move the page at the top to fix an issue when we refresh a page which not is at the top
            this.css('top', ($(window).height() - this.height()) / 2);
            this.css('left', ($(window).width() - this.width()) / 2);
        },
        /** Scroll down an element */
        scrollBottom: function () {
            if (this.length) {
                try {
                    this.animate({
                        scrollTop: this.prop("scrollHeight")
                    }, 'slow');
                } catch (e) {
                    console.log(e);
                }
            } else {
                $.log(1, `Selector [${Object.values(this)}] not found`);
            }
        },
        /** The function will return a title for the Location object. With $(location), the function will return
         *  le title of the current page
         *  return {string} title of the page
         */
        getIdCurrentPage: function () {
            let m = REGEX_URL.exec(this.attr('href'));

            if (m[2] != null) {

                let aUrl = m[2].substr(1).split("/");
                $.log(20, aUrl);

                let nSplitUrl = aUrl.length;

                if (nSplitUrl == 1) {
                    if (aUrl[0] == 'my_favorites') return 'allgames';
                    if (aUrl[0] == 'recommended-badges') return 'badges';
                    if (aUrl[0] == 'badges') return 'badges';
                    if (aUrl[0] == 'minus') return 'minus';
                    if (aUrl[0] == 'forums') return 'forums';
                    if (aUrl[0] == 'community') return 'accounts';
                    if (aUrl[0] == 'cookie-policy') return 'privacy';
                    if (aUrl[0] == 'privacy') return 'privacy';
                    if (aUrl[0] == 'user-agreement') return 'privacy';
                    if (aUrl[0] == 'kreds') return 'kreds';
                    if (aUrl[0] == 'posts') return 'posts';
                    if (aUrl[0] == 'games_for_your_site') return 'gamesexport';
                    if (aUrl[0] == 'search') return 'search';
                    if (aUrl[0] == 'forum_search') return 'forum_search';
                    if (aUrl[0] == 'stickers') return ''; // Not done yet https://www.kongregate.com/stickers/#sticker-pack-27
                    return 'allgames';
                }

                if (nSplitUrl == 2) {
                    if ((aUrl[0] == 'badge_quests') && (aUrl[1] == 'your_first')) return 'badges';
                    if ((aUrl[0] == 'accounts') && (aUrl[1] == 'new')) return 'newaccount';
                    if (aUrl[0] == 'pages') {
                        if (aUrl[1] == 'bartender-ballerina') return ''; // Full bugged page
                        if (aUrl[1] == 'luck-of-the-draw-sweeps') return 'spellstone';
                        if (aUrl[1] == 'luck-of-the-draw-sweeps-rules') return 'spellstone';
                        if (aUrl[1] == 'about') return 'about';
                        if (aUrl[1] == 'kongregate-ad-specs') return 'adspecs';
                        if (aUrl[1].substr(0, 7) == 'conduct') return 'conduct';
                        if (aUrl[1] == 'logos-and-branding') return 'logos';
                        if (aUrl[1] == 'jobs') return 'jobs';
                    }
                    if (aUrl[0] == 'forums') return 'forums';
                    if (aUrl[0] == 'feedbacks') return 'feedbacks';
                    if (aUrl[0] == 'games') return 'allgames'; // dev pages
                }

                if (nSplitUrl == 3) {
                    if ((aUrl[0] == 'accounts') && (aUrl[2] == 'awards')) return 'awards';
                    if ((aUrl[0] == 'pages') && (aUrl[2].substr(0, 7) == 'conduct')) return 'conduct';
                }

                if (nSplitUrl == 4) {
                    if ((aUrl[0] == 'forums') && (aUrl[2] == 'topics')) return 'topics';
                    if ((aUrl[0] == 'games') && (aUrl[3] == 'comments')) return 'comments';
                }

                if (aUrl[0] == 'games') return 'games';
                if (aUrl[0] == 'accounts') return 'accounts';
            }
            return 'accueil';
        },
        /* Not working well */
        removeAll: function () {
            while ($(this).length >= 1) {
                $(this).remove();
            }
        }
    });

    jQuery.fn.cssNumber = function (prop) {
        var v = parseInt(this.css(prop), 10);
        return isNaN(v) ? 0 : v;
    };

})(jQuery);
