// Shared site chrome — renders the <nav> and <footer> markup that used to be
// hand-copied (with 3 drifting variants) into all 12 pages. Each page includes
// this script twice: once where <nav> used to sit, once where <footer> used to
// sit, each time next to a mount point (#site-nav / #site-footer) — whichever
// mount is present in the DOM at the moment this file runs is the one filled.
// Runs synchronously (no defer/async) so script.js's DOMContentLoaded nav-toggle
// wiring always finds the injected markup already in place.
(function () {
    'use strict';

    var PAGES = {
        'index': { variant: 'full', depth: 0 },
        'company': { variant: 'flat', depth: 0, navActive: 'company' },
        'developers': { variant: 'flat', depth: 0, navActive: 'developers' },
        'documentation': { variant: 'flat', depth: 0, resourcesActive: 'documentation' },
        'blog': { variant: 'flat', depth: 0, resourcesActive: 'blog' },
        'whitepaper': { variant: 'flat', depth: 0, resourcesActive: 'whitepaper', extraProfileLink: true },
        'story': { variant: 'flat', depth: 0, resourcesActive: 'story' },
        'whitepaper-outward': { variant: 'whitepaper', depth: 0, resourcesActive: 'whitepaper-outward' },
        'whitepaper-contexa': { variant: 'whitepaper', depth: 0, resourcesActive: 'whitepaper-contexa' },
        'outward': { variant: 'whitepaper', depth: 1, productsActive: 'outward' },
        'contexa': { variant: 'whitepaper', depth: 1, productsActive: 'contexa' },
        'outward_ko': { variant: 'whitepaper', depth: 1, productsActive: 'outward_ko', locale: 'ko' },
        'contexa_ko': { variant: 'whitepaper', depth: 1, productsActive: 'contexa_ko', locale: 'ko' }
    };

    var RESOURCE_ITEMS = [
        ['whitepaper', 'whitepaper.html', 'Platform Whitepaper'],
        ['story', 'story.html', 'Our Story'],
        ['whitepaper-outward', 'whitepaper-outward.html', 'Outward Whitepaper'],
        ['whitepaper-contexa', 'whitepaper-contexa.html', 'Contexa Whitepaper'],
        ['blog', 'blog.html', 'Blog'],
        ['documentation', 'documentation.html', 'Documentation']
    ];

    var FOOTER_ITEMS = [
        ['index', 'index.html', 'Home', 'root'],
        ['outward', null, 'Outward Platform', 'mkt'],
        ['contexa', null, 'Contexa Platform', 'mkt'],
        ['developers', 'developers.html', 'Developers', 'root'],
        ['whitepaper', 'whitepaper.html', 'Platform Whitepaper', 'root'],
        ['story', 'story.html', 'Our Story', 'root'],
        ['whitepaper-outward', 'whitepaper-outward.html', 'Outward Whitepaper', 'root'],
        ['whitepaper-contexa', 'whitepaper-contexa.html', 'Contexa Whitepaper', 'root'],
        ['blog', 'blog.html', 'Blog', 'root'],
        ['documentation', 'documentation.html', 'Documentation', 'root'],
        ['company', 'company.html', 'Company', 'root']
    ];

    function render(id) {
        var cfg = PAGES[id];
        if (!cfg) { return; }

        var rootPrefix = cfg.depth === 0 ? '' : '../';
        var mktPrefix = cfg.depth === 0 ? 'marketing/' : '';

        // --- NAV ---
        var navMount = document.getElementById('site-nav');
        if (navMount) {
            navMount.outerHTML = renderNav(cfg, rootPrefix, mktPrefix);
        }

        // --- FOOTER ---
        var footerMount = document.getElementById('site-footer');
        if (footerMount) {
            footerMount.outerHTML = renderFooter(cfg, rootPrefix, mktPrefix);
        }
    }

    function resourcesDropdown(cfg, rootPrefix) {
        var items = RESOURCE_ITEMS.map(function (item) {
            var key = item[0], file = item[1], label = item[2];
            var active = cfg.resourcesActive === key ? ' class="active"' : '';
            var soon = (cfg.variant === 'full' && (key === 'blog' || key === 'documentation'))
                ? ' <span class="soon-badge">Soon</span>' : '';
            return '<a href="' + rootPrefix + file + '"' + active + '>' + label + soon + '</a>';
        }).join('\n                        ');

        return '<div class="nav-item">\n' +
            '                    <a href="#" class="nav-parent">Resources <span class="caret">&#9662;</span></a>\n' +
            '                    <div class="dropdown-menu">\n' +
            '                        ' + items + '\n' +
            '                    </div>\n' +
            '                </div>';
    }

    function productsDropdown(cfg, rootPrefix, mktPrefix) {
        var isKo = cfg.locale === 'ko';
        var outwardFile = isKo ? 'outward_ko.html' : 'outward.html';
        var outwardLabel = isKo ? '잇다(ITDA) &mdash; 고객 인게이지먼트' : 'Outward &mdash; Customer Engagement';
        var outwardActive = (cfg.productsActive === 'outward' || cfg.productsActive === 'outward_ko') ? ' class="active"' : '';

        var contexaFile = isKo ? 'contexa_ko.html' : 'contexa.html';
        var contexaLabel = isKo ? 'Contexa &mdash; 트러스트 &amp; 세이프티' : 'Contexa &mdash; Trust &amp; Safety';
        var contexaActive = (cfg.productsActive === 'contexa' || cfg.productsActive === 'contexa_ko') ? ' class="active"' : '';

        return '<div class="nav-item">\n' +
            '                    <a href="' + rootPrefix + 'index.html#products">Products <span class="caret">&#9662;</span></a>\n' +
            '                    <div class="dropdown-menu">\n' +
            '                        <a href="' + mktPrefix + outwardFile + '"' + outwardActive + '>' + outwardLabel + '</a>\n' +
            '                        <a href="' + mktPrefix + contexaFile + '"' + contexaActive + '>' + contexaLabel + '</a>\n' +
            '                    </div>\n' +
            '                </div>';
    }

    function renderNav(cfg, rootPrefix, mktPrefix) {
        var logo = '<a href="' + rootPrefix + 'index.html" class="logo">Omni<span>N</span>Stack</a>';
        var home = '<a href="' + rootPrefix + 'index.html">Home</a>';
        var developers = '<a href="' + rootPrefix + 'developers.html"' + (cfg.navActive === 'developers' ? ' class="active"' : '') + '>Developers</a>';
        var company = '<a href="' + rootPrefix + 'company.html"' + (cfg.navActive === 'company' ? ' class="active"' : '') + '>Company</a>';
        var contact = '<a href="mailto:info@omninstack.com" class="btn btn-outline" style="padding: 0.7rem 1.8rem; font-size: 0.75rem; border-radius: 12px;">Contact Us</a>';
        var profileLink = cfg.extraProfileLink
            ? '<a href="' + rootPrefix + 'documents/OmniNStack_Sovereign_AI_v2.pdf">Company Profile</a>\n                ' : '';

        var platform, products, solutions;

        if (cfg.variant === 'full') {
            platform = '<div class="nav-item">\n' +
                '                    <a href="#platform">Platform <span class="caret">&#9662;</span></a>\n' +
                '                    <div class="dropdown-menu">\n' +
                '                        <a href="#platform">Platform Overview</a>\n' +
                '                        <a href="#how-it-works">How It Works</a>\n' +
                '                        <a href="#architecture">Architecture</a>\n' +
                '                        <a href="#innovation">Innovation</a>\n' +
                '                    </div>\n' +
                '                </div>';
            products = '<div class="nav-item">\n' +
                '                    <a href="#products">Products <span class="caret">&#9662;</span></a>\n' +
                '                    <div class="dropdown-menu">\n' +
                '                        <a href="marketing/outward.html">Outward &mdash; Customer Engagement</a>\n' +
                '                        <a href="marketing/contexa.html">Contexa &mdash; Trust &amp; Safety</a>\n' +
                '                    </div>\n' +
                '                </div>';
            solutions = '<div class="nav-item">\n' +
                '                    <a href="#industries">Solutions <span class="caret">&#9662;</span></a>\n' +
                '                    <div class="dropdown-menu">\n' +
                '                        <a href="#industry-retail">Retail &amp; Franchise</a>\n' +
                '                        <a href="#industry-commerce">Digital Commerce</a>\n' +
                '                        <a href="#industry-gaming">Gaming</a>\n' +
                '                        <a href="#industry-government">Government</a>\n' +
                '                        <a href="#industry-financial">Financial Services</a>\n' +
                '                        <a href="#industry-healthcare">Healthcare</a>\n' +
                '                    </div>\n' +
                '                </div>';
        } else if (cfg.variant === 'whitepaper') {
            platform = '<a href="' + rootPrefix + 'index.html#platform">Platform</a>';
            products = productsDropdown(cfg, rootPrefix, mktPrefix);
            solutions = '';
        } else {
            platform = '<a href="' + rootPrefix + 'index.html#platform">Platform</a>';
            products = '<a href="' + rootPrefix + 'index.html#products">Products</a>';
            solutions = '';
        }

        return '<div id="site-nav">\n' +
            '    <nav>\n' +
            '        <div class="container nav-content">\n' +
            '            ' + logo + '\n' +
            '            <div class="nav-links" id="nav-links">\n' +
            '                ' + home + '\n' +
            '                ' + platform + '\n' +
            '                ' + products + '\n' +
            (solutions ? '                ' + solutions + '\n' : '') +
            '                ' + developers + '\n' +
            '                ' + resourcesDropdown(cfg, rootPrefix) + '\n' +
            '                ' + company + '\n' +
            '                ' + profileLink + contact + '\n' +
            '            </div>\n' +
            '            <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">\n' +
            '                <span></span><span></span><span></span>\n' +
            '            </button>\n' +
            '        </div>\n' +
            '    </nav>\n' +
            '</div>';
    }

    function renderFooter(cfg, rootPrefix, mktPrefix) {
        var isKo = cfg.locale === 'ko';
        var links = FOOTER_ITEMS.map(function (item) {
            var key = item[0], file = item[1], label = item[2], kind = item[3];
            var active = false, href, text = label;

            if (key === 'outward') {
                href = mktPrefix + (isKo ? 'outward_ko.html' : 'outward.html');
                text = isKo ? '잇다(ITDA) 플랫폼' : label;
                active = cfg.id === 'outward' || cfg.id === 'outward_ko';
            } else if (key === 'contexa') {
                href = mktPrefix + (isKo ? 'contexa_ko.html' : 'contexa.html');
                text = isKo ? 'Contexa 플랫폼' : label;
                active = cfg.id === 'contexa' || cfg.id === 'contexa_ko';
            } else if (kind === 'mkt') {
                href = mktPrefix + file;
                active = cfg.id === key;
            } else {
                href = rootPrefix + file;
                active = cfg.id === key;
            }

            return '<a href="' + href + '"' + (active ? ' class="active"' : '') + '>' + text + '</a>';
        }).join('\n                ');

        return '<div id="site-footer">\n' +
            '    <footer>\n' +
            '        <div class="container">\n' +
            '            <div class="footer-logo logo" style="justify-content: center; margin-bottom: 2rem;">Omni<span>N</span>Stack</div>\n' +
            '            <div class="footer-tagline">\n' +
            '                <span class="accent-text">Enterprise AI Platform Company</span>\n' +
            '                <p>One shared AI platform. A growing portfolio. Built in Canada.</p>\n' +
            '            </div>\n' +
            '            <div class="footer-nav">\n' +
            '                ' + links + '\n' +
            '            </div>\n' +
            '            <p class="footer-address">\n' +
            '                OMNINSTACK AI SOLUTIONS INC.<br>\n' +
            '                Suite 1028 20055 Willowbrook Drive Unit #200 Langley, BC V2Y 2T5 Canada\n' +
            '            </p>\n' +
            '            <p class="footer-copy">Proudly designed &amp; engineered in British Columbia, Canada.</p>\n' +
            '            <p class="footer-copy">&copy; 2026 OmniNStack. All Rights Reserved.</p>\n' +
            '        </div>\n' +
            '    </footer>\n' +
            '</div>';
    }

    var thisScript = document.currentScript;
    var id = thisScript ? thisScript.getAttribute('data-id') : null;
    if (id && PAGES[id]) {
        var cfg = PAGES[id];
        cfg.id = id;
        render(id);
    }
})();
