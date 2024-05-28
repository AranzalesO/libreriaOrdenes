# libreriaoredenes

## Descripción

`libreriaoredenes` es un paquete npm que proporciona un sistema de manejo de solicitudes utilizando el patrón Chain of Responsibility. Este paquete permite procesar solicitudes de manera secuencial a través de diferentes manejadores, cada uno encargado de una tarea específica, como autenticación, sanitización de datos, filtrado de fuerza bruta y almacenamiento en caché.

## Instalación

Para instalar `libreriaoredenes`, ejecute el siguiente comando en su proyecto Node.js:

npm i libreriaoredenes

## Uso

1. Importe las clases necesarias en su archivo JavaScript:

```javascript
import Request from 'libreriaoredenes/models/Request';
import HandlesChain from 'libreriaoredenes/chain/HandlesChain';
import AuthenticationHandler from 'libreriaoredenes/handlers/AuthenticationHandler';
import SanitizeDataHandler from 'libreriaoredenes/handlers/SanitizeDataHandler';
import BruteForceFilterHandler from 'libreriaoredenes/handlers/BruteForceFilterHandler';
import CacheHandler from 'libreriaoredenes/handlers/CacheHandler';

Cree una instancia de Request con los datos de la solicitud:

const request = new Request(username, password, data, ipAddress);

Cree una instancia de HandlesChain y agregue los manejadores deseados:

const chain = new HandlesChain();
chain.addHandler(new AuthenticationHandler(apiKey));
chain.addHandler(new SanitizeDataHandler());
chain.addHandler(new BruteForceFilterHandler());
chain.addHandler(new CacheHandler());

Procese la solicitud llamando al método handle de la cadena:

try {
  const result = await chain.handle(request);
  // Procesar el resultado
} catch (error) {
  // Manejar el error
}

}

Manejadores disponibles

AuthenticationHandler: Autentica al usuario utilizando Clerk. Requiere el apiKey de Clerk como parámetro.
SanitizeDataHandler: Sanitiza los datos de entrada (username, password, data, ipAddress) para prevenir inyecciones de código.
BruteForceFilterHandler: Bloquea las solicitudes de una IP después de demasiados intentos fallidos.
CacheHandler: Almacena en caché las solicitudes exitosas durante una hora.

Contribución
Si desea contribuir al proyecto, por favor siga estos pasos:

Haga un fork del repositorio.
Cree una nueva rama para su característica: git checkout -b mi-nueva-caracteristica.
Realice los cambios y haga commit: git commit -am 'Añadida nueva característica'.
Envíe los cambios a la rama: git push origin mi-nueva-caracteristica.
Cree una nueva solicitud de extracción (Pull Request).

Licencia
Este proyecto está licenciado bajo la MIT License.

Se han agregado detalles sobre los parámetros requeridos por cada manejador:

- `AuthenticationHandler` requiere el `apiKey` de Clerk para autenticar al usuario.
- `SanitizeDataHandler` sanitiza los datos de entrada (`username`, `password`, `data` e `ipAddress`) para prevenir inyecciones de código.

Esto ayudará a los usuarios a comprender qué información deben proporcionar a cada manejador para que funcione correctamente.
