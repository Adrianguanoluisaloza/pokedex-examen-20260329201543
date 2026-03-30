const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=8';

const listElement = document.getElementById('pokemon-list');
const detailElement = document.getElementById('pokemon-detail');
const statusElement = document.getElementById('status');
const prevButton = document.getElementById('btn-prev');
const nextButton = document.getElementById('btn-next');

const state = {
    currentUrl: API_URL,
    previousUrl: null,
    nextUrl: null,
    activePokemonUrl: null
};

const toTitleCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const fetchOptions = {
    cache: 'no-store'
};

const setStatus = (message) => {
    statusElement.textContent = message;
};

const setButtons = () => {
    prevButton.disabled = !state.previousUrl;
    nextButton.disabled = !state.nextUrl;
};

const clearActiveItems = () => {
    const activeButtons = listElement.querySelectorAll('.pokemon-item.active');
    activeButtons.forEach((button) => button.classList.remove('active'));
};

const showDetail = (pokemon) => {
    detailElement.className = 'detail-card';
    detailElement.textContent = '';

    const detailTop = document.createElement('div');
    detailTop.className = 'detail-top';

    const image = document.createElement('img');
    image.src = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '';
    image.alt = `Imagen de ${pokemon.name}`;

    const titleBox = document.createElement('div');
    const name = document.createElement('p');
    name.className = 'detail-name';
    name.textContent = pokemon.name;

    const number = document.createElement('p');
    number.textContent = `N.° ${pokemon.id}`;

    titleBox.append(name, number);
    detailTop.append(image, titleBox);

    const meta = document.createElement('div');
    meta.className = 'meta';

    const heightBox = document.createElement('div');
    heightBox.className = 'meta-box';
    const heightTitle = document.createElement('strong');
    heightTitle.textContent = 'Altura';
    const heightValue = document.createElement('span');
    heightValue.textContent = `${pokemon.height / 10} m`;
    heightBox.append(heightTitle, heightValue);

    const weightBox = document.createElement('div');
    weightBox.className = 'meta-box';
    const weightTitle = document.createElement('strong');
    weightTitle.textContent = 'Peso';
    const weightValue = document.createElement('span');
    weightValue.textContent = `${pokemon.weight / 10} kg`;
    weightBox.append(weightTitle, weightValue);

    const expBox = document.createElement('div');
    expBox.className = 'meta-box';
    const expTitle = document.createElement('strong');
    expTitle.textContent = 'Experiencia base';
    const expValue = document.createElement('span');
    expValue.textContent = String(pokemon.base_experience || 'N/D');
    expBox.append(expTitle, expValue);

    const abilitiesBox = document.createElement('div');
    abilitiesBox.className = 'meta-box';
    const abilitiesTitle = document.createElement('strong');
    abilitiesTitle.textContent = 'Habilidades';
    const abilitiesValue = document.createElement('span');
    abilitiesValue.textContent = pokemon.abilities.map((item) => toTitleCase(item.ability.name)).join(', ');
    abilitiesBox.append(abilitiesTitle, abilitiesValue);

    const speciesBox = document.createElement('div');
    speciesBox.className = 'meta-box';
    const speciesTitle = document.createElement('strong');
    speciesTitle.textContent = 'Especie';
    const speciesValue = document.createElement('span');
    speciesValue.textContent = toTitleCase(pokemon.species?.name || 'N/D');
    speciesBox.append(speciesTitle, speciesValue);

    const movesBox = document.createElement('div');
    movesBox.className = 'meta-box';
    const movesTitle = document.createElement('strong');
    movesTitle.textContent = 'Movimientos';
    const movesValue = document.createElement('span');
    movesValue.textContent = String((pokemon.moves || []).length);
    movesBox.append(movesTitle, movesValue);

    meta.append(heightBox, weightBox, expBox, abilitiesBox, speciesBox, movesBox);

    const chips = document.createElement('div');
    chips.className = 'chips';
    pokemon.types.forEach((item) => {
        const chip = document.createElement('span');
        chip.className = `chip type-${item.type.name}`;
        chip.textContent = item.type.name;
        chips.appendChild(chip);
    });

    const cryUrl = pokemon.cries?.latest || pokemon.cries?.legacy || '';
    const mediaRow = document.createElement('div');
    mediaRow.className = 'media-row';
    if (cryUrl) {
        const cryButton = document.createElement('button');
        cryButton.type = 'button';
        cryButton.className = 'btn btn-cry';
        cryButton.textContent = 'Reproducir cry';
        cryButton.addEventListener('click', () => {
            const audio = new Audio(cryUrl);
            audio.play().catch((error) => console.error(error));
        });
        mediaRow.appendChild(cryButton);
    }

    const statsSection = document.createElement('section');
    statsSection.className = 'stats';
    const statsTitle = document.createElement('h3');
    statsTitle.textContent = 'Stats base';
    statsSection.appendChild(statsTitle);

    (pokemon.stats || []).forEach((item) => {
        const row = document.createElement('div');
        row.className = 'stat-row';

        const label = document.createElement('span');
        label.className = 'stat-label';
        label.textContent = item.stat.name;

        const value = document.createElement('span');
        value.className = 'stat-value';
        value.textContent = String(item.base_stat);

        const bar = document.createElement('div');
        bar.className = 'stat-bar';
        const fill = document.createElement('div');
        fill.className = 'stat-fill';
        const normalized = Math.max(4, Math.min(item.base_stat, 180));
        fill.style.width = `${(normalized / 180) * 100}%`;
        bar.appendChild(fill);

        row.append(label, value, bar);
        statsSection.appendChild(row);
    });

    detailElement.append(detailTop, meta, chips, mediaRow, statsSection);
};

const handlePokemonClick = async (event) => {
    const button = event.currentTarget;
    const detailUrl = button.dataset.url;

    clearActiveItems();
    button.classList.add('active');
    setStatus('Cargando detalle...');

    try {
        const response = await fetch(detailUrl, fetchOptions);
        if (!response.ok) {
            throw new Error('No se pudo cargar el detalle del pokemon.');
        }

        const pokemon = await response.json();
        state.activePokemonUrl = detailUrl;
        showDetail(pokemon);
        setStatus('Detalle cargado correctamente.');
    } catch (error) {
        setStatus('Error al cargar el detalle. Intenta nuevamente.');
        detailElement.className = 'detail-empty';
        detailElement.textContent = 'No se pudo cargar el detalle del Pokémon seleccionado.';
        console.error(error);
    }
};

const renderList = (pokemons) => {
    listElement.textContent = '';

    pokemons.forEach((pokemon) => {
        const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'pokemon-item';
        button.dataset.url = pokemon.url;
        button.addEventListener('click', handlePokemonClick);

        const left = document.createElement('div');
        left.className = 'pokemon-item-left';

        const idTag = document.createElement('small');
        idTag.className = 'pokemon-id';
        idTag.textContent = `#${String(pokemonId).padStart(4, '0')}`;

        const label = document.createElement('span');
        label.textContent = pokemon.name;
        left.append(idTag, label);

        const hint = document.createElement('small');
        hint.className = 'pokemon-action';
        hint.textContent = 'Ver detalle';

        button.append(left, hint);
        item.appendChild(button);
        listElement.appendChild(item);
    });
};

const loadPokemons = async (url = API_URL) => {
    setStatus('Cargando lista de Pokémon...');

    try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de pokemon.');
        }

        const data = await response.json();
        state.currentUrl = url;
        state.previousUrl = data.previous;
        state.nextUrl = data.next;
        setButtons();
        renderList(data.results || []);

        if ((data.results || []).length > 0) {
            setStatus('Selecciona un Pokémon para ver el detalle.');
        } else {
            setStatus('No hay resultados para mostrar.');
        }

        detailElement.className = 'detail-empty';
        detailElement.textContent = 'Selecciona un Pokémon de la lista para ver su detalle.';
    } catch (error) {
        setStatus('Error al cargar la lista de Pokémon.');
        listElement.textContent = '';
        detailElement.className = 'detail-empty';
        detailElement.textContent = 'No hay detalle disponible porque falló la carga de datos.';
        console.error(error);
    }
};

prevButton.addEventListener('click', () => {
    if (state.previousUrl) {
        loadPokemons(state.previousUrl);
    }
});

nextButton.addEventListener('click', () => {
    if (state.nextUrl) {
        loadPokemons(state.nextUrl);
    }
});

loadPokemons();
