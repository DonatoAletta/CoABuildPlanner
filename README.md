# CoA Insignia Builder

This project creates a simple web page with a compact, dark-mode layout of insignia slots on the left and right, and a statistics section that updates based on assigned "Insignias."

## How to Run

1.  **Save the files:** Ensure you have `index.html`, `style.css`, and `app.js` in the same directory. Create an `images` directory in the same location.
2.  **Add Insignia Images:** Place your insignia images (e.g., `strength.png`, `intelligence.png`, `agility.png`, `cryo.png`, `physique.png`, `void_bladematron.png`) into the `images` directory. Ensure the filenames match those referenced in `app.js`.
3.  **Open `index.html`:** Open the `index.html` file in your web browser. You can do this by double-clicking the file or by right-clicking and choosing "Open with" your preferred browser.

## Functionality

*   **Dark Mode & Compact Layout:** The website now features a dark mode theme and a more compact arrangement of elements, with larger insignia slots.
*   **Insignia Slot-Specific Selection:** When a slot is clicked, the insignia selection modal will only display insignias compatible with that specific slot.
*   **Categorized Insignia List:** The insignia selection modal now organizes insignias into "Legendary" (Yellow), "Epic" (Pink/Red), and "Rare" (Purple) categories, each with a corresponding colored square.
*   **Attack Type Display:** A new "Attack Type" section displays the current elemental attack type (e.g., "Umbro") and a corresponding colored circle, based on equipped insignias that grant "Gain \[Element] Attack" effects.
*   **New Loadout:** The "+ New Loadout" button, located to the left of the insignia slots and colored blue, clears all assigned insignias, resetting the page to a blank slate.
*   **Share Loadout:** The "Share" button, located below "New Loadout" and colored green, generates a unique URL that encodes your current insignia setup. This URL is copied to your clipboard, allowing you to share your build. Opening this URL will automatically load the shared loadout.
*   **Insignia Selection:** Choose an insignia from the list. The selected insignia's image and name will appear within the slot, with the slot name displayed at the top of the square.
*   **Insignia Levels:** Each insignia can have 3 levels. Once an insignia is added, use the '-' and '+' buttons to adjust its level (minimum 1, maximum 3). The buttons will dynamically appear/disappear based on the current level. The attribute boosts will scale with the insignia level.
*   **Insignia Restrictions:** Some insignias may have restrictions on which slots they can be placed in. Restricted insignias will appear disabled in the selection modal.
*   **Scrolling Insignia List:** The insignia selection modal is now a smaller, centered box and supports scrolling if there are many insignias.

## Project Structure

*   `index.html`: The main HTML file that structures the web page, including the insignia slots and the insignia selection modal.
*   `style.css`: Contains the CSS rules to style the compact dark-mode layout, insignia slots (with names on top), modal, insignia images, and level controls.
*   `app.js`: Contains JavaScript code to:
    *   Define insignia data (including `id`, `name`, `imageUrl`, `effects`, and `restrictions`).
    *   Handle insignia slot clicks to open the insignia selection.
    *   Dynamically populate the insignia selection list, disabling restricted insignias.
    *   Assign insignias to slots, update their visual representation (image, level).
    *   Manage insignia levels (1-3) and update attribute calculations accordingly.
    *   Calculate and display the combined attribute effects.
*   `images/`: Directory to store insignia image files.

## How to Add/Modify/Remove Insignias

To manage insignias, edit the `insignias` array in `app.js`:

*   **Adding an Insignia:** Add a new object to the `insignias` array with a unique `id`, `name`, `imageUrl` (path to your image in the `images` folder), `levels` (an array of three objects, each mapping attribute names to their boost values for levels 1, 2, and 3), and `restrictions` (an array of square names where the insignia *can* be placed. An empty array means no restrictions).
    ```javascript
    { id: 'new-insignia', name: 'New Insignia Name', imageUrl: 'images/new_insignia.png', levels: [{ Strength: 10, "%HP": 5 }, { Strength: 20, "%HP": 10 }, { Strength: 30, "%HP": 15 }], restrictions: ['Helmet', 'Gloves'] }
    ```
*   **Modifying an Insignia:** Find the insignia object by its `id` and change its `name`, `imageUrl`, `levels`, or `restrictions` properties.
*   **Removing an Insignia:** Delete the insignia object from the `insignias` array.
