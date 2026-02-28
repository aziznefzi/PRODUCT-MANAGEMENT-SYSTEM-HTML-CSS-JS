let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let deleteModal = document.getElementById("deleteModal");
let confirmDeleteBtn = document.getElementById("confirmDelete");
let deleteMessage = document.getElementById("deleteMessage");
let searchBlock = document.getElementById("searchBlock");

let mood = "create";
let tmp;
let deleteType = ""; // "single" or "all"
let deleteIndex = null;

// Universe Background Animation
function initUniverse() {
    var starCount = 400;
    var maxTime = 30;
    var universe = document.getElementById("universe");
    var width = window.innerWidth;
    var height = window.innerHeight;

    for (var i = 0; i < starCount; ++i) {
        var ypos = Math.round(Math.random() * height);
        var star = document.createElement("div");
        var speed = 1000 * (Math.random() * maxTime + 1);
        star.setAttribute("class", "star" + (3 - Math.floor(speed / 1000 / 8)));
        star.style.backgroundColor = "white";
        star.style.left = Math.random() * width + "px";
        star.style.top = ypos + "px";

        universe.appendChild(star);
        star.animate(
            [
                { transform: "translate3d(" + width + "px, 0, 0)" },
                { transform: "translate3d(-" + (width + 50) + "px, 0, 0)" }
            ],
            {
                delay: Math.random() * -speed,
                duration: speed,
                iterations: Infinity
            }
        );
    }
    
    // Pulse animation logic from user
    var pulseElem = document.querySelector(".pulse");
    if (pulseElem) {
        pulseElem.animate(
            {
                opacity: [0.5, 1],
                transform: ["scale(0.8)", "scale(1)"] // Slightly adjusted for better UI fit
            },
            {
                direction: "alternate",
                duration: 800,
                iterations: Infinity
            }
        );
    }
}


initUniverse();

// get Total
function getTotal() {
    if (price.value != '') {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '0';
        total.style.background = "var(--accent)";
    }
}

// create Product
let dataPro;
if (localStorage.Product != null) {
    dataPro = JSON.parse(localStorage.Product);
} else {
    dataPro = [];
}

create.onclick = () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newPro.count < 100) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = "create";
            searchBlock.style.display = "grid";
            create.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }

    localStorage.setItem('Product', JSON.stringify(dataPro));
    showData();
};

// Clear Inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "0";
    count.value = "";
    category.value = "";
    total.style.background = "var(--accent)";
}

// Read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
     <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})">Update</button></td>
      <td><button onclick="openDeleteModal('single', ${i})" id="dalate">Delete</button></td>
     </tr>
    `;
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
     <button onclick="openDeleteModal('all')">Delete All (${dataPro.length})</button>
    `;
    } else {
        btnDelete.innerHTML = '';
    }
}

// Delete Logic with Modal
function openDeleteModal(type, i = null) {
    deleteType = type;
    deleteIndex = i;
    deleteModal.style.display = "flex";
    
    if (type === 'all') {
        deleteMessage.innerHTML = "Are you sure you want to delete ALL products?";
    } else {
        deleteMessage.innerHTML = `Are you sure you want to delete "${dataPro[i].title}"?`;
    }
}

function closeModal() {
    deleteModal.style.display = "none";
}

confirmDeleteBtn.onclick = () => {
    if (deleteType === "single") {
        dataPro.splice(deleteIndex, 1);
    } else if (deleteType === "all") {
        dataPro.splice(0);
        localStorage.clear();
    }
    localStorage.Product = JSON.stringify(dataPro);
    closeModal();
    showData();
};

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == deleteModal) {
        closeModal();
    }
};

// Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();

    count.style.display = "none";
    create.innerHTML = "Update";
    searchBlock.style.display = "none";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// Search
let searchMood = "title";

function GetSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'search-Title') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood.charAt(0).toUpperCase() + searchMood.slice(1);
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    let val = value.toLowerCase();
    
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i][searchMood].includes(val)) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="openDeleteModal('single', ${i})" id="dalate">Delete</button></td>
            </tr>
            `;
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

showData();
