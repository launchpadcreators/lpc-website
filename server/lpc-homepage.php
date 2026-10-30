<?php
/**
 * Plugin Name: Launchpad Creators homepage
 * Description: Shows the new site's homepage (index.html in the website folder) at launchpadcreators.com/. Every other address is handled by WordPress as before. Delete this file to bring back the WordPress homepage.
 *
 * Why a must-use plugin: on 123reg's Managed WordPress the server shows index.php before index.html, and WordPress's
 * index.php is locked (can't be renamed or edited). Files in wp-content/mu-plugins/ load on every request without
 * being switched on, and WordPress updates don't touch them. Uploaded by the GitHub job ("launch-switch" mode);
 * removed by "launch-undo". Source: server/lpc-homepage.php in the lpc-website repo. See docs/DEPLOY-123REG.md.
 */

if (!defined('ABSPATH')) {
    exit;
}

$lpc_path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$lpc_method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$lpc_home = ABSPATH . 'index.html';

if ($lpc_path === '/' && ($lpc_method === 'GET' || $lpc_method === 'HEAD') && is_readable($lpc_home)) {
    header('Content-Type: text/html; charset=UTF-8');
    // Ask the CDN and browsers to check for a newer homepage each time, so updates show without a cache flush
    header('Cache-Control: no-cache, must-revalidate, max-age=0');
    header('X-LPC-Homepage: static');
    if ($lpc_method === 'GET') {
        readfile($lpc_home);
    }
    exit;
}
