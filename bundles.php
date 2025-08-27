<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>METAL ASSAULT - GIGA SLAVE</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet" href="style.css?v=4.2">

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
</head>

<body data-page="bundles" class="text-white min-h-screen">
    <!-- NAV -->
    <nav
        class="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-md p-4 border-b border-gray-600 z-50">
        <div class="container mx-auto">
            <!-- Mobile -->
            <div id="mobile-menu" class="hidden mt-4 space-y-2">
                <a href="default.php" data-nav="weapons"
                    class="w-full px-4 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">WEAPONS</a>
                <a href="bundles.php" data-nav="bundles"
                    class="w-full px-4 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">BUNDLES</a>
            </div>
            <!-- Desktop -->
            <div class="hidden md:flex justify-between items-center">
                <div class="text-center md:text-left">
                    <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
                        class="inline-block hover:opacity-80 transition-opacity">
                        <img src="src/imagens/logo.png?v=4.2" alt="Metal Assault - Giga Slave"
                            class="h-12 w-auto mx-auto md:mx-0"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="hidden">
                            <h3 class="text-lg font-bold text-blue-400">⚔️ Metal Assault</h3>
                        </div>
                    </a>
                </div>
                <div class="flex justify-center space-x-6">
                    <a href="default.php" data-nav="weapons"
                        class="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">WEAPONS</a>
                    <a href="bundles.php" data-nav="bundles"
                        class="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">BUNDLES</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 pt-24 pb-10">
        <h1 class="text-2xl font-bold text-blue-400 mb-6">Bundles & Pets</h1>

        <div class="mb-6 p-4 military-card rounded-xl">
            <h2 class="text-xl font-bold text-blue-400 mb-4 text-center">BUNDLE CATEGORIES</h2>
            <div class="flex justify-center gap-3">
                <button id="bundles-tab-inner" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">🧰
                    BUNDLES</button>
                <button id="pets-tab-inner" class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">🐾
                    PETS</button>
            </div>
        </div>

        <section id="bundles-section" class="space-y-6">
            <div id="bundles-compare-wrapper" class="military-card rounded-xl">
                <div id="bundles-compare-head"
                    class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer">
                    <h3 class="font-bold text-blue-400 text-sm">Bundle Comparator</h3><span
                        class="chev text-lg">▾</span>
                </div>
                <div id="bundles-compare-content" class="hidden p-3">
                    <div class="grid md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <label class="text-xs text-gray-300">Bundle 1</label>
                            <select id="bundle1-select"
                                class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                                <option value="" selected disabled>Select Bundle</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs text-gray-300">Bundle 2</label>
                            <select id="bundle2-select"
                                class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                                <option value="" selected disabled>Select Bundle</option>
                            </select>
                        </div>
                    </div>
                    <div id="bundles-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
                </div>
            </div>
            <h3 class="text-xl font-bold text-blue-400">Available Bundles</h3>
            <div id="bundles-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </section>

        <section id="pets-section" class="space-y-6 hidden">
            <div id="pets-compare-wrapper" class="military-card rounded-xl">
                <div id="pets-compare-head"
                    class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer">
                    <h3 class="font-bold text-blue-400 text-sm">Pet Comparator</h3><span class="chev text-lg">▾</span>
                </div>
                <div id="pets-compare-content" class="hidden p-3">
                    <div class="grid md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <label class="text-xs text-gray-300">Pet 1</label>
                            <select id="pet1-select"
                                class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                                <option value="" selected disabled>Select Pet</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs text-gray-300">Pet 2</label>
                            <select id="pet2-select"
                                class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                                <option value="" selected disabled>Select Pet</option>
                            </select>
                        </div>
                    </div>
                    <div id="pets-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
                </div>
            </div>
            <h3 class="text-xl font-bold text-blue-400">Available Pets</h3>
            <div id="pets-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </section>

        <section id="category-container" class="space-y-6"></section>
    </div>

    <!-- FOOTER -->
    <footer class="bg-gray-900 border-t border-gray-600">
        <div class="container mx-auto p-6">
            <div class="grid md:grid-cols-3 gap-6 items-center">
                <div class="text-center md:text-left">
                    <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
                        class="inline-block hover:opacity-80 transition-opacity">
                        <img src="src/imagens/logo.png?v=4.2" alt="Metal Assault - Giga Slave"
                            class="h-16 w-auto mx-auto md:mx-0"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="hidden">
                            <h3 class="text-lg font-bold text-blue-400">⚔️ Metal Assault</h3>
                        </div>
                    </a>
                </div>
                <div class="text-center">
                    <h4 class="text-sm font-bold text-blue-400 mb-3">🔗 OFFICIAL LINKS</h4>
                    <div class="space-y-2">
                        <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
                            class="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all">🎮
                            Play on Steam</a>
                        <a href="https://metalassault.cn/" target="_blank"
                            class="block px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-bold transition-all">🌐
                            Official Website</a>
                    </div>
                </div>
                <div class="text-center md:text-right">
                    <h4 class="text-sm font-bold text-blue-400 mb-3">⚔️ TACTICAL INFO</h4>
                    <div class="text-xs text-gray-400 space-y-1">
                        <p>Complete Weapon Database</p>
                        <p>Upgrade Calculator</p>
                        <p>Drop Guide & More</p>
                        <p class="text-yellow-400 font-bold mt-2">Giga Slave Edition</p>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-6 pt-4 text-center">
                <p class="text-xs text-gray-500">
                    Metal Assault Tactical Arsenal • Made for the community •
                    <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
                        class="text-blue-400 hover:text-blue-300">Get the game on Steam</a>
                </p>
            </div>
        </div>
    </footer>

    <!-- DATA (apenas Bundles/Pets) -->
    <script src="bundles.js?v=4.2" defer></script>
    <script src="pets.js?v=4.2" defer></script>

    <!-- LÓGICA COMPARTILHADA -->
    <script src="utils.js?v=4.2" defer></script>
    <script src="compair.js?v=4.2" defer></script>

    <script src="bundles-page.js?v=4.2" defer></script>
</body>

</html>