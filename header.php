<?php

/**
 * The template for displaying the header
 *
 * This is the template that displays all of the <head> section, opens the <body> tag and adds the site's header.
 *
 * @package HelloElementor
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

$viewport_content = apply_filters('hello_elementor_viewport_content', 'width=device-width, initial-scale=1');
$enable_skip_link = apply_filters('hello_elementor_enable_skip_link', true);
$skip_link_url = apply_filters('hello_elementor_skip_link_url', '#content');
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="<?php echo esc_attr($viewport_content); ?>">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
	<script src="https://cdn.tailwindcss.com"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
	<style type="text/css">
		.font-dm-sans,
		body {
			font-family: "DM Sans", sans-serif;
			font-optical-sizing: auto;
			font-weight: 300;
			font-style: normal;
		}

		.heading-font {
			font-family: "Anton", sans-serif;
			font-weight: 400;
			font-style: normal;
		}
	</style>
	<script src="https://unpkg.com/@phosphor-icons/web"></script>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
</head>

<body <?php body_class(); ?>>

	<?php /***  Age verification Modal ****/ ?>
	<?php if (!isset($_COOKIE['AGE-VERIFIED'])) { ?>

		<div class="verification-modal-container flex flex-wrap content-evenly">
			<div class="verification-modal-content  ">
				<div class="verification-modal-copy">
					<h3>VERIFY YOUR AGE</h3>
					<p>Confirm you are 21 years of age or older.</p>
					<button class="main-cta">I AM 21 OR OLDER</button>
					<button class="secondary-cta">I AM NOT</button>
				</div>

				<div class="verification-modal-side">

				</div>
			</div>
		</div>
	<?php } ?>

	<?php /****  / Modal *****/ ?>

	<?php wp_body_open(); ?>

	<?php if ($enable_skip_link) { ?>
		<a class="skip-link screen-reader-text" href="<?php echo esc_url($skip_link_url); ?>"><?php echo esc_html__('Skip to content', 'hello-elementor'); ?></a>
	<?php } ?>

	<?php
	if (! function_exists('elementor_theme_do_location') || ! elementor_theme_do_location('header')) {
		if (hello_elementor_display_header_footer()) {
			if (did_action('elementor/loaded') && hello_header_footer_experiment_active()) {
				get_template_part('template-parts/dynamic-header');
			} else {
				get_template_part('template-parts/header');
			}
		}
	}
