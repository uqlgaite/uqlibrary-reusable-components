var urlStudentHubHomePage = "https://"+window.location.hostname+"/workgroups/library-staff-development";
// note: function isHomePage also hard codes this path

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  addAppleTouchIcon();

  addBreadcrumbs('#head');

  relabelMoreEventsLink();

  reformatSidebarDates();

  reformatSummaryElement();

  //insert elements, even before Polymer is loaded

  //first element of the original document
  var firstElement = document.body.children[0];

  //insert alerts before header
  var alerts = document.querySelector('uqlibrary-alerts');
  if (!alerts) {
    //as a back up insert header if it's not defined already
    alerts = document.createElement('uqlibrary-alerts');
    document.body.insertBefore(alerts, firstElement);
  }

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
    header.showLoginButton = false;
  });

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

function reformatSidebarDates() {
  // the date needed reformatting because css cant format 19-Sep-2016 as 19\nSep
  var listDates = document.querySelectorAll('.upcomingEvents .body li');
  if (listDates === null) {
    return false;
  }

  var unformattedDate, theDay, displayNode, dayElement, theMonth, monthElement, dateElement, childNode, datebits, ii;
  if (0 < listDates.length) {
    for (ii = 0; ii < listDates.length; ii++) {
      unformattedDate = listDates[ii].querySelector('span.caption');
      if (unformattedDate !== null) {

        var thedate = "";
        if (unformattedDate.firstChild.innerHTML) {
          thedate = unformattedDate.firstChild.innerHTML;
        } else {
          if (unformattedDate.firstChild.nodeValue) {
            thedate = unformattedDate.firstChild.nodeValue;
          } else {
            if (unformattedDate.firstChild) {
              thedate = unformattedDate.firstChild;
            }
          }

        }
        datebits = thedate.split("-");
        if (datebits.length > 2 && datebits[0] !== null && datebits[1] !== null) {
          listDates[ii].className = 'reformatted';

          // make day element
          theDay = datebits[0];
          displayNode = document.createTextNode(theDay);
          dayElement = document.createElement('div');
          dayElement.className = 'day';
          dayElement.appendChild(displayNode);

          // make month element
          theMonth = datebits[1];
          displayNode = document.createTextNode(theMonth);
          monthElement = document.createElement('div');
          monthElement.className = 'month';
          monthElement.appendChild(displayNode);

          // add to list item
          dateElement = document.createElement('div');
          dateElement.className = 'formattedDate';
          dateElement.appendChild(dayElement);
          dateElement.appendChild(monthElement);

          childNode = listDates[ii].querySelector('a');
          listDates[ii].insertBefore(dateElement, childNode);
        }
      }

    }
  }
  return true;
}

/**
 * sadly, the Studenthub homepage runs from multiple urls, so a little function to check for it
 * @returns {boolean}
 */
function isHomePage() {
  var regexp = /https?:\/\/((www\.)?(careerhub|studenthub)\.uq\.edu\.au)\/workgroups\/library-staff-development\/?$/;
  return regexp.test(window.location.href);
}



/**
 * add breadcrumbs to the top of a Studenthub page
 * example usage: addBreadcrumbs('#head');
 *
 * @param parentElementIdentifier
 * @returns {boolean}
 */
function addBreadcrumbs(parentElementIdentifier) {
  var parentBlock = document.querySelector(parentElementIdentifier);
  if (parentBlock === null) {
    return false;
  }

  // create ol
  var breadcrumbList = document.createElement('ol');
  breadcrumbList.className = 'breadcrumbList';

  // create first breadcrumb entry: home page
  // <paper-icon-button icon="home"></paper-icon-button>
  var homepageIcon = document.createElement('paper-icon-button');
  homepageIcon.icon= 'home';
  var homePageLink = 'https://www.library.uq.edu.au/';

  var anAnchor = document.createElement('a');
  anAnchor.href = homePageLink;
  anAnchor.appendChild(homepageIcon);

  var anLI = document.createElement('li');
  anLI.appendChild(anAnchor);
  breadcrumbList.appendChild(anLI);


  // create second breadcrumb entry: Studenthub workgroup homepage
  var linktext1 = 'Library ';
  var linktext2 = 'staff development';

  var childElement;
  var displayNode;

  anLI = document.createElement('li');
  anLI.className = 'staffdevhomepage';

  if (isHomePage()) {
    // spans required for css
    childElement = document.createElement('span');
  } else {
    childElement = document.createElement('a');
    childElement.href = urlStudentHubHomePage;
  }
  var displayNode1 = document.createTextNode(linktext1);
  var childElement1 = document.createElement('span');
  childElement1.appendChild(displayNode1);
  childElement.appendChild(childElement1);

  displayNode = document.createTextNode(linktext2);
  childElement.appendChild(displayNode);

  anLI.appendChild(childElement);
  breadcrumbList.appendChild(anLI);


  // On the Studenthub event page, event titles have a class of 'event_title'
  var testElement = document.querySelector('.event_title');

  // third breadcrumb
  var theLabel = 'Event list';
  displayNode = document.createTextNode(theLabel);
  if (testElement !== null) {
    // we are on an event page - make this a link
    childElement = document.createElement('a');
    childElement.href = urlStudentHubHomePage + '/events';
    childElement.appendChild(displayNode);

    anLI = document.createElement('li');
    anLI.appendChild(childElement);
    breadcrumbList.appendChild(anLI);

  } else {
    if (!isHomePage()) {
      childElement = document.createElement('span');
      childElement.appendChild(displayNode);

      anLI = document.createElement('li');
      anLI.appendChild(childElement);
      breadcrumbList.appendChild(anLI);

      // add class to body so we know its the list page
      newclassName = ' listpage';
      document.body.className+= newclassName;
    }
  }


  // fourth breadcrumb
  if (testElement !== null) {
    // an event class means we are on a detail page

    // for desktop, display the event's title as an unlinked breadcrumb
    // for mobile, display 'event details' - some of the titles are long
    anLI = document.createElement('li');

    var mobileLabel = 'Event details';
    displayNode = document.createTextNode(mobileLabel);
    childElement = document.createElement('span');
    childElement.className = 'mobileOnly';
    childElement.appendChild(displayNode);
    anLI.appendChild(childElement);

    var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
    var nonMobileLabel = testElement[textProperty];
    displayNode = document.createTextNode(nonMobileLabel);
    childElement = document.createElement('span');
    childElement.className = 'nonMobile';
    childElement.appendChild(displayNode);
    anLI.appendChild(childElement);

    breadcrumbList.appendChild(anLI);
  }

  parentBlock.insertBefore(breadcrumbList, parentBlock.firstChild);

  return true;
}

/**
 * find the specific link on the page and relabel it
 * @returns {boolean}
 */
function relabelMoreEventsLink() {
  // we are using querySelectorAll because the following line:
  // document.querySelector(".sidebar > a");
  // returns null so we cant target the specific link (doesnt like the child selector) :(

  var newLabel = 'More events';

  var urlEventsPage = urlStudentHubHomePage+'/events';
  var links = document.querySelectorAll('.sidebar a');
  if (links === null) {
    return false;
  }

  var theLink, ii;
  if (0 < links.length) {
    for (ii = 0; ii < links.length; ii++) {
      if (urlEventsPage == links[ii].href) {
        if (!links[ii].firstChild) {
          return false;
        }

        theLink = links[ii].firstChild;
        if (theLink === null || !theLink.data) {
          return false;
        }

        theLink.data = newLabel;

      }
    }
  }
  return true;
}

function reformatSummaryElement() {
  // the summary p element wraps all the way back to the left, under the icon
  // child it into a div (display: inline) and we can use the left margin to stop that
  var parentBlock = document.querySelector('.event_summary');
  if (parentBlock === null) {
    return false;
  }

  var existingParagraph = document.querySelector('.event_summary p');
  if (existingParagraph === null) {
    return false;
  }

  var newDiv = document.createElement('div');
  if (newDiv === null) {
    return false;
  }
  newDiv.className = 'uqlsummary';
  parentBlock.appendChild(newDiv);

  var fragment = document.createDocumentFragment();
  if (fragment === null) {
    return false;
  }
  fragment.appendChild(existingParagraph);
  newDiv.appendChild(fragment);

}


ready(loadReusableComponents);
