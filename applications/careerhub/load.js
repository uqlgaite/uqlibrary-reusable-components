function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  addBreadcrumbs('#head');

  relabelMoreEventsLink();

  reformatSidebarDates();

  addAppleTouchIcon();

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



// nodevalue works in ie and chrome, but ie isnt picking up the d = new Date setting
  // actually, msec is NAN
  // is thedate not really a string???

var listDates = document.querySelectorAll('.upcomingEvents .body li');
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var unformattedDate, d, theDay, displayNode, dayElement, theMonth, monthElement, dateElement, childNode;
  [].forEach.call(listDates, function(listItem) {
    unformattedDate = listItem.querySelector('span.caption');
    if (unformattedDate !== null) {

      if (unformattedDate.firstChild.innerHTML) {
console.log("using firstChild.innerHTML");
console.log(unformattedDate.firstChild.innerHTML);
        thedate = unformattedDate.firstChild.innerHTML;
      } else {
        if (unformattedDate.firstChild.nodeValue) {
console.log("using firstChild.nodeValue");
          console.log(unformattedDate.firstChild.nodeValue);
          thedate = unformattedDate.firstChild.nodeValue;
        } else {
          if (unformattedDate.firstChild) {
console.log("using firstChild");
            console.log(unformattedDate.firstChild);
            thedate = unformattedDate.firstChild;
          }
        }

      }
console.log("thedate = "+thedate);
      var msec = Date.parse(thedate);
      d = new Date(msec);
console.log("d: "+d);
      // make day element
      theDay = d.getDate();
//console.log("theDay: "+theDay);
      displayNode = document.createTextNode(theDay);
      dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.appendChild(displayNode);

      // make month element
      theMonth = monthNames[d.getMonth()];
//console.log("theMonth: "+theMonth);
      displayNode = document.createTextNode(theMonth);
      monthElement = document.createElement('div');
      monthElement.className = 'month';
      monthElement.appendChild(displayNode);

      // add to list item
      dateElement = document.createElement('div');
      dateElement.className = 'formattedDate';
      dateElement.appendChild(dayElement);
      dateElement.appendChild(monthElement);

      childNode = listItem.querySelector('a');
      listItem.insertBefore(dateElement, childNode);
    }

  });
  return true;
}

/**
 * add breadcrumbs to the top of a careerhub page
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


  // create second breadcrumb entry: careerhub workgroup homepage
  var linktext = 'Library staff development';
  var urlCareerHubHomePage = 'https://www.careerhub.uq.edu.au/workgroups/library-staff-development';
  var urlCareerHubListPage = urlCareerHubHomePage + '/events'

  var childElement;
  var displayNode;
  if (window.location.href != urlCareerHubHomePage) {
    childElement = document.createElement('a');
    childElement.href = urlCareerHubHomePage;
  } else {
    // spans required for css
    childElement = document.createElement('span');
  }
  displayNode = document.createTextNode(linktext);
  childElement.appendChild(displayNode);

  anLI = document.createElement('li');
  anLI.appendChild(childElement);
  breadcrumbList.appendChild(anLI);



  var theLabel;
  // On the careerhub event page, event titles have a class of 'event_title'
  var testElement = document.querySelector('.event_title');
  if (testElement !== null) {
    // an event class means we are on a detail page

    // third breadcrumb
    theLabel = 'Event List';

    displayNode = document.createTextNode(theLabel);
    childElement = document.createElement('a');
    childElement.href = urlCareerHubListPage;
    childElement.appendChild(displayNode);

    anLI = document.createElement('li');
    anLI.appendChild(childElement);
    breadcrumbList.appendChild(anLI);

    // fourth breadcrumb
    // display the event's title as an unlinked breadcrumb
    var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
    theLabel = testElement[textProperty];
    displayNode = document.createTextNode(theLabel);
    childElement = document.createElement('span');
    childElement.appendChild(displayNode);

    anLI = document.createElement('li');
    anLI.appendChild(childElement);
    breadcrumbList.appendChild(anLI);
  } else {
    if (window.location.href != urlCareerHubHomePage) {
      // third breadcrumb
      theLabel = 'Event List';

      displayNode = document.createTextNode(theLabel);
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

  parentBlock.insertBefore(breadcrumbList, parentBlock.firstChild);

  return true;
}

/**
 * find the specific link on the page and relabel it
 * @returns {boolean}
 */
function relabelMoreEventsLink() {
  // we are doing this because the following line:
  // document.querySelector(".sidebar > a");
  // returns null so we cant target the specific link (doesnt like the child selector) :(

  var urlEventsPage = 'https://www.careerhub.uq.edu.au/workgroups/library-staff-development/events';
  var links = document.querySelectorAll('.sidebar a');

  var theLink;
  [].forEach.call(links, function(links) {
    if (urlEventsPage == links.href) {
      if (!links.firstChild) {
        return false;
      }

      theLink = links.firstChild;
      if (!theLink.data) {
        return false;
      }

      theLink.data = 'More events';

    }
  });
  return true;
}


ready(loadReusableComponents);
