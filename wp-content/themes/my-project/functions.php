<?php

add_action( 'after_setup_theme', function() {
	// Core
	include_once 'functions/core.php';
	include_once 'functions/clean-up.php';
	include_once 'functions/content-filters.php';

	// Admin
	if ( is_admin() ) {
		include_once 'functions/admin.php';
	}

	// Media
	include_once 'functions/media.php';

	// Theme
	include_once 'functions/resources.php';
});