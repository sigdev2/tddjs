# tddjs
TDDJS - it's very small portable library for create tests and documentation for JavaScript's in browser

    <script src="tdd.js"></script>
    <script>
    tdd.test('Main', 'Description', (p) => {

        p.test('supb part 1', 'Description', function() {
            this.assert('Check test', 'Description', () => true);
            this.assert('Check test', 'Description', () => true);
            this.assert('Check test', 'Description', () => true);
            this.assert('Check test', 'Description', () => true);
            this.test('supb part 2', 'Description', (d) => {
                d.assert('Check test', 'Description', () => false);
                d.assert('Check test', 'Description', () => false);
                d.assert('Check test', 'Description', () => false);
                d.assert('Check test', 'Description', () => false);
                d.assert('Check test', 'Description', () => {
                    dasdasd
                });
            });
            this.test('supb part 3', 'Description', (t) => {
                t.assert('Check test', 'Description', () => false);
                t.assert('Check test', 'Description', () => false);
                t.assert('Check test', 'Description', () => false);
                t.assert('Check test', 'Description', () => false);
                t.assert('Check test', 'Description', () => {
                    dasdasd
                });
            });
        });

        p.test('supb part 4', 'Description', (k) => {
            k.assert('Check test', 'Description', () => false);
            k.assert('Check test', 'Description', () => false);
            k.assert('Check test', 'Description', () => false);
            k.assert('Check test', 'Description', () => false);
            k.assert('Check test', 'Description', () => {
                dasdasd
            });
        });
    });


    tdd.test('Main', 'Description', (p) => {

    p.test('supb part 1', 'Description', function() {
        this.assert('Check test', 'Description', () => true);
        this.assert('Check test', 'Description', () => true);
        this.assert('Check test', 'Description', () => true);
        this.assert('Check test', 'Description', () => true);
        this.test('supb part 2', 'Description', (d) => {
            d.assert('Check test', 'Description', () => false);
            d.assert('Check test', 'Description', () => false);
            d.assert('Check test', 'Description', () => false);
            d.assert('Check test', 'Description', () => false);
            d.assert('Check test', 'Description', () => {
                dasdasd
            });
        });
        this.test('supb part 3', 'Description', (t) => {
            t.assert('Check test', 'Description', () => false);
            t.assert('Check test', 'Description', () => false);
            t.assert('Check test', 'Description', () => false);
            t.assert('Check test', 'Description', () => false);
            t.assert('Check test', 'Description', () => {
                dasdasd
            });
        });
    });

    p.test('supb part 4', 'Description', (k) => {
        k.assert('Check test', 'Description', () => false);
        k.assert('Check test', 'Description', () => false);
        k.assert('Check test', 'Description', () => false);
        k.assert('Check test', 'Description', () => false);
        k.assert('Check test', 'Description', () => {
            dasdasd
        });
    });
    });
    </script>
