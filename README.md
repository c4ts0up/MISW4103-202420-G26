# Proyecto de Pruebas Automatizadas

## Integrantes
- Mariana Díaz - m.diaza2@uniandes.edu.co
- Alvaro Bacca - a.baccap@uniandes.edu.co
---

## Requisitos previos

- **Node.js**: Instalar Node.js en la versión 14 o superior.
- **Java**: Algunas herramientas de prueba requieren tener instalado Java JDK.
- **Navegador**: Las pruebas están diseñadas para ejecutarse en navegadores como Chromium, Firefox o Webkit.
- **Despliegue de Ghost:5.96**: se sugiere utilizar Docker para este fin y [seguir los pasos en la página oficial.](https://hub.docker.com/_/ghost/)

## Clonar el repostiorio

Clone este repositorio utilizando la URL HTTPs con el comando
`git clone <repository_url>`

## Estructura del Proyecto
El repositorio está dividido en dos ramas principales, que representan las versiones del código que se analizaron para la Aplicación Bajo Pruebas (ABP):

`version/5.96.0`: Contiene el código para realizar las pruebas en la versión 5.96.0

`version/4.5.0`: Contiene el código para realizar las pruebas en la versión 4.5.0

## Pruebas de Regresión Visual
El repositorio incluye un conjunto de pruebas de regresión visual que permiten comparar visualmente las diferencias entre ejecuciones.

Instrucciones para las pruebas de regresión visual:
1. Dirígete a la carpeta `VR` dentro del proyecto.
2. Allí encontrarás un archivo `README.md` con las instrucciones detalladas para configurar y ejecutar las pruebas visuales.
3. Sigue los pasos descritos en ese archivo para realizar las pruebas de regresión visual

## Pruebas en Kraken
Para ejecutar las pruebas en kraken debe seguir los siguientes pasos:

1. Instalar Kraken globalmente `npm install kraken-node -g`
2. Abrir en un editor de código el repositorio
3. Ingresar a la carpeta de Kraken `cd Kraken`
4. Instalar Kraken localmente `npm install kraken-node`
5. En el archivo `properties.json` actualice las credenciales para conectarse a ghost
6. En el archivo `features/utils/config.js` actualicé su baseUrl en caso de que sea diferente
7. Ejecutar las pruebas utilizando alguno de los siguientes comandos:
    - `./node_modules/kraken-node/bin/kraken-node run`
    - `npx kraken-node run`

**Nota**: Para ejecutar la funcionalidad de "Crear Miembro", el miembro con los datos ingresados no debe existir previamente. Debido a las limitaciones de Kraken, los datos aleatorios no pueden generarse automáticamente, por lo que si ejecuta las pruebas varias veces, deberá eliminar los miembros creados anteriormente para asegurar que las pruebas tengan éxito.

**! IMPORTANTE**: Debido a las limitaciones de Kraken, es necesario actualizar el archivo `ghost.feature` en la carpeta `features` para elegir los escenarios específicos. En la carpeta `features/tests` encontrará varios archivos `.feature` que corresponden a escenarios de prueba divididos por funcionalidad. Debe copiar el contenido del archivo que desee ejecutar en `ghost.feature`, ya que solo debe haber un archivo `.feature` a nivel de la carpeta features.

Los resultados se almacenarán en una carpeta que se genera llamada `reports`. Tambien se pueden visualizar los screenshots de manera secuencial para el VR en la carpeta `evidences`.

## Pruebas en Playwright
Para ejecutar las pruebas en Playwright, diríjase a ``./PlaywrightSuite`` y lea el ``README.md`` correspondiente. 

## Pruebas en RIPPuppeteer
Para ejecutar las pruebas en RIPPuppeteer, diríjase a ``./Rippuppet`` y lea el ``README.md`` correspondiente. 
