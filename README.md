# GITFAV
github users search and favourites NgRx implementation

### Ejercicio
La idea es programar un buscador, que al ingresar texto devuelva como resultado la lista de usuarios de ​github que ​contienen el texto ingresado en su ​username​. Esto debería devolver una lista, que se podrá cambiar el orden alfabético ASC o DESC. Veremos algunos datos interesantes de su perfil, y un ​link para ver el ​perfil del usuario​. Este último link, debería abrir el perfil en el sistema con algunos datos más traídos de github.
También tendremos un botón de ‘favoritos’ donde podremos agregar los usuarios que vayamos navegando.
El sistema debería utilizar llamadas a la api de github.

##### - Pantalla inicial
El inicio debería ser una pantalla vacía, sin resultados, con una barra grande de búsqueda. La barra de búsqueda debe estar presente en toda pantalla de la aplicación.
Al escribir en esta barra y presionar ‘enter’, debería traerme un listado con todos los usuarios que ​contengan​ el texto ingresado en su nombre, apellido o username.
Este listado debe ser ordenable alfabéticamente de manera ascendente o descendente. Se debe poder cambiar el orden de alguna forma.
Cada ítem de la lista, tendrá datos del usuario como por ejemplo: avatar, nombre, apellido, username, fecha de suscripción, cantidad de followers y algún otro dato que considere importante. También se podrá agregar/sacar usuarios como favoritos.
La aplicación también debería informar cuántos usuarios encontró. El ítem debe tener un link al perfil.
Nota: Si hay más de 20 usuarios mostrar solo los primeros 20.

##### - Perfil
El perfil aparece cuando se clickeó un usuario de la lista.
El perfil debe contener datos como: avatar, nombres, username, email, link al perfil en github, repos que el usuario tiene, followers, location y demás datos que considere relevantes.
El perfil debe tener un botón para agregar/quitar a mis favoritos en el sistema.

##### - Favoritos
Esto será un ícono omnipresente en el sistema (como la búsqueda), que listará todos los usuarios que hemos agregado a favoritos.
Aquí tendremos la opción de borrar usuarios de favoritos.
Cabe destacar, que la función de favoritos, no está relacionada para nada con github, esto quiere decir, que al momento de recargar la pantalla o el sistema, los favoritos elegidos en algún momento desaparecen.

##### - Extras
Todo lo que no esté especificado y quiera agregar, tendrá libertad de hacerlo.