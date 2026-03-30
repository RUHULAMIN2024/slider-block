<?php

namespace RAASL;

	class Init{
		function __construct(){
			add_action( 'init', [ $this, 'onInit' ] );
		}

		function onInit(){
			register_block_type( RAASL_DIR_PATH . '/build/slider' );
		}
	}
