document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    window.location.href = "index.html";
}

$(document).ready(function () {
    $('body').fadeIn("slow");
    var pesan = getParameterByName('pesan');

    if (pesan == null || pesan.length < 1) {

    } else {
        setTimeout(function () {
            $('#myModal').modal('show');
        }, 500);
    }

    get_list();

    $('#refresh').click(function () {
        get_list();

    });

    function get_list() {
        server_api = localStorage.getItem('glob_server');
        device_id = localStorage.getItem('device_id');
        $('#loading_spinner').show();
        $.ajax({
            url: server_api + '/laporan/',
            type: 'get',
            crossDomain: true,
            data: {
                'device_id': device_id
            }, success: function (result) {

                $('#laporan_list').html('');
                var html = '';
                if (result.status) {
                    data = result.data;
                    for (var i = 0; i < data.length; i++) {

                        row = data[i];

                        html = '<tr>' +
                                ' <td>' +
                                ' <a href="laporan_detail.html?id=' + row.id_korban + '" class="btn btn-primary btn-sm" >' +
                                '<i class="fas fa-file-alt"></i>' +
                                '</a>' +
                                ' </td>' +
                                '<td>' + row.created_at + '</td>' +
                                ' <td>' + row.nama_pelapor + '</td>' +
                                '<td>' + row.nama_korban + '</td>' +
                                '</tr>';
                        $('#laporan_list').append(html);
                    }
                }
                $('#loading_spinner').hide();

            }, error: function (err) {
                alert('Periksa Koneksi ' + JSON.stringify(err));
                $('#loading_spinner').hide();

            }
        });
    }
});