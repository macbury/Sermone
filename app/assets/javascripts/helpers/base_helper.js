
Handlebars.registerHelper('t', function(key) {
  return new Handlebars.SafeString(I18n.t(key))
});

Handlebars.registerHelper('translateAttr', function(options) {
  var attrs, result;
  attrs = options.hash;
  result = [];

  Em.keys(attrs).forEach(function(property) {
    var translatedValue;
    translatedValue = I18n.t(attrs[property]);
    return result.push('%@="%@"'.fmt(property, translatedValue));
  });

  return new Handlebars.SafeString(result.join(' '));
});