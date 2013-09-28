var objects = require('../src/atropa-objects.js');

try {
    Object.keys(objects).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = objects[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-objects.js');
}

Object.keys(objects.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = objects.data[prop];
    }
);
