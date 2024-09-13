"use strict";

// code copy button
$(document).ready(function () {
    $("pre").wrap("<figure class='highlight'></figure>");
    $('pre').before('<div class="copy" onclick="copy(this)"></div>');
});

// loader
$(window).on("load", function () {
    setTimeout(function () {
        $(".loader-wrapper").fadeOut("slow");
    }, 0);
});

// code copier
async function copy(copy) {

    var code = copy.nextElementSibling
    copy.removeAttribute('onclick');
    var range = document.createRange();
    range.selectNode(code);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    copy.classList.add('active');
    await new Promise(resolve => setTimeout(resolve, 1000));
    copy.classList.remove('active');
    copy.setAttribute('onclick', 'copy(this)');
}
