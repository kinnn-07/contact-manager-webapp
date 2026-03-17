let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");
const search = document.getElementById("search");

// Load saved contacts
displayContacts();

// Add Contact
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();

  if (name === "" || email === "" || phone === "") {
    alert("All fields are required!");
    return;
  }

  let contact = { name, email, phone };

  if (editIndex === null) {
    contacts.push(contact);
  } else {
    contacts[editIndex] = contact;
    editIndex = null;
  }

  saveData();
  form.reset();
  displayContacts();
});

// Display Contacts
function displayContacts() {
  list.innerHTML = "";

  let filter = search.value.toLowerCase();

  contacts.forEach((contact, index) => {
    if (
      contact.name.toLowerCase().includes(filter) ||
      contact.email.toLowerCase().includes(filter)
    ) {
      let li = document.createElement("li");

      li.innerHTML = `
        <strong>${contact.name}</strong><br>
        ${contact.email}<br>
        ${contact.phone}<br>
        <button class="action-btn" onclick="editContact(${index})">Edit</button>
        <button class="action-btn" onclick="deleteContact(${index})">Delete</button>
      `;

      list.appendChild(li);
    }
  });
}

// Edit Contact
function editContact(index) {
  let contact = contacts[index];

  document.getElementById("name").value = contact.name;
  document.getElementById("email").value = contact.email;
  document.getElementById("phone").value = contact.phone;

  editIndex = index;
}

// Delete Contact
function deleteContact(index) {
  contacts.splice(index, 1);
  saveData();
  displayContacts();
}

// Save to Local Storage
function saveData() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Search Contacts
search.addEventListener("input", displayContacts);
