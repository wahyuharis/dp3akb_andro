document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    window.location.href = "home.html";
}


$(document).ready(function () {
    $('body').fadeIn("slow");

    var type = getParameterByName('type');

    var title = '';

    $('#jenis_kelamin_korban').val('');
    $('#jenis_kelamin').val('');


    if (type == 'child') {
        $('#navbar').removeClass('bg-danger');
        $('#navbar').addClass('bg-primary');

        $('#btn_submit').removeClass('btn-danger');
        $('#btn_submit').addClass('btn-primary');

        $('#btn_next').removeClass('btn-danger');
        $('#btn_next').addClass('btn-primary');

        $('#top-navbar').removeClass('bg-danger');
        $('#top-navbar').addClass('bg-primary');

        title = '<h5>Lapor Kekerasan Pada Anak</h5>' +
                '<span>lengkapi form yang tersedia berikut</span>';

        $('#title-nav').html(title);

        $('#jenis_korban').val('Anak');

    } else {
        title = '<h5>Lapor Kekerasan Pada Perempuan</h5>' +
                '<span>lengkapi form yang tersedia berikut</span>';

        $('#title-nav').html(title);
        $('#jenis_korban').val('Perempuan');

        $('#form_jenis_kelamin_korban').hide();
        $('#jenis_kelamin_korban').val('P');

    }

    $('#btn_next').click(function () {
        form2_open();
    });

    $('#pelapor_tab').click(function () {
        form1_open();
    });

    $('#korban_tab').click(function () {
        form2_open();
    });

    get_option_keterangan();


    $('#ket_lain_toggle').change(function () {
        var ket_lain_toggle = $('#ket_lain_toggle').is(':checked');

        if (ket_lain_toggle) {
            $('#keterangan_lain_field').show();
            $('#keterangan_pengaduan').prop('disabled', true);

        } else {
            $('#keterangan_lain_field').hide();
            $('#keterangan_pengaduan').prop('disabled', false);
        }
    });




    function get_option_keterangan() {
        $('#keterangan_pengaduan').append('<option value="etc" >Lain Lain</option>');
        $('#keterangan_pengaduan').val('');

        server_api = localStorage.getItem('glob_server');

        $.ajax({
            url: server_api + '/Jenis_pengaduan',
            type: 'get',
            crossDomain: true,
            data: {

            }, success: function (result) {
                data = result.data;
                $('#keterangan_pengaduan').html('');

                for (var i = 0; i < data.length; i++) {
                    $('#keterangan_pengaduan').append('<option value="' + data[i].id_jenis_aduan + '" >' + data[i].keterangan + '</option>');
                }
//                $('#keterangan_pengaduan').append('<option value="etc" >Lain Lain</option>');
                $('#keterangan_pengaduan').val('');
                $('#keterangan_pengaduan').select2({
                    theme: "bootstrap"
                });


            }, error: function (err) {
                alert(JSON.stringify(err));
            }
        });


    }


    function form2_open() {
        $('#form-1').hide();
        $('#form-2').show('slow');

        $('#btn_next').hide();
        $('#btn_submit').show();

        $('#korban_tab').parent().addClass('active');
        $('#pelapor_tab').parent().removeClass('active');
    }

    function form1_open() {
        $('#form-2').hide();
        $('#form-1').show('slow');

        $('#btn_submit').hide();
        $('#btn_next').show();

        $('#pelapor_tab').parent().addClass('active');
        $('#korban_tab').parent().removeClass('active');
    }

    $('#form_submit').submit(function (e) {
        e.preventDefault();

        var server_api = localStorage.getItem('glob_server');

        var validasi_succes = validate();

        if (validasi_succes) {
            $('#btn_submit').prop('disabled', true);
            $('#loading_spinner').show();

            $.ajax({
                url: server_api + '/lapor/save',
                type: 'post',
                data: new FormData(this),
                contentType: false,
                processData: false,
                success: function (response) {
//                    console.log('succes');

                    if (response.status) {
                        succes_message = "data bershasil dikirim";
                        succes_message = encodeURI(succes_message);
                        $('#btn_submit').prop('disabled', false);
                        $('#loading_spinner').hide();

//                        window.location.href = "index.html?pesan=" + succes_message;

                    }

                    $('#loading_spinner').hide();

                    $('#btn_submit').prop('disabled', false);

                },
                error: function (xhr, res) {
                    alert('Koneksi Gagal, Periksa Jaringan anda');
                    console.log('err');
                    $('#btn_submit').prop('disabled', false);
                    $('#loading_spinner').hide();


                }
            });
        }


    });

    function validate() {
        var succes = true;

        var nama = $('input[name=nama]').val();
        var umur = $('input[name=umur]').val();
        var no_telp = $('input[name=no_telp]').val();
        var jenis_kelamin = $('select[name=jenis_kelamin]').val();

        var nama_korban = $('input[name=nama_korban]').val();
        var umur_korban = $('input[name=umur_korban]').val();
        var no_telp_korban = $('input[name=no_telp_korban]').val();
        var jenis_kelamin_korban = $('select[name=jenis_kelamin_korban]').val();


//        var keterangan_pengaduan = $('select[name=keterangan_pengaduan]').val();
        var keterangan_lain = $('textarea[name=keterangan_lain]').val();

        if (nama.length < 5) {
            $('span[validationatr=nama]').html('nama wajib di isi');
            succes = false;
        }
        if (umur.length < 1) {
            $('span[validationatr=umur]').html('umur wajib di isi');
            succes = false;
        }
        if (no_telp.length < 10) {
            $('span[validationatr=no_telp]').html('no telp wajib di isi atau format salah');
            succes = false;
        }
        if (jenis_kelamin == null) {
            $('span[validationatr=jenis_kelamin]').html('jenis kelamin wajib di isi');
            succes = false;
        }


        if (nama_korban.length < 5) {
            $('span[validationatr=nama_korban]').html('nama korban wajib di isi');
            succes = false;
        }
        if (umur_korban.length < 1) {
            $('span[validationatr=umur_korban]').html('umur korban wajib di isi');
            succes = false;
        }
        if (no_telp_korban.length < 10) {
            $('span[validationatr=no_telp_korban]').html('no telp korban wajib di isi atau format salah');
            succes = false;
        }

//        jenis_kelamin_korban

        if (jenis_kelamin_korban == null) {
            $('span[validationatr=jenis_kelamin_korban]').html('jenis kelamin korban wajib di isi');
            succes = false;
        }


        var ket_lain_toggle = $('#ket_lain_toggle').is(':checked');
        if (ket_lain_toggle) {
            if (keterangan_lain.length < 5) {
                $('span[validationatr=keterangan_lain]').html('keterangan lain wajib di isi');
                succes = false;
            }
        } else {
            $('span[validationatr=keterangan_pengaduan]').html('keterangan pengaduan wajib di isi');
            succes = false;
        }


        $('#form_submit').find('input,select,textarea').change(function () {
            attr_name = $(this).attr('name');
            $('span[validationatr=' + attr_name + ']').html('');
        })


        return succes;
    }

});
