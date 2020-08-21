var isFirstRound = true
var isLastRound = false
var current_letter = 0
var current_number = 0
var current_ip = [10, 10, 10, 1]
var all_code = ""

function next() {
    let base_field = document.getElementById("base_field").value;
    let letter_field = document.getElementById("letter_field").value;
    let letter_field_end = document.getElementById("letter_field_end").value.charCodeAt(0);
    let number_field = document.getElementById("number_field").value;
    let number_field_end = document.getElementById("number_field_end").value;
    let password_base_field = document.getElementById("password_base_field").value;
    let ip_start_field = document.getElementById("ip_start_field").value.split(".");
    let PPP_client = document.getElementById("PPP_client");
    let PPP_code = document.getElementById("PPP_code");
    let all_code_display = document.getElementById("all_code_display");

    parseInt(current_number)
    parseInt(number_field)
    parseInt(number_field_end)

    if (isFirstRound) {
        current_letter = document.getElementById("letter_field").value.charCodeAt(0);
        current_number = parseInt(document.getElementById("number_field").value);
        current_ip[0] = parseInt(ip_start_field[0]);
        current_ip[1] = parseInt(ip_start_field[1]);
        current_ip[2] = parseInt(ip_start_field[2]);
        current_ip[3] = parseInt(ip_start_field[3]);
        isFirstRound = false;

    } else {
        if (current_number >= number_field_end) {
            current_number = 1;

            if (current_letter < letter_field_end) {
                current_letter += 1;
                this_number = String.fromCharCode(current_letter);
            } else {
                isLastRound = true;
                alert("END OF LIST");
            }

        } else {
            current_number += 1;
        }

        // IP ADDRESS ENUMERATION
        if (current_ip[3] >= 254) {
            current_ip[2] += 1
            current_ip[3] = 2
        } else {
            current_ip[3] += 1
        }

    }

    let username = "User Name: <br><strong>" + base_field + String.fromCharCode(current_letter) + current_number + "</strong>";
    let password = "Password: <br><strong>" + password_base_field + String.fromCharCode(current_letter) + current_number + "AZ" + current_number + "</strong>";
    let ipaddress = "ip address: <br><strong>" + current_ip[0] + "." + current_ip[1] + "." + current_ip[2] + "." + current_ip[3] + "</strong>";

    PPP_client.innerHTML = username + "<br><br>" + password + "<br><br>" + ipaddress;


    let code_local_ip = current_ip[0] + "." + current_ip[1] + "." + current_ip[2] + ".1";
    let code_remote_ip = current_ip[0] + "." + current_ip[1] + "." + current_ip[2] + "." + current_ip[3];
    let ppp_inner_code = ""
    ppp_inner_code += "/ppp secret\n"
    ppp_inner_code += "add local-address=" + code_local_ip + " name=" + base_field + String.fromCharCode(current_letter) + current_number + " password=" + password_base_field + String.fromCharCode(current_letter) + current_number + "00" + current_number + " profile=profile100 remote-address=" + code_remote_ip + " service=pppoe\n"

    PPP_code.innerHTML = ppp_inner_code


    all_code += ppp_inner_code;
    all_code_display.innerHTML = all_code
}

function generate_all() {
    while (isLastRound == false) {
        next()
    }
}