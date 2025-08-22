document.addEventListener('DOMContentLoaded', () => {
    const leftSquaresContainer = document.querySelector('.left-squares');
    const rightSquaresContainer = document.querySelector('.right-squares');
    const insigniaSelectionModal = document.getElementById('insigniaSelectionModal');
    const closeButton = document.querySelector('.close-button');
    const insigniaListDiv = document.getElementById('insigniaList');

    let selectedSquare = null;

    const insignias = [
        { id: 'void-bladematron', name: 'Void Bladematron Insignia', imageUrl: 'images/void_bladematron.png', levels: [{ "Skill DMG": 3.0, "BATK DMG": 3.0, "HP": 3.0 }, { "Skill DMG": 5.0, "BATK DMG": 5.0, "HP": 5.0 }, { "Skill DMG": 7.0, "BATK DMG": 7.0, "HP": 7.0 }], restrictions: ['Chestplate', 'Shoes'], rarity: 'Legendary' },
        { id: 'void-sovereign', name: 'Void Sovereign Insignia', imageUrl: 'images/void_sovereign.png', levels: [{ "DMG to Bosses": 3.0, "DMG to Otherworld": 3.0}, { "DMG to Bosses": 4.5, "DMG to Otherworld": 4.5}, { "DMG to Bosses": 6.0, "DMG to Otherworld": 6.0}], restrictions: ['Weapon'], rarity: 'Legendary' },
        { id: 'witch', name: 'Witch Insignia', imageUrl: 'images/witch.png', levels: [{ "Gain Umbro Attack": 1, "Umbro ENH": 6 }, { "Gain Umbro Attack": 1, "Umbro ENH": 12 }, { "Gain Umbro Attack": 1, "Umbro ENH": 18 }], restrictions: ['Weapon'], rarity: 'Legendary' },
        { id: 'chimera', name: 'Chimera Insignia', imageUrl: 'images/chimera.png', levels: [{ "Gain Cryo Attack": 1, "Cryo ENH": 6 }, { "Gain Cryo Attack": 1, "Cryo ENH": 12 }, { "Gain Cryo Attack": 1, "Cryo ENH": 18 }], restrictions: ['Weapon'], rarity: 'Legendary' },
        { id: 'krag', name: 'Krag Insignia', imageUrl: 'images/krag.png', levels: [{ "Gain Pyro Attack": 1, "Pyro ENH": 6 }, { "Gain Pyro Attack": 1, "Pyro ENH": 12 }, { "Gain Pyro Attack": 1, "Pyro ENH": 18 }], restrictions: ['Weapon'], rarity: 'Legendary' },
        { id: 'mechanical-core', name: 'Mechanical Core Insignia', imageUrl: 'images/mechanical_core.png', levels: [{ "Gain Electro Attack": 1, "Electro ENH": 6 }, { "Gain Electro Attack": 1, "Electro ENH": 12 }, { "Gain Electro Attack": 1, "Electro ENH": 18 }], restrictions: ['Weapon'], rarity: 'Legendary' },
        { id: 'barbena', name: 'Barbena Insignia', imageUrl: 'images/barbena.png', levels: [{ "PATK": 5, "MATK": 5 }, { "PATK": 7.5, "MATK": 7.5 }, { "PATK": 10, "MATK": 10 }], restrictions: ['Weapon'], rarity: 'Legendary' },
        { id: 'hexchess-guard', name: 'HexChess Guard Insignia', imageUrl: 'images/hexchess-guard.png', levels: [{ "PCrit": 2, "MCrit": 2, "Crit DMG":5 }, { "PCrit": 3, "MCrit": 3, "Crit DMG":7.5 }, { "PCrit": 4, "MCrit": 4, "Crit DMG":10 }], restrictions: ['Helmet', 'Gloves'], rarity: 'Legendary' },
        { id: 'leotids-guard', name: 'Leotids Insignia', imageUrl: 'images/leotids.png', levels: [{ "Skill DMG": 4,"ASPD": 20 }, { "Skill DMG": 6,"ASPD": 30 },{ "Skill DMG": 8,"ASPD": 40 }], restrictions: ['Chestplate', 'Gloves'], rarity: 'Legendary' },
        { id: 'ophelia', name: 'Ophelia Insignia', imageUrl: 'images/ophelia.png', levels: [{ "All Attributes ENH": 10,"CD Rate": 20 }, { "All Attributes ENH": 15,"CD Rate": 30 },{ "All Attributes ENH": 20,"CD Rate": 40 }], restrictions: ['Chestplate', 'Gloves'], rarity: 'Legendary' },
        { id: 'claudius', name: 'Claudius Insignia', imageUrl: 'images/claudius.png', levels: [{ "Crit DMG": 10},{ "Crit DMG": 15},{ "Crit DMG": 20} ], restrictions: ['Helmet', 'Chestplate'], rarity: 'Legendary' },
        { id: 'meradia', name: 'Meradia Insignia', imageUrl: 'images/meradia.png', levels: [{ "DMG Bonus": 4, "DMG RES": 4},{ "DMG Bonus": 6, "DMG RES": 6},{ "DMG Bonus": 8, "DMG RES": 8} ], restrictions: ['Gloves', 'Shoes'], rarity: 'Legendary' }
    ];

    // Attributes that should not display a percentage sign
    const attributesWithoutPercentage = [
        'Strength', 'Intelligence', 'Agility', 'Spirit', 'Physique',
        'ASPD', 'CD Rate',
        'Cryo ENH', 'Cryo RES', 'Pyro ENH', 'Pyro RES', 'Electro ENH', 'Electro RES', 'Umbro ENH', 'Umbro RES',
        'HP', 'PATK', 'MATK', 'PDEF', 'MDEF',
        'DMG to Bosses',
        'All Attributes ENH', // Add All Attributes ENH to not display percentage
        'All Attributes RES' // Add All Attributes RES to not display percentage
    ];

    // Initial attributes (can be set to base values)
    const attributes = {
        Strength: 0,
        Intelligence: 0,
        Agility: 0,
        Spirit: 0,
        Physique: 0,
        "HP": 0,
        "PATK": 0,
        "MATK": 0,
        "PDEF": 0,
        "MDEF": 0,
        PCrit: 0,
        MCrit: 0,
        "Crit DMG": 0,
        ASPD: 0,
        "CD Rate": 0,
        "Cryo ENH": 0,
        "Cryo RES": 0,
        "Pyro ENH": 0,
        "Pyro RES": 0,
        "Electro ENH": 0,
        "Electro RES": 0,
        "Umbro ENH": 0,
        "Umbro RES": 0,
        "DMG Bonus": 0,
        "DMG RES": 0,
        "BATK DMG": 0,
        "Skill DMG": 0,
        "Resonance Recharge": 0,
        "DMG during Resonance": 0,
        "Shield Break Efficiency": 0,
        "DMG After Shield Break": 0,
        "DMG to Otherworld": 0,
        "DMG to Slowed": 0,
        "DMG to Exhausted": 0,
        "DMG to Scorched": 0,
        "DMG to Bosses": 0, // Initializing DMG to Bosses
        "All Attributes ENH": 0,
        "All Attributes RES": 0,
        "Attack Type": 'None',
        // Ensure all attributes are initialized here
    };

    const assignedInsignias = {}; // Stores which insignia is assigned to which square and its level

    function updateAttributeDisplay() {
        const attributeCategories = {
            "Primary Attributes": ['Strength', 'Intelligence', 'Agility', 'Spirit', 'Physique'],
            "Basic": ['HP', 'PATK', 'MATK', 'PDEF', 'MDEF', 'PCrit', 'MCrit', 'Crit DMG', 'ASPD', 'CD Rate'],
            "Element": ['Cryo ENH', 'Cryo RES', 'Pyro ENH', 'Pyro RES', 'Electro ENH', 'Electro RES', 'Umbro ENH', 'Umbro RES'],
            "Advanced": ['DMG Bonus', 'DMG RES', 'BATK DMG', 'Skill DMG', 'Resonance Recharge', 'DMG during Resonance', 'Shield Break Efficiency', 'DMG After Shield Break', 'DMG to Otherworld', 'DMG to Slowed', 'DMG to Exhausted', 'DMG to Scorched', 'DMG to Bosses']
        };

        const attributeHeaders = document.querySelectorAll('.statistics-section h3');

        attributeHeaders.forEach(header => {
            const categoryName = header.textContent.replace(':', '').trim();
            const ul = header.nextElementSibling;
            if (ul && attributeCategories[categoryName]) {
                ul.innerHTML = ''; // Clear existing list items
                attributeCategories[categoryName].forEach(attr => {
                    const li = document.createElement('li');
                    if (attributesWithoutPercentage.includes(attr)) {
                        li.textContent = `${attr}: ${attributes[attr]}`;
                    } else {
                        li.textContent = `${attr}: ${attributes[attr]}%`;
                    }
                    ul.appendChild(li);
                });
            } else if (categoryName === "Attack Type") {
                const attackTypeNameSpan = document.getElementById('attackTypeName');
                const attackTypeColorSpan = document.getElementById('attackTypeColor');

                attackTypeNameSpan.textContent = attributes['Attack Type'];
                attackTypeColorSpan.className = 'attack-type-color'; // Reset classes

                if (attributes['Attack Type'] !== 'None') {
                    attackTypeColorSpan.classList.add(`color-${attributes['Attack Type'].toLowerCase()}`);
                }
            }
        });
    }

    function applyInsigniaEffects() {
        // Reset attributes to base before applying effects
        for (const attr in attributes) {
            if (attr === "Attack Type") {
                attributes[attr] = 'None'; // Reset attack type separately
            } else {
                attributes[attr] = 0; // Or initial base value if not 0
            }
        }

        let allElementalDamage = 0;
        let allElementalRes = 0;

        for (const squareId in assignedInsignias) {
            const { insigniaId, level } = assignedInsignias[squareId];
            const insignia = insignias.find(i => i.id === insigniaId);
            if (insignia) {
                const levelEffects = insignia.levels[level - 1]; // Use level - 1 to get the correct effect object
                for (const effect in levelEffects) {
                    if (effect === "All Attributes ENH") {
                        allElementalDamage += levelEffects[effect];
                    } else if (effect === "All Attributes RES") {
                        allElementalRes += levelEffects[effect];
                    } else if (effect.startsWith("Gain") && effect.endsWith("Attack")) {
                        const attackElement = effect.split(' ')[1]; // e.g., "Umbro"
                        attributes['Attack Type'] = attackElement;
                    } else {
                        attributes[effect] += levelEffects[effect];
                    }
                }
            }
        }

        // Apply all elemental damage and resistance
        const elementalDamageAttributes = ['Cryo ENH', 'Pyro ENH', 'Electro ENH', 'Umbro ENH'];
        elementalDamageAttributes.forEach(attr => {
            attributes[attr] += allElementalDamage;
        });

        const elementalResAttributes = ['Cryo RES', 'Pyro RES', 'Electro RES', 'Umbro RES'];
        elementalResAttributes.forEach(attr => {
            attributes[attr] += allElementalRes;
        });

        updateAttributeDisplay();
    }

    function openInsigniaSelection(square) {
        selectedSquare = square;
        const squareName = selectedSquare.dataset.squareName;

        // Clear previous insignias from categories
        document.querySelectorAll('.category-insignias').forEach(container => {
            container.innerHTML = '';
        });

        insignias.forEach(insignia => {
            const isRestricted = insignia.restrictions.length > 0 && !insignia.restrictions.includes(squareName);
            
            // Only show insignias that are not restricted for the current square
            if (!isRestricted) {
                const insigniaItem = document.createElement('div');
                insigniaItem.classList.add('insignia-item');
                insigniaItem.dataset.insigniaId = insignia.id;

                insigniaItem.innerHTML = `<img src="${insignia.imageUrl}" alt="${insignia.name}">` +
                                       `<div><strong>${insignia.name}</strong><br><br>` +
                                       Object.entries(insignia.levels[0]).map(([attr, value]) => {
                                           if (attr.startsWith("Gain")) {
                                               return `${attr}`;
                                           } else if (attributesWithoutPercentage.includes(attr)) {
                                               return `${attr}: +${value}`;
                                           } else {
                                               return `${attr}: +${value}%`;
                                           }
                                       }).join('<br>') +
                                       (insignia.restrictions.length > 0 ? `<br><br>Socket: ${insignia.restrictions.join(', ')}` : '') +
                                       `</div>`;
                
                insigniaItem.addEventListener('click', () => {
                    assignInsigniaToSquare(insignia.id);
                    insigniaSelectionModal.classList.remove('active'); // Use class for hiding
                });

                // Append to the correct category
                const categoryContainer = document.querySelector(`#${insignia.rarity.toLowerCase()}Insignias .category-insignias`);
                if (categoryContainer) {
                    categoryContainer.appendChild(insigniaItem);
                }
            }
        });
        insigniaSelectionModal.classList.add('active'); // Use class for showing
    }

    function assignInsigniaToSquare(insigniaId) {
        if (selectedSquare) {
            const squareId = selectedSquare.dataset.squareId;
            const existingLevel = (assignedInsignias[squareId] && assignedInsignias[squareId].insigniaId === insigniaId) ? assignedInsignias[squareId].level : 1;
            assignedInsignias[squareId] = { insigniaId: insigniaId, level: existingLevel };

            const insignia = insignias.find(i => i.id === insigniaId);

            const insigniaImage = selectedSquare.querySelector('.insignia-image');
            const insigniaNameSpan = selectedSquare.querySelector('.insignia-name');

            if (insignia) {
                insigniaImage.src = insignia.imageUrl;
                insigniaImage.style.display = 'block';
                if (insigniaNameSpan) { // Check if insigniaNameSpan exists
                    insigniaNameSpan.textContent = insignia.name; // Display insignia name
                }

                const levelControls = selectedSquare.querySelector('.insignia-level-controls');
                const levelDisplay = selectedSquare.querySelector('.level-display');
                levelDisplay.textContent = existingLevel;
                levelControls.style.display = 'flex';

                const levelDownButton = selectedSquare.querySelector('.level-down');
                const levelUpButton = selectedSquare.querySelector('.level-up');

                // Function to update button visibility
                const updateLevelButtonVisibility = (currentLevel) => {
                    levelDownButton.style.display = (currentLevel === 1) ? 'none' : 'flex';
                    levelUpButton.style.display = (currentLevel === 3) ? 'none' : 'flex';
                };

                updateLevelButtonVisibility(existingLevel);

                levelDownButton.onclick = (e) => {
                    e.stopPropagation(); // Prevent square click
                    let currentLevel = parseInt(levelDisplay.textContent);
                    if (currentLevel > 1) {
                        currentLevel--;
                        levelDisplay.textContent = currentLevel;
                        assignedInsignias[squareId].level = currentLevel;
                        applyInsigniaEffects();
                        updateLevelButtonVisibility(currentLevel);
                    }
                };

                levelUpButton.onclick = (e) => {
                    e.stopPropagation(); // Prevent square click
                    let currentLevel = parseInt(levelDisplay.textContent);
                    if (currentLevel < 3) {
                        currentLevel++;
                        levelDisplay.textContent = currentLevel;
                        assignedInsignias[squareId].level = currentLevel;
                        applyInsigniaEffects();
                        updateLevelButtonVisibility(currentLevel);
                    }
                };

            } else {
                insigniaImage.src = '';
                insigniaImage.style.display = 'none';
                if (insigniaNameSpan) { // Check if insigniaNameSpan exists
                    insigniaNameSpan.textContent = ''; // Clear insignia name
                }
                selectedSquare.querySelector('.insignia-level-controls').style.display = 'none';
            }
            selectedSquare.classList.add('selected');
            applyInsigniaEffects();
        }
    }

    // Add click listeners to squares
    const allSquares = document.querySelectorAll('.squares-section .square');
    allSquares.forEach(square => {
        // The square-slot-name is now part of the HTML structure, no need to dynamically add

        square.addEventListener('click', () => openInsigniaSelection(square));
        // Initialize square display if an insignia is already assigned
        const squareId = square.dataset.squareId;
        if (assignedInsignias[squareId]) {
            const { insigniaId, level } = assignedInsignias[squareId];
            const insignia = insignias.find(i => i.id === insigniaId);
            if (insignia) {
                const insigniaImage = square.querySelector('.insignia-image');
                const insigniaNameSpan = square.querySelector('.insignia-name');
                insigniaImage.src = insignia.imageUrl;
                insigniaImage.style.display = 'block';
                if (insigniaNameSpan) { // Check if insigniaNameSpan exists
                    insigniaNameSpan.textContent = insignia.name; // Display insignia name
                }

                const levelControls = square.querySelector('.insignia-level-controls');
                const levelDisplay = square.querySelector('.level-display');
                levelDisplay.textContent = level;
                levelControls.style.display = 'flex';

                const levelDownButton = square.querySelector('.level-down');
                const levelUpButton = square.querySelector('.level-up');

                // Function to update button visibility
                const updateLevelButtonVisibility = (currentLevel) => {
                    levelDownButton.style.display = (currentLevel === 1) ? 'none' : 'flex';
                    levelUpButton.style.display = (currentLevel === 3) ? 'none' : 'flex';
                };

                updateLevelButtonVisibility(level);

                levelDownButton.onclick = (e) => {
                    e.stopPropagation();
                    let currentLevel = parseInt(levelDisplay.textContent);
                    if (currentLevel > 1) {
                        currentLevel--;
                        levelDisplay.textContent = currentLevel;
                        assignedInsignias[squareId].level = currentLevel;
                        applyInsigniaEffects();
                        updateLevelButtonVisibility(currentLevel);
                    }
                };

                levelUpButton.onclick = (e) => {
                    e.stopPropagation();
                    let currentLevel = parseInt(levelDisplay.textContent);
                    if (currentLevel < 3) {
                        currentLevel++;
                        levelDisplay.textContent = currentLevel;
                        assignedInsignias[squareId].level = currentLevel;
                        applyInsigniaEffects();
                        updateLevelButtonVisibility(currentLevel);
                    }
                };
            }
        }
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        insigniaSelectionModal.classList.remove('active'); // Use class for hiding
    });

    window.addEventListener('click', (event) => {
        if (event.target == insigniaSelectionModal) {
            insigniaSelectionModal.classList.remove('active'); // Use class for hiding
        }
    });

    // Check for loadout in URL on initial page load
    const urlParams = new URLSearchParams(window.location.search);
    const loadoutParam = urlParams.get('loadout');
    if (loadoutParam) {
        try {
            const decodedLoadout = JSON.parse(decodeURIComponent(loadoutParam));
            for (const squareId in decodedLoadout) {
                if (decodedLoadout.hasOwnProperty(squareId)) {
                    const { insigniaId, level } = decodedLoadout[squareId];
                    assignedInsignias[squareId] = { insigniaId: insigniaId, level: level };

                    // Update the UI for the loaded insignia
                    const square = document.querySelector(`[data-square-id="${squareId}"]`);
                    if (square) {
                        const insignia = insignias.find(i => i.id === insigniaId);
                        if (insignia) {
                            const insigniaImage = square.querySelector('.insignia-image');
                            const insigniaNameSpan = square.querySelector('.insignia-name');
                            const levelControls = square.querySelector('.insignia-level-controls');
                            const levelDisplay = square.querySelector('.level-display');
                            const levelDownButton = square.querySelector('.level-down');
                            const levelUpButton = square.querySelector('.level-up');

                            insigniaImage.src = insignia.imageUrl;
                            insigniaImage.style.display = 'block';
                            if (insigniaNameSpan) {
                                insigniaNameSpan.textContent = insignia.name;
                            }
                            square.classList.add('selected');
                            levelDisplay.textContent = level;
                            levelControls.style.display = 'flex';

                            const updateLevelButtonVisibility = (currentLevel) => {
                                levelDownButton.style.display = (currentLevel === 1) ? 'none' : 'flex';
                                levelUpButton.style.display = (currentLevel === 3) ? 'none' : 'flex';
                            };
                            updateLevelButtonVisibility(level);

                            levelDownButton.onclick = (e) => {
                                e.stopPropagation();
                                let currentLevel = parseInt(levelDisplay.textContent);
                                if (currentLevel > 1) {
                                    currentLevel--;
                                    levelDisplay.textContent = currentLevel;
                                    assignedInsignias[squareId].level = currentLevel;
                                    applyInsigniaEffects();
                                    updateLevelButtonVisibility(currentLevel);
                                }
                            };

                            levelUpButton.onclick = (e) => {
                                e.stopPropagation();
                                let currentLevel = parseInt(levelDisplay.textContent);
                                if (currentLevel < 3) {
                                    currentLevel++;
                                    levelDisplay.textContent = currentLevel;
                                    assignedInsignias[squareId].level = currentLevel;
                                    applyInsigniaEffects();
                                    updateLevelButtonVisibility(currentLevel);
                                }
                            };
                        }
                    }
                }
            }
            applyInsigniaEffects(); // Apply effects after loading all insignias
        } catch (e) {
            console.error('Error parsing loadout from URL:', e);
        }
    } else {
        // Initial display of attributes if no loadout in URL
        applyInsigniaEffects();
    }

    const newLoadoutButton = document.getElementById('newLoadoutButton');
    newLoadoutButton.addEventListener('click', () => {
        // Clear assigned insignias
        for (const squareId in assignedInsignias) {
            delete assignedInsignias[squareId];
        }

        // Reset square displays
        allSquares.forEach(square => {
            square.classList.remove('selected');
            const insigniaImage = square.querySelector('.insignia-image');
            const insigniaNameSpan = square.querySelector('.insignia-name');
            const levelControls = square.querySelector('.insignia-level-controls');
            const levelDisplay = square.querySelector('.level-display');
            const levelDownButton = square.querySelector('.level-down');
            const levelUpButton = square.querySelector('.level-up');

            insigniaImage.src = '';
            insigniaImage.style.display = 'none';
            if (insigniaNameSpan) {
                insigniaNameSpan.textContent = '';
            }
            levelControls.style.display = 'none';
            levelDisplay.textContent = '1'; // Reset level display
            levelDownButton.style.display = 'none'; // Hide buttons
            levelUpButton.style.display = 'none'; // Hide buttons
        });

        // Recalculate and update attributes
        applyInsigniaEffects();
    });

    const shareButton = document.getElementById('shareButton');
    shareButton.addEventListener('click', () => {
        const encodedLoadout = encodeURIComponent(JSON.stringify(assignedInsignias));
        const shareUrl = `${window.location.origin}${window.location.pathname}?loadout=${encodedLoadout}`;

        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Loadout URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            alert('Failed to copy URL. Please copy manually: ' + shareUrl);
        });
    });
});
