<?php

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! function_exists( 'raaslIsPremium' ) ) {
	function raaslIsPremium() {
		return raasl_fs()->can_use_premium_code();
	}
}
