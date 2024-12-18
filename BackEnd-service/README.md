# Back-End pokedex

Ten folder zawiera serwer do zarządzania Pokémonami.

### Przykładowy Model danych

```json
- db.json
{
  "users": [
    {
      "name": "Test",
      "email": "test@123test068.com",
      "password": "W3CaziJuVhJ7erQ?",
      "id": 1
    },
  ],
  "pokemons": [
    {
      "id": 6,
      "name": "charizard",
      "weight": 907,
      "height": 18,
      "base_experience": 297,
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
      "abilities": [
        {
          "ability": {
            "name": "blaze",
            "url": "https://pokeapi.co/api/v2/ability/66/"
          },
          "is_hidden": false,
          "slot": 1
        },
        {
          "ability": {
            "name": "solar-power",
            "url": "https://pokeapi.co/api/v2/ability/94/"
          },
          "is_hidden": true,
          "slot": 3
        }
      ],
      "losses": 1,
      "wins":5
    },
  ],
  "favorites": [
    {
      "pokemonId": 150,
      "userId": [
        1,2,8
      ],
      "id": 150
    },
  ],
   "arena": [
    {
      "id": 153
    },
    {
      "id": 166
    }
  ]
  }
```
