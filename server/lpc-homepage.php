<?php
/**
 * Plugin Name: Launchpad Creators homepage
 * Description: Shows the new site's homepage (index.html in the website folder) at launchpadcreators.com/. Every other address is handled by WordPress as before. Also adds a rule to robots.txt that keeps AI crawlers off /results/. Delete this file to bring back the WordPress homepage (and drop that rule).
 *
 * Why a must-use plugin: on 123reg's Managed WordPress the server shows index.php before index.html, and WordPress's
 * index.php is locked (can't be renamed or edited). Files in wp-content/mu-plugins/ load on every request without
 * being switched on, and WordPress updates don't touch them. Uploaded by the GitHub job ("launch-switch" mode);
 * removed by "launch-undo". Source: server/lpc-homepage.php in the lpc-website repo. See docs/DEPLOY-123REG.md.
 */

if (!defined('ABSPATH')) {
    exit;
}

// robots.txt (built by WordPress, with Yoast's block): keep AI crawlers off the Results page only; the rest of the site
// stays open to everyone. Google and Bing are kept out of search by the page's own "noindex" tag instead, so they must
// still be allowed to read it. Runs last, after Yoast. (Asked via Slack, 2 Nov 2026.)
add_filter('robots_txt', function ($output) {
    $bots = [
        'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',                  // OpenAI
        'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', // Anthropic
        'Google-Extended',                                          // Google's AI (Gemini) training
        'Applebot-Extended',                                        // Apple's AI training
        'PerplexityBot', 'Perplexity-User',                         // Perplexity
        'CCBot',                                                    // Common Crawl (used to train many AI models)
        'meta-externalagent', 'Bytespider', 'Amazonbot', 'cohere-ai', 'DuckAssistBot',
    ];
    $rules = "\n# Launchpad Creators: AI crawlers may not read the Results page (the rest of the site is open)\n";
    foreach ($bots as $bot) {
        $rules .= "User-agent: $bot\n";
    }
    $rules .= "Disallow: /results/\n";
    return rtrim($output) . "\n" . $rules;
}, PHP_INT_MAX);

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
