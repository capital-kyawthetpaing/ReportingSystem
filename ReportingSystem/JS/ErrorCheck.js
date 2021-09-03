function ErrorCheck(ctrl) {

    if ($(ctrl).attr('maxlength') !== undefined) {
        var url = $("#ByteLengthUrl").val();
        var obj = {
            param1: $(ctrl).val(),
            param2: $(ctrl).attr('maxLength'),
        };
        var response = CalltoApiController(url, obj);
        if (response == '0') {
            ShowMessage('E132');
            return false;
        }
    }

    if ($(ctrl).prop('required') && !$(ctrl).val()) {
        ShowMessage('E102');
        return false;
    }
    else if ($(ctrl).data('exists')) {
        var url = $("#ExistsUrl").val();
        var v1 = $(ctrl).data('exists');

        var obj = {
            param1: v1,
            param2: $(ctrl).val(),
        };
        var response = CalltoApiController(url, obj);
        if (response == '1') {
            ShowMessage('E107');
            return false;
        }
    }
    else if ($(ctrl).data('date') == '1') {
        var url = $("#DateCheckUrl").val();
        var v1 = $(ctrl).data('date');

        var obj = {
            param1: $(ctrl).val(),
        };
        var response = CalltoApiController(url, obj);
        if (response != 'NG') {
            $(ctrl).val(response)
        }
        else {
            ShowMessage('E103');
            return false;
        }
    }

    return true;
}

function ErrorCheckOnSave(v1) {
    var r1 = true;
    $('#' + v1 + ' *').filter(':input').each(function () {
        var result = ErrorCheck(this);
        if (!result) {
            $(this).focus();
            r1 = false;
            return false;
        }
    });
    return r1;
}