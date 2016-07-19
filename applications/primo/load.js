function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  addAppleTouchIcon();

  modifyUserAreaTile();

  //show notification bar if user is not logged in
  loadSigninNotification();

  listenToLoginStatusChanges();

  moveRefineResultDropdown();

  //first element of the original document
  var firstElement = document.body.children[0];

  // insert alerts after body-tag
  var alerts = document.querySelector('uqlibrary-alerts');
  if (!alerts) {
    //as a back up insert header if it's not defined already
    alerts = document.createElement('uqlibrary-alerts');
    document.body.insertBefore(alerts, firstElement);
  }

  // insert header after alerts
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, firstElement);

  // insert sub footer before body-tag
  var subFooter = document.createElement('uql-connect-footer');
  document.body.appendChild(subFooter);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);

  window.addEventListener('WebComponentsReady', function () {
    // when polymer is ready - configure elements
    header.showLoginButton = false;
    header.showAppsButton = true;

  });

  displayPublicationDates();
}

function displayPublicationDates() {
  // Use the Primo supplied function to preload the start and end dates in the Publication Date facet
  // function found in http://search.library.uq.edu.au/primo_library/libweb/wro/primo_library_web.js
  onTBChange('start');
  onTBChange('end');
}

function loadUQFavicon() {
  var link = document.createElement('link'),
      href = '//assets.library.uq.edu.au/master/reusable-components/resources/favicon.ico';
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = href;
  document.getElementsByTagName('head')[0].appendChild(link);
  link.rel = 'icon'; //for IE
  document.getElementsByTagName('head')[0].appendChild(link);

}

function addAppleTouchIcon() {
  // replace apple-touch-icon
  var appleTouchIconlink = $('link[rel="apple-touch-icon"]'),
      link = document.createElement('link'),
      sizes = ['152x152', '120x120', '76x76'],
      rel = 'apple-touch-icon',
      href = '//assets.library.uq.edu.au/master/reusable-components/resources/images/apple-touch-icon.png';

  if (appleTouchIconlink) {
    appleTouchIconlink.attr('href', href);
  } else {
    link.rel = rel;
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i],
        iconLink = document.createElement('link');
    iconLink.rel = rel;
    iconLink.sizes = size;
    iconLink.href = href.replace('icon.png','icon-' + size + '.png');
    document.getElementsByTagName('head')[0].appendChild(iconLink);
  }
}

/* Call primo defined method isUserLoggedIn() to check users login status, show the notification if the user is not logged in */
function loadSigninNotification() {
  if (isUserLoggedIn())
    return;
  if ($('#signInPrompt').length > 0) /* prevents a double sign-in on some pages */
    return;
  if ($('body').hasClass('MyAccount')) /* don't repeat sign-in prompt on E-Shelf page */
    return;

  /* get the login address from the signin link already generated by primo */
  var signInLink = $('#exlidSignIn a').attr('href');

  //put the notification bar in the feedback area which is sitting right after search bar
  var container = $('#exlidHeaderSystemFeedback');
  container.prepend('<div id="alert-container"><div id="alert-icon-container"></div><div id="alert-text-container"><a aria-label="Log in" href="' + signInLink + '">Log in</a> to access full text, more search results and more services. Refresh this page if you are logged in but still see this message.</div>');
}

function modifyUserAreaTile() {
  var userAreaRibbon = $('#exlidUserAreaTile #exlidUserAreaRibbon');

  if (userAreaRibbon) {

    var myAccount = userAreaRibbon.find('#exlidMyAccount'),
        myShelf = userAreaRibbon.find('#exlidMyShelf'),
        hiddenClass = 'EXLHidden';

    // move signin and signout button next to the user name
    userAreaRibbon.find('.EXLLastItem').insertAfter(userAreaRibbon.find('#exlidUserName'));

    if (isUserLoggedIn()){
      // undo not logged in changes
      if (myAccount.hasClass(hiddenClass)) {
        myAccount.removeClass(hiddenClass);
        myShelf.children('span').remove();
      }

      // add saved searches and alerts link
      var savedSearches = $('<li id="exlidSavedSearches" class="EXLSavedSearches"><a href="query.do?fn=display">Saved searches & alerts</a></li>');
      myShelf.after(savedSearches);

    } else {
      if ($('#exlidSavedSearches')){
        $('#exlidSavedSearches').remove();
      }
      // hide my account link
      myAccount.addClass(hiddenClass);

      // insert a login reminder after myself
      myShelf.append('<span> - temporary if not logged in</span>');
    }
  }

}

// add a event on fadein, this is to solve session timeout issue,
// when session timeout, primo will trigger an ajax call via function ssoByAjax then update the user login status
function listenToLoginStatusChanges() {
  var _old = $.fn.fadeIn;

  $.fn.fadeIn = function(){
    var self = this;
    _old.apply(this,arguments).promise().done(function(){
      self.trigger('fadeIn');
    });
  };

  $('#exlidSignOut').on('fadeIn',function(){
    location.reload();
  });
}

// for mobile only
function moveRefineResultDropdown() {
  var target = document.querySelector('.EXLSearchFieldRibbon');

  if (target) {
    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var nodeList = mutation.addedNodes;
        if (nodeList.length > 0) {
          for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];
            if (node.id === 'EXLFacetsMobile') {
              $('#exlidHeaderSearchLimits').after(node);

            }
          }
        }
      });
    });

    // configuration of the observer:
    var config = {childList: true};

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  }
}

ready(loadReusableComponents);


// load google analytics
(function (i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      };

  i[r].l = 1 * new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-4365437-14', 'auto');
ga('send', 'pageview');
