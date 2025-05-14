# Iniciar aplicacion

Una vez descargado el backend es necesario instalar las dependecias, crear el archivo ``.env`` y luego arrancar el servidor

Los comandos los puedes ejecutar desde la misma terminal de vscode o una externa.
## Instalación de dependencias

Comando para instalar las dependecias es:

```bash
npm i
```

Se te creará la carpeta ``node_modules`` y desaparecerán los errores.

## Arrancar el servidor
Se puede arrancar el servidor de tres formas la primeras es con el comando

```bash
node --run dev
```

Con este comando se iniciará el servidor sin embargo va a rechazar las peticiones del protocolo HTTP que sean genedaras por herramientas como ``Postman``.

Para aceptar peticiones de herramientas como Postman se utiliza el siguiente comando:

```bash
node --run dev:api
```

En caso de desear conectar a una base de datos postgresql local usa este comando

```bash
node --run dev:api:local
```
