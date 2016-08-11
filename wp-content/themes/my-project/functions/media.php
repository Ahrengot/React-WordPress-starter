<?php

/*
 * Embeds
 */
add_filter( 'embed_oembed_html', function() {
  # Add wrapper around embeds to setup CSS for embed aspect ratios
	return '<div class="embed-responsive embed-responsive-16by9">' . $html . '</div>';
}, 99, 4 );

/*
 * Theme image sizes
  add_image_size( 'small', 400, 300 );
  add_image_size( 'social-share', 1200, 630, 0, 0, true );
  add_image_size( 'top-image', 1600, 700 );
 */