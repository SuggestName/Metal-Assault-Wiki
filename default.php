<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>METAL ASSAULT - GIGA SLAVE</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet" href="style.css?v=4.3">

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
</head>

<body data-page="weapons" class="text-white min-h-screen">
    <!-- NAV -->
    <nav class="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-md p-4 border-b border-gray-600 z-50">
        <div class="container mx-auto">
            <!-- Mobile -->
            <div id="mobile-menu" class="hidden mt-4 space-y-2">
                <a href="default.php" data-nav="weapons"
                    class="w-full px-4 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">⚔️ WEAPONS</a>
                <a href="bundles.php" data-nav="bundles"
                    class="w-full px-4 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">📦 BUNDLES</a>
            </div>
            <!-- Desktop -->
            <div class="hidden md:flex justify-between items-center">
                <div class="text-center md:text-left">
                    <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
                        class="inline-block hover:opacity-80 transition-opacity">
                        <img src="src/imagens/logo.png?v=4.3" alt="Metal Assault - Giga Slave"
                            class="h-12 w-auto mx-auto md:mx-0"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="hidden">
                            <h3 class="text-lg font-bold text-blue-400">⚔️ Metal Assault</h3>
                        </div>
                    </a>
                </div>
                <div class="flex justify-center space-x-6">
                    <a href="default.php" data-nav="weapons"
                        class="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">⚔️ WEAPONS</a>
                    <a href="bundles.php" data-nav="bundles"
                        class="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">📦 BUNDLES</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 pt-24 pb-10">
        <h1 id="page-title" class="text-2xl font-bold text-blue-400 mb-6">Weapon Analyzer</h1>

        <!-- CATEGORY SUBMENU (somente Weapons) -->
        <div id="weapons-submenu" class="mb-6 p-4 military-card rounded-xl">
            <h2 class="text-xl font-bold text-blue-400 mb-4 text-center">WEAPON CATEGORIES</h2>
            <!-- Mobile -->
            <div class="block md:hidden">
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="showWeaponType('rifles')" id="rifles-subtab"
                        class="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">RIFLES</button>
                    <button onclick="showWeaponType('snipers')" id="snipers-subtab"
                        class="px-3 py-2 bg-gray-600 text-gray-300 rounded-lg text-xs font-bold">SNIPERS</button>
                    <button onclick="showWeaponType('pistols')" id="pistols-subtab"
                        class="px-3 py-2 bg-gray-600 text-gray-300 rounded-lg text-xs font-bold">PISTOLS</button>
                    <button onclick="showWeaponType('shotguns')" id="shotguns-subtab"
                        class="px-3 py-2 bg-gray-600 text-gray-300 rounded-lg text-xs font-bold">SHOTGUNS</button>
                    <button onclick="showWeaponType('bazookas')" id="bazookas-subtab"
                        class="px-3 py-2 bg-gray-600 text-gray-300 rounded-lg text-xs font-bold">BAZOOKAS</button>
                    <button onclick="showWeaponType('shields')" id="shields-subtab"
                        class="px-3 py-2 bg-gray-600 text-gray-300 rounded-lg text-xs font-bold">SHIELDS</button>
                </div>
            </div>
            <!-- Desktop -->
            <div class="hidden md:flex justify-center space-x-3">
                <button onclick="showWeaponType('rifles')" id="rifles-subtab-desktop"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">RIFLES</button>
                <button onclick="showWeaponType('snipers')" id="snipers-subtab-desktop"
                    class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">SNIPERS</button>
                <button onclick="showWeaponType('pistols')" id="pistols-subtab-desktop"
                    class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">PISTOLS</button>
                <button onclick="showWeaponType('shotguns')" id="shotguns-subtab-desktop"
                    class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">SHOTGUNS</button>
                <button onclick="showWeaponType('bazookas')" id="bazookas-subtab-desktop"
                    class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">BAZOOKAS</button>
                <button onclick="showWeaponType('shields')" id="shields-subtab-desktop"
                    class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">SHIELDS</button>
            </div>
        </div>

        <!-- DYNAMIC CONTAINER -->
        <section id="category-container" class="space-y-6"></section>
    </div>

    <!-- FOOTER -->
    <footer class="bg-gray-900 border-t border-gray-600">
        <div class="container mx-auto p-6">
            <div class="grid md:grid-cols-3 gap-6 items-center">
                <div class="text-center md:text-left">
                    <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
                        class="inline-block hover:opacity-80 transition-opacity">
                        <img src="src/imagens/logo.png?v=4.3" alt="Metal Assault - Giga Slave"
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

    <!-- DATA -->
    <script src="rifles.js?v=4.3" defer></script>
    <script src="snipers.js?v=4.3" defer></script>
    <script src="bazookas.js?v=4.3" defer></script>
    <script src="pistols.js?v=4.3" defer></script>
    <script src="shotguns.js?v=4.3" defer></script>
    <script src="shields.js?v=4.3" defer></script>

    <!-- LOGIC -->
    <script src="utils.js?v=4.3"></script>
    <script src="compair.js?v=4.3"></script>
    <script src="scripts.js?v=4.3"></script>
</body>

</html>