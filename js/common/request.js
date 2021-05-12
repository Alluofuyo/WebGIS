baseurl = "http://localhost";

function sendVerifyCode(email) {
  return fetch(baseurl + "/verifyCode?email=" + encodeURIComponent(email));
}

function post(url, args) {
  let data = "";
  if (!args.headers["Content-Type"]) {
    Object.assign(headers, { "Content-type": "Content-Type:application/x-www-form-urlencoded" })
  }
  if (args["data"]) {
    let data = encodeURIComponent(JSON.stringify(data));
  }
  return fetch(url, {
    method: "POST",
    headers: JSON.stringify(headers),
    body: data
  });
}

function get(url, args) {
  return fetch(url, {
    method: "GET",
    headers: JSON.stringify(args.headers || "")
  });
}