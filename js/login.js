let baseurl = "http://localhost";
async function login() {
  let username_input = document.getElementsByName("username")[0].value;
  let password_input = document.getElementsByName("password")[0].value;
  let message_node = document.getElementById("message");
  message_node.textContent = "";
  if (username_input == "" || password_input == "") {
    message_node.innerHTML = "Username or Password should not be empty!";
  } else {
    const result = doLogin(username_input, password_input);
    if (result.data.status == "success") {
      window.location.href = baseurl + "/index.html";
    } else {
      message_node.textContent = result.data.message;
    }
  }
  return false;
}

async function doLogin(username, password) {
  let data = {
    username: username,
    password: password
  }
  try {
    const res = await fetch(baseurl + "/login", {
      method: "POST",
      headers: "Content-Type:application/x-www-form-urlencoded",
      body: JSON.stringify(data)
    })
    return res;
  } catch (error) {
    console.error(error);
  }


}