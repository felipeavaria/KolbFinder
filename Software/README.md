# KolbFinder

Esta es la sección del Software de KolbFinder :hand:. Aquí es donde se entregara las instrucciones para poder ejecutar el Software en su respectivo Computador o Servidor.

## Prerequisitos
Programas necesarios para instalar depedencias:
* Bash / GitBash (Windows)
* NodeJs
* NPM

## Instrucciones

### Linux
* Tener instalado Node, y Npm
* Luego, correr el comando ``` npm install ``` para instalar los modulos. Se requiere permisios de escritura en el directorio
* Luego, setiene que crear el archivo .env. utilice el comando ``` mv .env.example .env ```
* Utilizar los siguientes comandos de Adonis, para inicializar la base de datos:
	* ``` node ace migration:refresh ```
	* ``` node ace db:seed ```
* La plataforma se encuentra lista para correr, utilice el comando "node server.js", y luego acceda a la dirección ``` localhost:3333 ```

### Windows
* Tener instalado la aplicación Git.
* Correr el programa de Shell "Git Bash", con permisos de escritura
* Ir a la Carpeta del Proyecto ./KolbFinder/Software
* Proceder con los comandos señalados en Linux
* Listo, la plataforma se encuentra lista para ser usada.

### Usuarios de la página
En la Pantalla principal, el primer formularo es el ingreso de usuario. El segundo, para registar Catalogadores. Por ahora, no hay como registar administradores, pero si catalogadores:
* Administrador: mail: admin@kolbfinder.kf , pass: 1234
* Catalogador: user/mail: as123@gmail.com , pass: 1234. O también puede crear catalogadores a través del formulario bajo el login

## Bugs
Debido a que recién estamos con nuestro primer prototipo, es que el Software tiene un par de bues que van a ser corregidos en próximas entregas :construction_worker: :

* No colocar en la lista de URL's, páginas "en blanco" o que sean "[]". Esto hace que el modulo NPM de Scrapping se caiga :weary:.
* Al enviar el listado de páginas, puede ser que el usuario tenga que cancelar el envió de sitios, y luego volver a enviarlos. 

## Créditos :clap:
Gracias a los desarrolladores de AdonisJs, por realizar un framework "ordenador de código", para que se pueda entender mejor. Y al creador del modulo de scrapping.
