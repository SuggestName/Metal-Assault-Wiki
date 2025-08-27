## 🇧🇷 PT-BR

### Visão Geral
Interface estática para explorar, comparar e ranquear armas, bundles e pets do **Metal Assault – Giga Slave**. O projeto oferece filtros rápidos, presets de ranking, comparação lado a lado com upgrades e um modo de zoom nas imagens.

### Recursos
- **Categorias de armas**: rifles, snipers, pistols, shotguns, bazookas e shields.
- **Ranking por perfil**: sliders (0–100) definem um “alvo” (target) de atributos. Os valores são normalizados (min–max) e pontuados por distância ao alvo (0–100).
- **Tratamento especial para shields**: os sliders “Accuracy” e “Bullet Speed” mapeiam para **Explosion Defense** e **Defense** (com rótulos atualizados).
- **Comparador 2×**: selecione dois itens e aplique upgrades (+0 a +15) em atributos específicos; opção de “master upgrade” para aplicar o mesmo incremento a todos os atributos upgradáveis.
- **Busca e filtros**: por nome, preço máximo e “Permanent” (quando aplicável).
- **Bundles & Pets**: grade com cards, efeitos normalizados (1 Set, 2 Set, …), comparador 2×, e tabela de stats por modo (Battle/Mission/Co‑op) para pets.
- **Zoom de imagem**: clique para ampliar em modal com bloqueio de scroll enquanto aberto.
- **Estilo**: Tailwind via CDN, fonte Orbitron e tema escuro com gradiente.

### Estrutura do Projeto
```
.
├─ default.php        # Página “Weapons” (nav, submenu de categorias e container dinâmico)
├─ bundles.php        # Página “Bundles & Pets” (tabs internas, comparadores e grades)
├─ style.css          # Estilos adicionais (Orbitron, background, cards, ícone chevron)
├─ scripts.js         # Renderização de página de armas, presets e collapse genérico
├─ compair.js         # Lógica central: ranking, normalização, comparação, bundles & pets
├─ utils.js           # Card de itens, modal de zoom, destaque de navegação, helpers
├─ bundles.js         # Base de dados dos bundles (nome, preço, partes, efeitos, imagens)
└─ src/imagens/...    # Imagens usadas nos cards (armas, bundles, pets, logos)
```

### Como Executar Localmente
**Opção A — Servidor embutido do PHP**
```bash
# na raiz do projeto
php -S 127.0.0.1:5173
# abra no navegador:
# http://127.0.0.1:5173/default.php   (Weapons)
# http://127.0.0.1:5173/bundles.php   (Bundles & Pets)
```

**Opção B — Qualquer servidor estático (ex.: VS Code Live Server)**
- Sirva a pasta do projeto e acesse `default.php` / `bundles.php` pelo navegador.
- As páginas usam apenas HTML+JS+CSS (PHP é apenas a extensão do arquivo).

### Como Usar
1. **Navegação**: use o topo (WEAPONS/BUNDLES) e, em Weapons, o submenu por categoria.
2. **Ranking** (Weapons): ajuste os sliders/presets; a grade é reordenada por “Match” (0–100).
3. **Comparação**: escolha item 1 e 2; use `+/-` nos atributos ou o “master upgrade” para simular níveis.
4. **Busca/Filtros**: digite parte do nome, limite o preço e/ou marque “Permanent” (quando existir).
5. **Bundles & Pets**: troque entre as tabs internas; use o comparador para ver efeitos/stats lado a lado.
6. **Zoom**: clique na imagem do card para abrir o modal (ESC ou clique fora para fechar).

### Personalização
- **Presets**: edite/adicione em `setRankingPreset(...)`.
- **Regras de ranking**: ajuste `rankStats`, normalização min–max e função de score/ordenação.
- **Dados**: adicione novos itens/efeitos expandindo os arrays (ex.: `bundles` em `bundles.js`).

### Requisitos
- Navegador moderno.
- **Opcional**: PHP 8+ para a Opção A (servidor embutido).

### Licença
Defina a licença conforme a sua necessidade (ex.: MIT).

---

## 🇺🇸 EN

### Overview
A static interface to explore, compare, and rank **Metal Assault – Giga Slave** weapons, bundles, and pets. It offers fast filters, ranking presets, side‑by‑side comparison with upgrades, and an image zoom modal.

### Features
- **Weapon categories**: rifles, snipers, pistols, shotguns, bazookas, and shields.
- **Profile‑based ranking**: sliders (0–100) define a target vector. Values are min‑max normalized and scored by distance to the target (0–100).
- **Shields special handling**: “Accuracy” and “Bullet Speed” sliders map to **Explosion Defense** and **Defense** (with updated labels).
- **2× comparator**: select two items and apply upgrades (+0 to +15) on specific stats; a master upgrade applies the same increment to all upgradable stats.
- **Search & filters**: by name, max price, and “Permanent” (when applicable).
- **Bundles & Pets**: grid of cards, normalized effects (1 Set, 2 Set, …), 2× comparator, and per‑mode (Battle/Mission/Co‑op) stats table for pets.
- **Image zoom**: click to open a modal, with body scroll locked while open.
- **Styling**: Tailwind CDN, Orbitron font, and a dark gradient theme.

### Project Structure
```
.
├─ default.php        # “Weapons” page (nav, categories submenu, dynamic container)
├─ bundles.php        # “Bundles & Pets” page (inner tabs, comparators, grids)
├─ style.css          # Extra styles (Orbitron, background, cards, chevron icon)
├─ scripts.js         # Weapons page rendering, presets, generic collapse
├─ compair.js         # Core logic: ranking, normalization, compare, bundles & pets
├─ utils.js           # Item cards, zoom modal, nav highlighting, helpers
├─ bundles.js         # Bundles dataset (name, price, parts, effects, images)
└─ src/imagens/...    # Images used by cards (weapons, bundles, pets, logos)
```

### Run Locally
**Option A — PHP built‑in server**
```bash
# at the project root
php -S 127.0.0.1:5173
# then open in your browser:
# http://127.0.0.1:5173/default.php   (Weapons)
# http://127.0.0.1:5173/bundles.php   (Bundles & Pets)
```

**Option B — Any static server (e.g., VS Code Live Server)**
- Serve the project folder and open `default.php` / `bundles.php` in your browser.
- Pages are pure HTML+JS+CSS (PHP is just the file extension).

### How to Use
1. **Navigation**: use the top (WEAPONS/BUNDLES) and, on Weapons, the categories submenu.
2. **Ranking** (Weapons): adjust sliders/presets; the grid is re‑ordered by “Match” (0–100).
3. **Compare**: pick item #1 and #2; use `+/-` per stat or the master upgrade to simulate levels.
4. **Search/Filters**: type part of the name, set max price, and/or require “Permanent” (when provided).
5. **Bundles & Pets**: switch inner tabs; use the comparator to see effects/stats side by side.
6. **Zoom**: click a card image to open the modal (ESC or outside click to close).

### Customization
- **Presets**: edit/add in `setRankingPreset(...)`.
- **Ranking rules**: tweak `rankStats`, min–max normalization, and scoring/sorting functions.
- **Data**: add new items/effects by extending arrays (e.g., `bundles` in `bundles.js`).

### Requirements
- Modern browser.
- **Optional**: PHP 8+ for Option A (built‑in server).

### License
Choose a license that fits your needs (e.g., MIT).
