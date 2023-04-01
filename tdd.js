((global) => {
    function createTag(name, attrs = {}, style = '', inner = '') {
        const tag = document.createElement(name);
        tag.style.cssText += style;
        tag.innerHTML = inner;
        for (const [key, val] of Object.entries(attrs))
            tag.setAttribute(key, val);
        return tag;
    }

    const MAX_WIDTH = '580px';
    const PIN_EMPTY_BORDER = '2px solid transparent';
    const TRIANGLE_CSS = 'cursor: pointer; margin-left: 5px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; display: inline-block;';
    const TRIANGLE_UPDOWN = '9px solid #b2b2b2';

    class Tdd {
        #progress = createTag('progress', {'max' : 0, 'value' : 0}, 'display: block; width: ' + MAX_WIDTH + '; height: 20px;');
        #counter = null;
        #testsView = createTag('div', {}, 'width: ' + MAX_WIDTH);
        #testsPins = createTag('div', {}, 'width: ' + MAX_WIDTH);
        #children = createTag('div', {}, 'padding-left: 20px');
        #parentElement = null;
        #parentTdd = null;
        #lvl = 0;

        #appendTest(success) {
            const max = parseInt(this.#progress.getAttribute('max')) + 1;
            this.#progress.setAttribute('max', max);
            let val = parseInt(this.#progress.getAttribute('value'));
            if (success)
                this.#progress.setAttribute('value', ++val);
            this.#progress.innerHTML = Math.floor((val / max) * 100).toString() + '%';
            this.#counter.innerHTML = ' (' + val + '/' + max + ')';
            if (this.#parentTdd != null)
                this.#parentTdd.#appendTest(success);
        }

        constructor(title = '', description = '', lvl = 0, parentElement = null, parentTdd = null) {
            if (parentElement == null) {
                this.#parentElement = createTag('div', {}, 'margin-left: auto; margin-right: auto; min-width: 640px; max-width: 1024px; padding-top: 24px;');
                this.#counter = createTag('span', {}, 'display: inline-block; position: relative; top: -3px; margin-left: 10px;');

                if (!document.body)
                    document.addEventListener('DOMContentLoaded', () => document.body.append(this.#parentElement));
                else
                    document.body.append(this.#parentElement);
                
                this.#progress.style.display = 'inline-block';
                this.#parentElement.append(this.#progress);
                this.#parentElement.append(this.#counter);
            } else {
                this.#parentElement = parentElement;
                this.#parentTdd = parentTdd;
                this.#counter = createTag('sup', {}, 'font-weight: normal;');
                this.#lvl = lvl;

                const headerSize = this.#lvl > 3 ? 3 : this.#lvl;
                const header = createTag(`h${headerSize}`, {}, 'margin-bottom: 0px; margin-top: 12px', title);
                header.append(this.#counter);
                this.#parentElement.append(header);

                if (description.length > 0) {
                    const needHide = this.#lvl > 1;
                    const desc = createTag('p', {}, 'margin: 10px;', description);
                    const toogleDescription = createTag('sup', {'title' : 'Desctiption'}, TRIANGLE_CSS);
                    if (needHide) {
                        desc.style.display = 'none';
                        toogleDescription.style.borderTop = TRIANGLE_UPDOWN;
                        toogleDescription.style.borderBottom = 'none';
                    } else {
                        toogleDescription.style.borderBottom = TRIANGLE_UPDOWN;
                        toogleDescription.style.borderTop = 'none';
                    }
                    toogleDescription.addEventListener("click", () => {
                        if (desc.style.display == 'none') {
                            desc.style.display = 'block';
                            toogleDescription.style.borderBottom = TRIANGLE_UPDOWN;
                            toogleDescription.style.borderTop = 'none';
                        } else {
                            desc.style.display = 'none';
                            toogleDescription.style.borderTop = TRIANGLE_UPDOWN;
                            toogleDescription.style.borderBottom = 'none';
                        }
                    });
                    header.append(toogleDescription);
                    this.#parentElement.append(desc);
                }
                
                this.#parentElement.append(this.#progress);
                this.#parentElement.append(this.#testsPins);
                this.#parentElement.append(this.#testsView);

                if (this.#lvl > 1) {
                    this.#children.style.paddingLeft = '10px';
                    this.#children.style.marginLeft = '10px';
                    this.#children.style.borderLeft = '2px solid gray';
                } else {
                    this.#children.style.paddingBottom = '24px';
                }
            }
            
            this.#parentElement.append(this.#children);
        }

        assert(title, message, code) {
            let success = false;
            let error = '';

            try {
                success = Boolean(code());
            } catch(e) {
                error = 'Error ' + e.name + ': ' + e.message;
            }

            const successColor = (success ? '#00BB00' : '#990000');
            let testViewHtml = '<p style="margin: 5px 0px 5px 0px; font-weight: bold;">' + title + '</p>';
            if (error.length > 0)
                testViewHtml += '<div style="border: 1px solid #990000; background-color: #FFCCCC; padding: 5px;">' + error + '</div>';
            if (message.length > 0)
                testViewHtml += '<p style="margin: 5px">' + message + '</p>';
            testViewHtml += '<pre style="background-color: #f8f3e5; padding: 15px 10px 20px 10px; overflow: hidden;">' + code.toString() + '</pre>';
            const testView = createTag('div', {}, 'display: none; padding: 8px; margin: 8px; border: 1px solid ' + successColor, testViewHtml);
            this.#testsView.append(testView);
            
            const pin = createTag('span', {'title' : title},
               'display: inline-block; cursor: pointer; width: 10px; height: 10px; margin: 2px; background-color: ' + successColor + '; border: ' + PIN_EMPTY_BORDER);
            pin.addEventListener("click", () => {
                for (const child of this.#testsPins.children)
                    child.style.border = PIN_EMPTY_BORDER;
                const state = testView.style.display == 'none';
                for (const child of this.#testsView.children)
                    child.style.display = 'none';
                if (state) {
                    testView.style.display = 'block';
                    pin.style.border = '2px solid #000000';
                }
            });
            this.#testsPins.append(pin);

            this.#appendTest(success);
        }

        test(header, description, scopeCallback) {
            const subTests = new Tdd(header, description, this.#lvl + 1, this.#children, this);
            scopeCallback.call(subTests, subTests);
        }
    }

    if ('browser_module' in global) {
        global['browser_module'].export('tdd', () => new Tdd(), false);
    } else {
        if ('tdd' in global)
            console.warn('Module "tdd" is already exported! Ignore loading!');
        else
            global['tdd'] =  new Tdd();
    }
}) (this)