function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  //insert elements, even before Polymer is loaded

  //first element of the original document
  var firstElement = document.body.children[0];

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, firstElement);

  // insert sub footer before body-tag
  var subFooter = document.createElement('uql-connect-footer');
  document.body.appendChild(subFooter);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);


  window.addEventListener('WebComponentsReady', function() {
    // when polymer is ready - configure elements
    //set up domain for links in sub footer
    subFooter.mainDomain = 'https://www.library.uq.edu.au';
  });
}

ready(loadReusableComponents);