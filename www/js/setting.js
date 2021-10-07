/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    window.location.href="home.html";
}

$(document).ready(function () {

    server_url_stored = localStorage.getItem('glob_server');
    $('#glob_server').val(server_url_stored);
    console.log(server_url_stored);

    $('#setting-form').submit(function (e) {
        e.preventDefault();

//        data = $(this).serializeArray();
//        console.log(data);

        server_url = $('#glob_server').val();

        localStorage.setItem('glob_server', server_url);
    });
});