<?php
/*
This is a sample local-config.php file
In it, you *must* include the four main database defines

You may include other settings here that you only want enabled on your local development checkouts
*/

define( 'DB_NAME', 'project_db' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', 'root' );
define( 'DB_HOST', 'localhost' );


/*
 * Environment
 *
 * When using this on a production environment, be sure to add the following to your local-config.php:
 */

//define( 'ENVIRONMENT', 'PRODUCTION' );

/**
 * Script debug
 *
 * Set this to true and the theme will load JS from memory.
 * Set it to false and the theme will look for a built
 * js file in the theme/assets/js folder
 *
 * In other words, set it to true when running `gulp dev` set it to false
 * after running `gulp build`
 */
define( 'SCRIPT_DEBUG', true );
