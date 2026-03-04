# CROUDS - Product Management System

![Project Preview](image/Croud.png) <!-- Update this path if you have a screenshot -->

A robust, animated, and responsive Product Management System (CRUD) built with pure HTML, CSS, and JavaScript. This application allows you to easily manage product inventroy with an interactive user interface, complete with a universe background animation and smooth transitions.

## 🚀 Features

- **Create:** Add new products with automatically calculated total prices (Price + Taxes + Ads - Discount).
- **Read:** View all added products in a neatly organized, responsive table.
- **Update:** Edit existing product details with a stylish confirmation modal.
- **Delete:** Remove single or all products easily. Includes a safety confirmation modal to prevent accidental deletions.
- **Search:** Quickly find products by Title or Category in real-time.
- **Local Storage:** Data persists across browser reloads using HTML5 `localStorage`.
- **Dynamic UI:** Includes custom animations like the background universe stars and pulsing totals.
- **Bulk Create:** Create multiple instances of the same product at once using the `Count` input.

## 🛠️ Technologies Used

- **HTML5:** Semantic structure and layout.
- **CSS3:** Custom styling, variables (`var()`), transitions, and modal designs. Uses Google Fonts (Inter & Outfit).
- **JavaScript (ES6):** DOM manipulation, local storage management, search algorithms, and custom background animations.

## 📂 File Structure

```text
├── index.html       # The main entry point and structural layout
├── style.css        # The styling and animations
├── js.js            # The application logic (CRUD operations, Animations)
├── image/           # Contains project images/icons (e.g., Croud.png)
└── README.md        # This file
```

## 💻 How to Use

1. Clone or download this repository to your local machine.
2. Open the `index.html` file in any modern web browser.
3. **Adding a Product**: Enter the product's title, price details, count (if more than 1), and category, then click "Create".
4. **Updating a Product**: Click the "Update" button next to a product in the table. The form will populate with the product's data. Make your changes and click "Update" again.
5. **Deleting a Product**: Click the "Delete" button. A modal will ask for confirmation before permanently removing the item.
6. **Searching**: Type in the search bar and choose whether to search by Title or Category.

## 🎨 Future Enhancements (Optional)

- Add export to PDF/Excel functionality.
- Implement categories filter dropdowns.
- Add pagination for large amounts of data.

---

_Developed with ❤️ as a Product Management Tool._
