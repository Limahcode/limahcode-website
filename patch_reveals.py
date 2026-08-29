import re

pages = ['about.html', 'services.html', 'portfolio.html', 'pricing.html', 'contact.html']

for f in pages:
    c = open(f, encoding='utf-8').read()

    # Fix malformed: class="sec-label" reveal>  -->  class="sec-label reveal">
    c = c.replace('class="sec-label" reveal>', 'class="sec-label reveal">')

    # Also ensure any un-revealed sec-labels get the class (for services.html which had none)
    c = c.replace('class="sec-label">', 'class="sec-label reveal">')

    # Fix h2 class="reveal" if it was set as attribute instead of class
    c = re.sub(r'<h2 class="([^"]*)" reveal>', lambda m: '<h2 class="' + m.group(1) + ' reveal">', c)
    # Catch plain h2 that have reveal attribute without class
    c = c.replace('<h2 reveal>', '<h2 class="reveal">')
    # Also catch plain h2 that don't yet have reveal
    c = re.sub(r'<h2>(?!.*reveal)', lambda m: '<h2 class="reveal">', c)

    # Fix sec-sub
    c = c.replace('class="sec-sub" reveal>', 'class="sec-sub reveal">')
    c = c.replace('class="sec-sub">', 'class="sec-sub reveal">')

    open(f, 'w', encoding='utf-8').write(c)
    # Quick check
    found = 'sec-label reveal' in c
    print(f'{f}: sec-label reveal in content = {found}')

print('\nDone.')
