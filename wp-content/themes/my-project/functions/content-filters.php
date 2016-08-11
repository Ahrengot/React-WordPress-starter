<?php

/* ==========================================================
 * Clean up body class
 * ========================================================== */
add_filter( 'body_class', function($classes) {
  return array_filter($classes, function($class_name) {
    $blacklisted_classes = array(
      '/^page$/',
      '/^post$/',
      '/^page-id-[0-9]+/',
      '/^page-template$/',
      '/^page-template-page-templates$/',
      '/^page-template-page-templates.+$/',
      '/^customize-support$/',
      '/^logged-in$/'
    );

    foreach ($blacklisted_classes as $blacklisted_class) {
      if ( preg_match($blacklisted_class, $class_name) ) {
        return false;
        break;
      }
    }

    return true;
  });
}, 10, 1 );

/* ==========================================================
 * Allow localhost as a safe redirect
 * ========================================================== */
add_filter('allowed_redirect_hosts' , function($content) {
  $content[] = 'localhost';
  return $content;
}, 10);