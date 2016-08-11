<?php

/**
 * Asset manifest contains mangled/cachebusting filenames for CSS/JS
 * used in production
 */
function ahr_get_asset_manifest() {
    $manifest_path = trailingslashit( get_template_directory() ) . 'assets/rev-manifest.json';
    if ( file_exists( $manifest_path ) ) {
        return json_decode( file_get_contents($manifest_path), true );
    } else {
        wp_die("manifest file not found at '" . $manifest_path . "'");
    }
}

/**
 * Load in site resources
 */
add_action('wp_enqueue_scripts', function() {
    $assets_dir = trailingslashit( get_template_directory_uri() ) . 'assets/';
    $css_main = 'css/main.css';
    $js_main = 'scripts/combined.js';

    // Production
    if ( ! defined( 'SCRIPT_DEBUG' ) || SCRIPT_DEBUG === false ) {
        $manifest = ahr_get_asset_manifest();
        $css_main = $manifest['css/main.css'];
        $js_main = $manifest['scripts/combined.min.js'];
    }

    // Load styles
    wp_enqueue_style( 'theme-css', $assets_dir . $css_main );

    // Load scripts
    wp_enqueue_script( 'theme-js', $assets_dir . $js_main, array(), '', true );
    wp_localize_script( 'theme-js' , 'config', ahr_js_config() );
}, 10);

/**
 * Provides global configuration for JS
 */
function ahr_js_config() {
    $data = array(
        'url' => array(
            'home' => trailingslashit( get_bloginfo('url') ),
            'theme' => trailingslashit( get_template_directory_uri() ),
            'assets' => trailingslashit( get_template_directory_uri() ) . 'assets/'
        )
    );

    return apply_filters( 'ahr_js_config', $data );
}