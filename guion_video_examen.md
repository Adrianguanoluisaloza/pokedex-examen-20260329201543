# Guion Video Examen - Programacion V (Maximo 3 minutos)

## Objetivo del video
Demostrar que tu proyecto cumple con:
- Consumo de API.
- Lista de items.
- Navegacion Next y Previous.
- Detalle al hacer clic.
- Explicacion clara del codigo y funcionamiento.

## Duracion sugerida
- 0:00 a 0:20 - Presentacion.
- 0:20 a 1:30 - Explicacion del codigo.
- 1:30 a 2:40 - Demostracion funcional.
- 2:40 a 3:00 - Cierre.

## Guion hablado (listo para leer)

### 0:00 a 0:20 - Presentacion
Hola, mi nombre es [TU NOMBRE COMPLETO].
Este es mi proyecto final de consumo de API para Programacion V.
La API utilizada es PokeAPI y la aplicacion fue desarrollada con HTML, CSS y JavaScript puro, sin frameworks de JavaScript.

### 0:20 a 1:30 - Explicacion del desarrollo y codigo
La estructura del proyecto tiene tres archivos principales:
- index.html: contiene la estructura de la interfaz.
- styles.css: define los estilos visuales y el diseno responsive.
- pokemon.js: contiene toda la logica de consumo de API y renderizado.

En JavaScript, primero declaro la URL inicial de la API con un limite de resultados por pagina.
Luego obtengo referencias del DOM para la lista, el panel de detalle, el estado y los botones Next y Previous.

Despues implemento una funcion para cargar los Pokemon con fetch.
Esta funcion:
1. Hace la peticion a la API.
2. Convierte la respuesta a JSON.
3. Guarda las URLs previous y next para la navegacion.
4. Renderiza la lista de Pokemon en pantalla.

Tambien agregue eventos para los botones Next y Previous.
Cada boton llama nuevamente a la funcion de carga con la URL correspondiente de la paginacion.

Para el detalle, cada item de la lista tiene un evento click.
Al seleccionar un Pokemon, hago una segunda peticion a su URL de detalle y muestro informacion ampliada como:
- Nombre.
- Numero.
- Imagen oficial.
- Altura y peso.
- Experiencia base.
- Habilidades y tipos.

### 1:30 a 2:40 - Demostracion funcional
Ahora voy a demostrar la aplicacion.

Primero, se carga correctamente la lista de Pokemon desde la API.
Segundo, al presionar Next, avanza a la siguiente pagina.
Tercero, al presionar Previous, regresa a la pagina anterior.
Cuarto, al hacer clic en cualquier Pokemon, aparece su detalle ampliado en el panel derecho.

Con esto se evidencia el consumo de API, la navegacion y el detalle por item, que son los requisitos principales del examen.

### 2:40 a 3:00 - Cierre
En conclusion, el proyecto cumple con los requerimientos tecnicos solicitados:
consumo de API, visualizacion de lista, navegacion y detalle.
Muchas gracias.

## Que lineas de codigo mostrar en el video

### 1) Estructura HTML (20 a 30 segundos)
Muestra en index.html:
- Lineas 18 a 30: contenedor principal, estado y lista de Pokemon.
- Lineas 23 y 24: botones Previous y Next.
- Lineas 32 a 36: panel de detalle donde se renderiza la informacion ampliada.
- Linea 40: carga del archivo pokemon.js.

Frase sugerida:
Aqui esta la estructura base: la lista, los botones de navegacion y el panel de detalle, todo enlazado con pokemon.js.

### 2) Conexion a la API y estado (20 a 25 segundos)
Muestra en pokemon.js:
- Linea 1: URL de la API.
- Lineas 9 a 14: objeto state para controlar paginacion.
- Lineas 22 a 25: habilitar y deshabilitar botones segun previous y next.

Frase sugerida:
En estas lineas defino la API y el estado global para guardar la pagina actual y las URLs de navegacion.

### 3) Carga de lista con fetch (30 a 40 segundos)
Muestra en pokemon.js:
- Lineas 152 a 166: funcion principal loadPokemons con fetch y parseo JSON.
- Lineas 163 a 165: captura de previous y next.
- Linea 166: render de resultados.

Frase sugerida:
Esta funcion consume la API, guarda la paginacion y luego renderiza la lista en pantalla.

### 4) Renderizado de items (25 a 30 segundos)
Muestra en pokemon.js:
- Lineas 129 a 149: renderList, creacion de botones por cada Pokemon y evento click.

Frase sugerida:
Aqui se crea cada item de la lista dinamicamente y se asigna su evento para abrir detalle.

### 5) Detalle al hacer clic (35 a 45 segundos)
Muestra en pokemon.js:
- Lineas 103 a 127: handlePokemonClick, segunda peticion para detalle.
- Lineas 32 a 101: showDetail, donde se dibuja imagen, nombre, tipo, habilidades, altura y peso.

Frase sugerida:
Cuando hago clic en un Pokemon, uso su URL de detalle, consulto la API y muestro los datos ampliados en el panel derecho.

### 6) Navegacion Next y Previous (20 a 25 segundos)
Muestra en pokemon.js:
- Lineas 185 a 195: eventos click de Previous y Next.

Frase sugerida:
Estos listeners cambian la URL de consulta y recargan la lista con la pagina anterior o siguiente.

### 7) Arranque de la app (5 segundos)
Muestra en pokemon.js:
- Linea 197: ejecucion inicial loadPokemons().

Frase sugerida:
Con esta linea se inicia toda la aplicacion al cargar la pagina.

## Checklist antes de grabar
- Verifica que se vea tu rostro durante todo el video o en la mayor parte.
- Habla claro y muestra el codigo mientras explicas.
- Prueba en vivo los botones Next y Previous.
- Haz clic en al menos 2 Pokemon para mostrar detalle.
- Revisa que el video no pase de 3 minutos.

## Texto sugerido para descripcion o comentario en Moodle
Adjunto enlace de video explicativo del proyecto final de consumo de API (Pokemon) desarrollado con HTML, CSS y JavaScript puro:
[PEGAR AQUI ENLACE DEL VIDEO]
