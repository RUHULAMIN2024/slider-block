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
 * @fs_premium_only /vendor/freemius
 * @fs_free_only /vendor/freemius-lite
 */


if ( !defined( 'ABSPATH' ) ) { exit; }


if ( function_exists( 'raasl_fs' ) ) {
        raasl_fs()->set_basename( true, __FILE__ );
    } else {

        define( 'RAASL_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
        define( 'RAASL_DIR_URL', plugin_dir_url( __FILE__ ) );
        define( 'RAASL_DIR_PATH', plugin_dir_path( __FILE__ ) );
        define('RAASL_HAS_PRO', file_exists(dirname(__FILE__) . '/vendor/freemius/start.php'));
        
       if ( ! function_exists( 'raasl_fs' ) ) {
    function raasl_fs() {
        global $raasl_fs;

        if ( ! isset( $raasl_fs ) ) {
            if ( RAASL_HAS_PRO ) {
                require_once dirname( __FILE__ ) . '/vendor/freemius/start.php';
            } else {
                require_once dirname( __FILE__ ) . '/vendor/freemius-lite/start.php';
            }

			$raaslConfig = array(
                'id'                  => '26132',
                'slug'                => 'slider',
                'premium_slug'        => 'slider-pro',
                'type'                => 'plugin',
                'public_key'          => 'pk_8c54459e38e31b895d3eed40800e8',
                'is_premium'          => false,
                'premium_suffix'      => 'Pro',
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'is_org_compliant'    => true,
                'wp_org_gatekeeper'   => 'OA7#BoRiBNqdf52FvzEf!!074aRLPs8fspif$7K1#4u4Csys1fQlCecVcUTOs2mcpeVHi#C2j9d09fOTvbC0HloPT7fFee5WdS3G',
                'menu'                => array(
                    'first-path'     => 'plugins.php',
                    'support'        => false,
                ),
            );
			$raasl_fs = RAASL_HAS_PRO ? fs_dynamic_init( $raaslConfig ) : fs_lite_dynamic_init( $raaslConfig );
        }

        return $raasl_fs;
    }

    // Init Freemius.
    raasl_fs();
    // Signal that SDK was initiated.
    do_action( 'raasl_fs_loaded' );
}

require_once RAASL_DIR_PATH . 'includes/utils/functions.php';
require_once RAASL_DIR_PATH . 'includes/plugin.php';
}