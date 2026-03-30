<?php

namespace RAASL;

class Enqueue {
    function __construct() {
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
    }
	
    function enqueueBlockEditorAssets(){
        $asset = require RAASL_DIR_PATH . 'build/slider/index.asset.php';
        $dependencies = array_merge( $asset['dependencies'], ['jquery', 'jquery-ui-draggable'] );

        wp_enqueue_script(
            'raasl-slider-editor-script', 
            RAASL_DIR_URL . 'build/slider/index.js', 
            $dependencies, 
            $asset['version'], 
            false 
        );

	    wp_add_inline_script('raasl-slider-editor-script', 'const raaslIsPremium = ' . wp_json_encode(raaslIsPremium()) . ';', 'before');
    }
}