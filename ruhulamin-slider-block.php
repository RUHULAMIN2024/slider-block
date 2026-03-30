<?php
/**
 * Plugin Name:       Ruhulamin Slider Block
 * Description:       Advanced image and content slider block for WordPress.
 * Version:           0.0.1
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Ruhul Amin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ruhulamin-slider-block
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'RASLB_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'RASLB_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'RASLB_DIR_PATH', plugin_dir_path( __FILE__ ) );

if ( ! class_exists( 'RASLBPlugin' ) ) {
	class RASLBPlugin {
		function __construct() {
			add_action( 'init', [ $this, 'init' ] );
		}

		function init() {
			register_block_type( RASLB_DIR_PATH . 'build/slider' );
		}
	}

	new RASLBPlugin();
}
