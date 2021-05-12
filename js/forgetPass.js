
let time_id = 0;
let code_button_node = document.getElementById("send_code_button");
let baseurl = "http://localhost";



code_button_node.onclick = async () => {
  let email = document.getElementsByName("email")[0].value;
  let message_node = document.getElementById("verify_code_message");
  message_node.textContent = "";
  if (message_node.hasAttribute("style")) {
    message_node.removeAttribute("style");
  }
  let res = await sendVerifyCode(email);
  if (res) {
    message_node.setAttribute("style", "color:green;");
    message_node.textContent = "send success";
    let i = 0;
    code_button_node.setAttribute("disabled", "disabled");
    time_id = setInterval(() => {
      code_button_node.textContent = (60 - i) + "s";
      i++;
      if (i == 60) {
        clearInterval(time_id);
        code_button_node.removeAttribute("disabled");
      }
    }, 1000);
  } else {
    message_node.textContent = "something wrong";
  }
}

async function doReset() {
  let username_input = document.getElementsByName("username")[0].value;
  let password_input = document.getElementsByName("password")[0].value;
  let email_input = document.getElementsByName("email")[0].value;
  let code_input = document.getElementsByName("verify_code")[0].value;

  return await post(baseurl + "/reset", {
    data: {
      username: username_input,
      password: password_input,
      email: email_input,
      code: code_input
    }
  });
}


function checkSubmit() {
  let message_node = document.getElementById("message");
  message_node.innerHTML = "";
  let is_valid = checkUsername() && checkPassword() && checkEmail() && checkVerifyCode();
  if (is_valid) {
    const result = doReset();
    if (result.data.status = "success") {
      alert("reset password success! You will be redirect to index page in 3s.");
      setTimeout(() => {
        window.location.href = baseurl + "/index.html";
      }, 3000);
    } else {
      message_node.textContent = result.data.message;
    }
  }
}

function checkUsername() {
  let valid_pattern = /[^a-zA-z0-9@]/g;
  let username_input = document.getElementsByName("username")[0].value;
  let message_node = document.getElementById("username_message");
  message_node.textContent = "";
  console.log(username_input);
  if (username_input.length > 20 || username_input.length < 6) {
    message_node.textContent = "Username should not shorter than 6 chars or greater than 20 chars.";
    return false;
  } else if (valid_pattern.test(username_input)) {
    message_node.textContent = "Username can only be numbers, letters or '@'.";
    return false;
  }
  return true;
}

function checkPassword() {
  let password_input = document.getElementsByName("password")[0].value;
  let message_node = document.getElementById("password_message");
  message_node.textContent = "";
  console.log(password_input);
  if (password_input.length > 20 || password_input.length < 6) {
    message_node.textContent = "Password should not shorter than 6 chars or greater than 20 chars.";
    return false
  }
  return true;

}


function checkEmail() {
  let valid_pattern = /^[0-9a-zA-z]+@[0-9a-zA-Z]+(\.[a-z]+)+$/g;
  let email_input = document.getElementsByName("email")[0].value;
  let message_node = document.getElementById("email_message");
  message_node.textContent = "";
  if (!valid_pattern.test(email_input)) {
    message_node.innerHTML = "Wrong Email format!"
    return false;
  }
  return true;
}
function checkVerifyCode() {
  let code_input = document.getElementsByName("verify_code")[0].value;
  let message_node = document.getElementById("verify_code_message");
  message_node.textContent = "";
  if (code_input.length != 6) {
    message_node.innerHTML = "Please input the right code!"
    return false;
  }
  return true;
}