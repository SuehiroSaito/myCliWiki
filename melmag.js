var y0, m0, d0;
var y1, m1, d1;
var LineText, output;
var passed_days; // スペルミス pssed_days を修正
var number;
var current_msec;

const crs = "  "; // MarkDown 改行対応

function calc_num_after() {
    var elp = number; 
    current_msec = Date.UTC(y0, m0 - 1, d0, 0, 0, 0);
    var dt = new Date(elp * 86400000 + current_msec);
    y1 = dt.getFullYear();
    m1 = dt.getMonth() + 1;
    d1 = dt.getDate();
}

function calc_passed_days() {
    var msec1 = Date.UTC(2016, 0, 1, 0, 0, 0);
    var msec2 = Date.UTC(y1, m1 - 1, d1, 0, 0, 0);
    var diff = msec2 - msec1;
    passed_days = Math.floor(diff / 86400000) + 1;
}

// グローバル変数の定義
var global_today;

function ins_today() {
    var now = new Date();
    var hour = now.getHours();
    
    // 午後（12時以降）なら 1日分(86400000ms)を足し、午前なら 0を足す
    var addMsec = (hour >= 12) ? (24 * 60 * 60 * 1000) : 0;

    // 「今日（または翌日）」のオブジェクトをグローバル変数に代入
    global_today = new Date(now.getTime() + addMsec);

    y0 = global_today.getFullYear();
    m0 = global_today.getMonth() + 1;
    d0 = global_today.getDate();

    // HTMLの入力欄にセット（例: "4/6"）
    document.myForm.date.value = m0 + "/" + d0;
}

function getTodayString() {
    // 1. 入力欄（myForm.date）に手入力された値があるか確認
    var inputVal = document.myForm.date.value; // "4/8" など
    if (inputVal && inputVal.indexOf("/") !== -1) {
        var parts = inputVal.split("/");
        var mInput = parseInt(parts[0]);
        var dInput = parseInt(parts[1]);

        // 現在保持している global_today と月日が異なる場合、手入力を優先して上書き
        if (!global_today || (global_today.getMonth() + 1 !== mInput) || (global_today.getDate() !== dInput)) {
            var now = new Date();
            // 入力された月日に基づいて global_today を更新（年は現在の年を使用）
            global_today = new Date(now.getFullYear(), mInput - 1, dInput);
        }
    }

    // 2. もし何らかの理由で global_today が空なら初期化
    if (!global_today) {
        ins_today();
    }

    var y = global_today.getFullYear();
    var m = global_today.getMonth() + 1;
    var d = global_today.getDate();

    // 2桁に整形（ゼロパディング）
    var mStr = (m < 10) ? "0" + m : m;
    var dStr = (d < 10) ? "0" + d : d;

    // "2026-04-08" 形式で返す
    return y + "-" + mStr + "-" + dStr;
}

/**
 * getTodayStringの結果（手入力優先）を使って
 * 有料版・無料版の件名入力欄を更新する
 */
function updateSubjectHeads() {
    var dateStr = getTodayString(); // ここで手入力が反映される

    var hwHeadElement = document.getElementById("hwHead");
    var msg = hwHeadElement ? hwHeadElement.value : "回答メールお待ちしています。";

    // IDが hwHeadDm/mm であることを確認してください
    var dmElement = document.getElementById("hwHeadDm");
    var mmElement = document.getElementById("hwHeadMm");

    var dmText = "[jwork-d] " + dateStr + " " + msg;
    var mmText = dateStr + " " + msg;

    if (dmElement) dmElement.value = dmText;
    if (mmElement) mmElement.value = mmText;
}

/**
 * 英語版の件名入力欄を更新する
 */
function updateEnglishSubjectHeads() {
    var dateStr = getTodayString(); 

    var hwHeadEnElement = document.getElementById("hwHeadEn");
    var msgEn = hwHeadEnElement ? hwHeadEnElement.value : "英語クイズ";

    // 修正ポイント：変数名を dmEnElement に統一
    var dmEnElement = document.getElementById("hwHeadDmEn");
    var mmEnElement = document.getElementById("hwHeadMmEn");

    var dmEnText = "[語メDM] " + dateStr + " " + msgEn;
    var mmEnText = dateStr + " " + msgEn;

    // 修正ポイント：宣言した変数名と一致させる
    if (dmEnElement) dmEnElement.value = dmEnText;
    if (mmEnElement) mmEnElement.value = mmEnText;
}

function dsp_data() {
    var i, word, pos;
    var substr = "/";

    word = document.myForm.date.value;
    pos = word.indexOf(substr, 0);
    m0 = parseInt(word.substring(0, pos));
    d0 = parseInt(word.substring(pos + 1, word.length));

    output = "";

    output = "今日は、" + m0 +"/" + d0 + crs + "\n" + "\n"

    // 2回〜7回
    LineText = "-";
    var steps = [-1, -4, -9, -17, -29, -46];
    for (var j = 0; j < steps.length; j++) {
        number = steps[j];
        calc_num_after();
        LineText += (j === 0 ? "" : " ") + m1 + "/" + d1;
    }
    output += LineText + crs + "\n";

    /*   ８回 */
    LineText = "-";
    number = -67;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 2 == 1) {
        for (i=-67; i<=-66; i++) {
            number = i;
            calc_num_after();
            if (i != -67) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /*   ９回 */
    LineText = "-";
    number = -88;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 2 == 1) {
        for (i=-88; i<=-87; i++) {
            number = i;
            calc_num_after();
            if (i != -88) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １０回 */
    LineText = "-";
    number = -109;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 2 == 1) {
        for (i=-109; i<=-108; i++) {
            number = i;
            calc_num_after();
            if (i != -109) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １１回 */
    LineText = "-";
    number = -129;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-132; i<=-129; i++) {
            number = i;
            calc_num_after();
            if (i != -132) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １２回 */
    LineText = "-";
    number = -155;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-158; i<=-155; i++) {
            number = i;
            calc_num_after();
            if (i != -158) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １３回 */
    LineText = "-";
    number = -182;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-185; i<=-182; i++) {
            number = i;
            calc_num_after();
            if (i != -185) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １４回 */
    LineText = "-";
    number = -209;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-212; i<=-209; i++) {
            number = i;
            calc_num_after();
            if (i != -212) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }


/* ------------------------ */
/* 以下 17/02/21 06:14 追加 */
/* ------------------------ */

    /* １５回 */
    LineText = "-";
    number = -236;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-239; i<=-236; i++) {
            number = i;
            calc_num_after();
            if (i != -239) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １６回 */
    LineText = "-";
    number = -263;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-266; i<=-263; i++) {
            number = i;
            calc_num_after();
            if (i != -266) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １７回 */
    LineText = "-";
    number = -290;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-293; i<=-290; i++) {
            number = i;
            calc_num_after();
            if (i != -293) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １８回 */
    LineText = "-";
    number = -317;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-320; i<=-317; i++) {
            number = i;
            calc_num_after();
            if (i != -320) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* １９回 */
    LineText = "-";
    number = -344;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-347; i<=-344; i++) {
            number = i;
            calc_num_after();
            if (i != -347) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    /* ２０回 */
    LineText = "-";
    number = -371;
    calc_num_after();
    calc_passed_days();
    if (passed_days % 4 == 0) {
        for (i=-374; i<=-371; i++) {
            number = i;
            calc_num_after();
            if (i != -374) {
                LineText = LineText + " ";
            }
            LineText = LineText + m1 + "/" + d1
        }
        output = output + LineText + crs + "\n";
    }

    document.myForm.myText_00.value = output;
}

// クリップボードへのコピー
function toCliB(xID) {
    var copyTarget = document.getElementById(xID);
    if (copyTarget) {
        copyTarget.select();
        copyTarget.setSelectionRange(0, 99999); //スマフォ対応
        var result = document.execCommand("copy");
        copyTarget.blur();
        window.getSelection().removeAllRanges();
        // if(result) alert("コピーしました");
    }
}
