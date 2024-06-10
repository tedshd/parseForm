function parseForm(formDom) {
    var tmpObj = {},
        obj = {},
        el = formDom.elements;
    for (var i = 0; i < el.length; i++) {
        if (!el[i].name) {
            continue;
        }
        if (tmpObj[el[i].name] == undefined) {
            tmpObj[el[i].name] = [];
        }
        tmpObj[el[i].name].push(el[i]);
    }
    for (var n in tmpObj) {
        if (tmpObj[n].length > 1) {
            for (var m = 0; m < tmpObj[n].length; m++) {
                if (tmpObj[n][m].nodeName == 'INPUT') {
                    switch (tmpObj[n][m].type) {
                        case 'checkbox':
                            if (!obj[n]) {
                                obj[n] = [];
                            }
                            if (tmpObj[n][m].checked == true) {
                                obj[n].push(tmpObj[n][m].value);
                            }
                            break;
                        case 'radio':
                            if (tmpObj[n][m].checked == true) {
                                obj[n] = tmpObj[n][m].value;
                            }
                            break;
                        default:
                            console.error('parseForm ERROR: input name "' + n + '" duplicate');
                            return;
                    }
                }
            }
        } else {
            var item = tmpObj[n][0];
            if (item.nodeName == 'INPUT') {
                switch (item.type) {
                    case 'checkbox':
                        if (item.checked === true) {
                            obj[n] = item.value;
                        } else {
                            obj[n] = '';
                        }
                        break;
                    case 'radio':
                        if (item.checked === true) {
                            obj[n] = item.value;
                        } else {
                            obj[n] = '';
                        }
                        break;
                    default:
                        obj[n] = item.value;
                        break;
                }
            }
            if (item.nodeName == 'TEXTAREA') {
                obj[n] = item.value;
            }
            if (item.nodeName == 'SELECT') {
                obj[n] = item.options[item.selectedIndex].value;
            }
        }
    }
    return obj;
}
