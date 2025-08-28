console.log('Happy developing ✨');

document.addEventListener('DOMContentLoaded', () => {
    const patchNotesContent = `
        <p><strong>August 26, 2025:</strong></p>
        <ul>
            <li>Added Tarina Insignia ( Nexum Shop ).</li>
        </ul>

        <p><strong>August 24, 2025:</strong></p>
        <ul>
            <li>Fixed Skill DMG not being shown in the attributes correctly.</li>
        </ul>
    `;

    const patchNotesBox = document.getElementById('patch-notes-content');
    if (patchNotesBox) {
        console.log('Patch notes box found, inserting content.');
        patchNotesBox.innerHTML = patchNotesContent;
    } else {
        console.log('Patch notes box not found!');
    }
});
