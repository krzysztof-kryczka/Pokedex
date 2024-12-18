# Front-End pokedex

### Komponent Pokedex (główny punkt Strony tzw. HOME)

Umożliwia użytkownikom przeglądanie listy Pokémonów, wyszukiwanie Pokémonów oraz nawigację.

Niektóre elementy z API:

-  useFetchPokemons: Hook do pobierania listy Pokémonów z API.
-  pokemons: Lista Pokémonów z kontekstu.
-  searchTerm: Aktualne hasło wyszukiwania.
-  filteredPokemons: Lista Pokémonów przefiltrowanych na podstawie hasła wyszukiwania.
-  handlePageChange: Funkcja do obsługi zmiany strony.
-  usePokemon: Niestandardowy hook do uzyskiwania dostępu do kontekstu Pokémonów.
-  Pagination: Komponent do nawigacji po stronach listy Pokémonów.
-  PokemonList: Komponent do wyświetlania listy Pokémonów.
-  PokemonSearch: Komponent do wyszukiwania Pokémonów.
-  useEffect: Filtruje listę Pokémonów na podstawie hasła wyszukiwania przy każdej zmianie hasła lub listy Pokémonów.

### Komponent PokemonDetails

Umożliwia użytkownikom przeglądanie szczegółowych informacji o Pokémonach, dodawanie ich do ulubionych oraz zarządzanie ich obecnością na arenie.

Niektóre elementy z API:

-  addPokemonToArena: Funkcja do dodawania Pokémona na arenę.
-  removePokemonFromArena: Funkcja do usuwania Pokémona z areny.
-  pokemonDetails: Szczegóły wybranego Pokémona.
-  isFavorite: Flaga wskazująca, czy Pokémon jest w ulubionych.
-  toggleFavorite: Funkcja do dodawania lub usuwania Pokémona z ulubionych.
-  inArena: Flaga wskazująca, czy Pokémon jest na arenie (wewnętrzny stan komponentu).
-  handleToggleFavorite: Obsługuje dodawanie i usuwanie Pokémona z ulubionych.
-  handleToggleArena: Obsługuje dodawanie i usuwanie Pokémona z areny.
-  useEffect: Synchronizuje stan ulubionych Pokémonów i obecność na arenie przy każdej zmianie danych Pokémona, ulubionych lub areny. Ustawia komunikaty błędów, jeśli dane nie są dostępne.

### Komponent RankingPage

Umożliwia użytkownikom przeglądanie listy Pokémonów, sortowanie według różnych kryteriów oraz nawigację po stronach rankingu.

Niektóre elementy z API:

-  sortCriteria: Aktualne kryterium sortowania.
-  setSortCriteria: Ustawianie kryterium sortowania.
-  sortOrder: Aktualny porządek sortowania (rosnąco/malejąco).
-  setSortOrder: Ustawianie porządku sortowania.
-  sortedPokemons: Lista posortowanych Pokémonów.
-  handleSortChange: Funkcja do obsługi zmiany kryterium sortowania.
-  handleOrderChange: Funkcja do obsługi zmiany porządku sortowania.
-  useEffect: Filtruje i sortuje listę Pokémonów na podstawie wybranych kryteriów i porządku sortowania przy każdej zmianie kryterium, porządku, bieżącej strony lub listy Pokémonów.

### Komponent ArenaPage

Zapewnia funkcjonalność do wyświetlania Pokémonów na arenie, usuwania ich z areny oraz symulowania walk między nimi.

Niektóre elementy z API:

-  getArena: Pobiera aktualny stan areny.
-  removePokemonFromArena: Usuwa Pokémona z areny.
-  updatePokemon: Aktualizuje dane Pokémona po walce.
-  BattleButton: Komponent przycisku do rozpoczęcia walki.
-  BattleResultModal: Komponent modalny do wyświetlania wyników walki.
-  fetchArenaData: Pobiera dane areny z API i aktualizuje kontekst.
-  handleBattle: Symuluje walkę między dwoma Pokémonami na arenie i odpowiednio aktualizuje ich statystyki.
-  handleLeaveArena: Usuwa wszystkie Pokémony z areny i resetuje stan.

### Komponent FavoritesPage

Pozwala użytkownikom na przeglądanie i zarządzanie ich ulubionymi Pokémonami w dynamiczny sposób, usuwanie Pokémonów z listy ulubionych oraz nawigację po liście (domyślnie wyświetla się po 15 Pokémonów na stronie.) Każdy użytkownik ma swoją własną listę ulubionych Pokémonów.

Niektóre elementy API:

-  fetchFavorites: Funkcja do pobierania listy ulubionych Pokémonów.
-  toggleFavorite: Funkcja do dodawania lub usuwania Pokémona z listy ulubionych.
-  user: Obiekt zawierający dane zalogowanego użytkownika.
-  favoriteDetails: Lista ulubionych Pokémonów.
-  handleRemoveFavorite: Obsługuje usuwanie Pokémona z listy ulubionych i aktualizuje stan jeśli klikniemy na serce.
-  handleCardClick: Obsługuje kliknięcie na kartę Pokémona, nawigując do strony szczegółów Pokémona.
-  useEffect: Synchronizuje stan strony przy zmianie listy ulubionych Pokémonów i automatycznie zmienia stronę, jeśli obecna strona jest pusta.

### Komponent CreatePokemonPage i EditPage

CreatePokemonPage: Umożliwia użytkownikom wprowadzanie danych nowego Pokémona, wybór sprita oraz zapisanie tych informacji.
EditPage:
Umożliwia użytkownikom edycję danych istniejących już Pokémonów, edycję Pokémonów z zewnętrznego api i zapis ich jako lokalnych a także nawigację po liście.

Niektóre elementy wspólne API:

-  savePokemon: Funkcja do zapisywania nowego Pokémona.
-  getUsedSprites: Funkcja do pobierania listy używanych spritów.
-  methods: Metody zarządzania formularzem z react-hook-form.
-  spriteIndex: Indeks bieżącego sprita.
-  navigate: Funkcja nawigacji z react-router-dom.
-  savePokemon: Funkcja do zapisywania nowego Pokémona.
-  usedSprites: Lista używanych spritów.
-  zodResolver: Resolver z @hookform/resolvers dla walidacji - schematu z użyciem zod.
-  createPokemonSchema: Schemat walidacji dla tworzenia Pokémona.
-  PokemonForm: Komponent formularza do wprowadzania danych Pokémona.
-  useManagePokemon: Niestandardowy hook do zarządzania stanem tworzenia Pokémona.
-  handleSpriteNavigation: Zarządza nawigacją pomiędzy spritami, umożliwiając użytkownikowi wybór innego sprita.
-  ispriteUsed: Sprawdza, czy dany sprite jest już używany.
-  useEffect - Używany do ustawienia początkowego sprita dla nowego Pokémona.
-  handleEditClick: Zarządza wyborem Pokémona do edycji i przewija do formularza edycji.
-  handlePageChange: Zarządza zmianą strony listy Pokémonów i resetuje wybór Pokémona do edycji.

### Komponenty LoginPage i RegisterPage

Umożliwiają użytkownikom logowanie się do systemu oraz rejestrowanie nowych kont.

Niektóre elementy API:

-  login: Funkcja do logowania użytkownika.
-  register: Funkcja do rejestrowania nowego użytkownika.

Zależności:

-  useForm: Hook z react-hook-form do zarządzania formularzami.
-  zodResolver: Resolver z @hookform/resolvers dla walidacji schematu z użyciem zod.
-  useAuth: Niestandardowy hook do zarządzania autoryzacją użytkownika.
-  useSnackbar: Hook z notistack do wyświetlania powiadomień.

Inne:

-  handleLogin: Obsługuje logowanie użytkownika za pomocą API i aktualizuje stan autoryzacji.
-  handleRegister: Obsługuje rejestrowanie nowego użytkownika za pomocą API i aktualizuje stan autoryzacji.
