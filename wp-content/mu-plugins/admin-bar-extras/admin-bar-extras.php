<?php

if ( !defined('ABSPATH') ) {
  die('You cannot access this file directly');
}

/**************************************************************************
  Plugin Name: Admin bar extras
  Description: Adds extra links to the admin bar for admin users
  Author: Jens Ahrengot Boddum
  Version: 1.0.0
***************************************************************************/

class AdminBarExtras {

  public function __construct() {
    add_action( 'init', array( $this, 'init' ) );
  }

  public function init() {
    if ( is_user_logged_in() && current_user_can( 'manage_options' ) ) {
      add_action( 'admin_bar_menu', array($this, 'edit_admin_bar'), 999 );
    }
  }

  public function edit_admin_bar( $wp_admin_bar ) {
    /**
     * Add custom menu items
     */
    $site_name_extras = array(
      'menus' => array(
        'title' => 'Nav menus',
        'url' => admin_url( 'nav-menus.php' )
      ),
      'users' => array(
        'title' => 'Users',
        'url' => admin_url( 'users.php' )
      ),
      'edit-plugins' => array(
        'title' => 'Plugins',
        'url' => admin_url( 'plugins.php' )
      ),
      'permalink-settings' => array(
        'title' => 'Permalinks',
        'url' => admin_url( 'options-permalink.php' ),
      ),
      'custom-fields' => array(
        'title' => 'Custom fields',
        'url' => admin_url( 'edit.php?post_type=acf-field-group' ),
      )
    );

    foreach ($site_name_extras as $menu_item => $menu_item_data) {
      $wp_admin_bar->add_node(array(
        'parent' => 'site-name',
        'id' => $menu_item,
        'title' => $menu_item_data['title'],
        'href' => $menu_item_data['url'],
        'meta' => array(
          'class' => $menu_item,
          'title' => $menu_item_data['title'],
        )
      ));
    }

    /**
     * Remove menu items
     */
    $wp_admin_bar->remove_menu( 'wp-logo' );
    $wp_admin_bar->remove_menu( 'updates' );
    $wp_admin_bar->remove_node( 'comments' );
  }

}

new AdminBarExtras();