<?php // default.php ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weapon Analyzer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/main.css?v=5.1">
</head>
<body class="flex flex-col min-h-screen text-gray-200 bg-gray-900">

  <!-- TOP NAV -->
  <header class="bg-gray-800 border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="w-full flex items-center gap-3">
        <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
          class="inline-block hover:opacity-80 transition-opacity">
          <img src="imagens/logo.png?v=5.1" alt="Metal Assault - Giga Slave"
              class="h-10 w-auto"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        </a>

        <!-- Botão hambúrguer alinhado à direita -->
        <button class="sm:hidden px-3 py-1 rounded bg-gray-700 ml-auto" onclick="toggleMobileMenu()">☰</button>
      </div>

      <!-- Navegação desktop -->
      <nav class="hidden sm:flex items-center gap-2">
        <button id="weapons-tab"   onclick="showSection('weapons')"  class="px-6 py-2 whitespace-nowrap rounded bg-blue-600 text-white font-semibold">Weapons</button>
        <button id="bundles-tab"   onclick="showSection('bundles')"  class="px-6 py-2 whitespace-nowrap rounded bg-gray-600 text-gray-300 font-semibold">Bundles</button>
        <button id="dropguide-tab" onclick="showSection('dropguide')" class="px-6 py-2 whitespace-nowrap rounded bg-gray-600 text-gray-300 font-semibold">Drop Guide</button>
      </nav>
    </div>

    <!-- NAV MOBILE -->
    <div id="mobile-menu" class="sm:hidden hidden px-6 pb-3">
      <div class="flex flex-col gap-2">
        <button id="weapons-tab-desktop"   onclick="showSection('weapons')"  class="px-6 py-2 whitespace-nowrap rounded bg-blue-600 text-white font-semibold">Weapons</button>
        <button id="bundles-tab-desktop"   onclick="showSection('bundles')"  class="px-6 py-2 whitespace-nowrap rounded bg-gray-600 text-gray-300 font-semibold">Bundles</button>
        <button id="dropguide-tab-desktop" onclick="showSection('dropguide')" class="px-6 py-2 whitespace-nowrap rounded bg-gray-600 text-gray-300 font-semibold">Drop Guide</button>
      </div>
    </div>
  </header>

  <!-- CONTEÚDO -->
  <main class="flex-1 max-w-7xl mx-auto px-4 py-6">
    <h1 id="page-title" class="sr-only">Weapon Analyzer</h1>
    <div id="category-container"></div>
  </main>

  <!-- FOOTER -->
  <footer class="bg-gray-900 border-t border-gray-600">
    <div class="container mx-auto p-6">
      <div class="grid md:grid-cols-3 gap-6 items-center">
        <div class="text-center md:text-left">
          <a href="https://store.steampowered.com/app/3628370/GigaSlave/" target="_blank"
             class="inline-block hover:opacity-80 transition-opacity">
            <img src="imagens/logo.png?v=5.1" alt="Metal Assault - Giga Slave"
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

  <!-- DATASETS (globais) -->
  <script src="data/rifles.js?v=5.1"></script>
  <script src="data/snipers.js?v=5.1"></script>
  <script src="data/bazookas.js?v=5.1"></script>
  <script src="data/pistols.js?v=5.1"></script>
  <script src="data/shotguns.js?v=5.1"></script>
  <script src="data/shields.js?v=5.1"></script>
  <script src="data/bundles.js?v=5.1"></script>
  <script src="data/pets.js?v=5.1"></script>
  <script src="data/wings.js?v=5.1"></script>

  <!-- APP -->
  <script type="module" src="js/app.js?v=5.1"></script>
</body>
</html>
