<?php

if (!defined('ABSPATH')) exit;

if( !class_exists( 'RAASLPlugin' ) ){
    class RAASLPlugin{
        function __construct(){
            $this -> loaded_classes();

        }
 
        function loaded_classes(){
			require_once RAASL_DIR_PATH . 'includes/rootPlugin/Init.php';
			require_once RAASL_DIR_PATH . 'includes/rootPlugin/Enqueue.php';		

			new RAASL\Init();
			new RAASL\Enqueue();			

		}
    }
    new RAASLPlugin();
}