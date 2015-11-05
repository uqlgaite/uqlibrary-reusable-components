/* global menuJson:false */
window.addEventListener('WebComponentsReady', function() {
  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, document.body.children[0]);

  // insert menu after header
  var menu = document.createElement('uql-menu');
  menu.menuJson = menuJson;
  header.appendChild(menu);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);
});