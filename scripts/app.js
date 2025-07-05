
const ADMIN = { email: "admin@admin.com", password: "admin123" };

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (email === ADMIN.email && password === ADMIN.password) {
    localStorage.setItem("role", "admin");
    location.href = "dashboard.html";
  } else if (users.includes(email)) {
    localStorage.setItem("role", "member");
    location.href = "member.html";
  } else {
    document.getElementById("error").innerText = "Sai tài khoản hoặc chưa được cấp quyền";
  }
}

function logout() {
  localStorage.removeItem("role");
  location.href = "index.html";
}

function addUser() {
  const name = document.getElementById("newUser").value;
  if (!name) return;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(name);
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("newUser").value = "";
  loadUsers();
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const ul = document.getElementById("userList");
  if (!ul) return;
  ul.innerHTML = "";
  users.forEach((u, i) => {
    const li = document.createElement("li");
    li.innerText = u;
    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.onclick = () => {
      users.splice(i, 1);
      localStorage.setItem("users", JSON.stringify(users));
      loadUsers();
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function uploadDoc() {
  const title = document.getElementById("docTitle").value;
  const file = document.getElementById("docFile").files[0];
  if (!title || !file) return alert("Điền tên và chọn file");
  const docs = JSON.parse(localStorage.getItem("docs") || "[]");
  docs.push({ title, name: file.name });
  localStorage.setItem("docs", JSON.stringify(docs));
  document.getElementById("docTitle").value = "";
  document.getElementById("docFile").value = "";
  loadDocs();
}

function loadDocs() {
  const docs = JSON.parse(localStorage.getItem("docs") || "[]");
  const ul = document.getElementById("docList") || document.getElementById("docListMember");
  if (!ul) return;
  ul.innerHTML = "";
  docs.forEach(doc => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${doc.title}</b> - ${doc.name}`;
    ul.appendChild(li);
  });
}

function createRoom() {
  const name = document.getElementById("roomName").value;
  const desc = document.getElementById("roomDesc").value;
  if (!name || !desc) return;
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  rooms.push({ name, desc });
  localStorage.setItem("rooms", JSON.stringify(rooms));
  document.getElementById("roomName").value = "";
  document.getElementById("roomDesc").value = "";
  loadRooms();
}

function loadRooms() {
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  const ul = document.getElementById("roomList") || document.getElementById("roomListMember");
  if (!ul) return;
  ul.innerHTML = "";
  rooms.forEach(room => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${room.name}</b><br>${room.desc}`;
    ul.appendChild(li);
  });
}

window.onload = () => {
  const role = localStorage.getItem("role");
  if (location.pathname.includes("dashboard.html") && role === "admin") {
    loadUsers(); loadDocs(); loadRooms();
  }
  if (location.pathname.includes("member.html") && role === "member") {
    loadDocs(); loadRooms();
  }
};
