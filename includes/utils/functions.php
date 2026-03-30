<?php

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! function_exists( 'raaslIsPremium' ) ) {
	function raaslIsPremium(){
		return RAASL_HAS_PRO ? raasl_fs()->can_use_premium_code() : false;
	}
}
