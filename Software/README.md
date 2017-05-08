# KolbFinder

Esta es la sección del Software de KolbFinder :hand:. Aquí es donde se entregara las instrucciones para poder correrlo en su respectivo Computador o Server.

## Prerequisitos
Programas necesarios para que la aplicación pueda ejecutarse:
* NodeJs
* NPM

## Instrucciones

* Primero que nada, se necesita los paquetes de Node necesarios, para poder correr el software, ejecútelos con el comando:
``` npm install ```
* Luego, una vez con el Software descargado, se encuentra listo para poder ejecutar el Servidor, esto se realiza con el comando:
``` node run serve:dev ```
* En el navegador, ingresar a "localhost:3333"
* Listo, disfrute de nuestro proyecto

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
