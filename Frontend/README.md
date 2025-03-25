# Lee esto virgo

Primero, gracias chatgpt🤖 por escribir esto.

## Instalación y ejecución

1. **Instalar dependencias:**  
   ```sh
   pnpm i
2. **Ejecutar el proyecto:**
    ```sh
    npm run dev
## ``Map`` Component
Este componente renderiza un mapa interactivo con opciones configurables.

**Props disponibles:**
- ``position``: Define la posición inicial del mapa.
*Valor por defecto*: `[20, 0]`

- ``zoom``: Nivel de zoom inicial.
*Valor por defecto*: `1.5`

- ``scroll``: Permite hacer zoom con el scroll del mouse.
*Valor por defecto*: `true`

### Ejemplo de estructura de `<Map/>`
```jsx
<Map position={null} zoom={null} scroll={null} />
```

## `const markers`

Dentro del componente, existe una constante llamada `markers`, que contiene la información de los marcadores en el mapa.

Es un **array de objetos**, donde cada marcador tiene las siguientes propiedades:

- `position`: Coordenadas [lat, long] de la ubicación del marcador.

- `popUp`: Objeto que contiene:

    - `img`: URL de la imagen a mostrar en el popup.

    - `description`: Texto descriptivo del popup.

### Ejemplo de estructura de `markers`:
```js
const markers = [
{
    position: [51.505, -0.09],
    popUp: {
        img: "https://example.com/image.jpg",
        description: "Este es un marcador de ejemplo."
    }
}
];
```

# Por hacer

- ~~Arreglar los `customsIcon`~~
- Personalizar los `popups`