checks = {
    'index.html':    ['theme-toggle', 'reveal-group', 'glow-animated', 'data-count', 'animateCount'],
    'academy.html':  ['theme-toggle', 'tl-row', 'tl-dot', 'timeline', 'reveal'],
    'about.html':    ['theme-toggle', 'sec-label reveal'],
    'services.html': ['theme-toggle', 'sec-label reveal'],
    'portfolio.html':['theme-toggle', 'sec-label reveal'],
    'pricing.html':  ['theme-toggle', 'sec-label reveal'],
    'contact.html':  ['theme-toggle', 'sec-label reveal'],
    'css/styles.css':['reveal', 'is-visible', 'light-mode', 'glowPulse', 'theme-toggle', 'count-up'],
    'js/nav.js':     ['initReveal', 'IntersectionObserver', 'toggleTheme', 'animateCount', 'initNavScroll'],
}

all_ok = True
for f, keys in checks.items():
    try:
        content = open(f, encoding='utf-8').read()
        missing = [k for k in keys if k not in content]
        status = 'OK' if not missing else 'MISSING: ' + ', '.join(missing)
        if missing:
            all_ok = False
        print(('[OK] ' if not missing else '[!!] ') + f + ' — ' + status)
    except Exception as e:
        print('[!!] ' + f + ' — ERROR: ' + str(e))
        all_ok = False

print()
print('All checks passed!' if all_ok else 'Some issues found above.')
