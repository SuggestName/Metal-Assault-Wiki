# Estrutura Refatorada (Front-end)

```
/css/main.css
/js/app.js
/js/lib/ui-utils.js
/js/ui/collapse.js
/js/ui/nav.js
/js/data/datasets.js
/js/features/weapons/engine.js
/js/features/bundles/engine.js
/js/pages/weapons.page.js
/js/pages/bundles.page.js
```

## Como usar (sem bundler)
Inclua no HTML/PHP principal, **nesta ordem**:

```html
<link rel="stylesheet" href="css/main.css">
<script type="module" src="js/app.js"></script>
```

> Todos os módulos necessários são importados a partir de `app.js`. As funções globais usadas pelo HTML inline (ex.: `showSection`, `showWeaponType`, `toggleCollapse`, `setRankingPreset`, etc.) continuam expostas em `window` para compatibilidade.

### Dados
As variáveis globais `rifles`, `snipers`, `bazookas`, `pistols`, `shotguns`, `shields`, `bundles` e `pets` devem continuar disponíveis como antes (carregadas pelos seus arquivos atuais).

### Identidade visual
Mantida: classes Tailwind estão preservadas e o CSS original foi consolidado em `css/main.css`.

### Colapsáveis e modal de imagem
Agora existe **uma** implementação de `toggleCollapse` e modal de zoom reutilizável. O botão fechar da modal possui z-index elevado para evitar sobreposição.

### Navegação
- Topo: `showSection('weapons'|'bundles'|'dropguide')`
- Subtabs de armas: `showWeaponType('rifles'|'snipers'|'bazookas'|'pistols'|'shotguns'|'shields')`

### Limpeza
- Arquivos antigos sugeridos para aposentadoria/renome:
  - `scripts.js` → `js/app.js`
  - `compair.js` → `js/features/weapons/engine.js`
  - `bundles-page.js` → `js/pages/bundles.page.js` + `js/features/bundles/engine.js`
  - `utils.js` → `js/lib/ui-utils.js`
  - `style.css` → `css/main.css`
