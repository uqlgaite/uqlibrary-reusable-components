function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  //show notification bar if user is not logged in
  loadSigninNotification();

  moveActions();

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
  });
}

function loadUQFavicon() {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = '//assets.library.uq.edu.au/reusable-components/resources/favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);
  link.rel = 'icon'; //for IE
  document.getElementsByTagName('head')[0].appendChild(link);
}

function createActions() {
  var results = document.querySelectorAll('.EXLResultTabs');

  for (var index = 0; index < results.length; index++) {
    results[index].appendChild('<li class="EXLResultTab">Actions</li>');
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
  container.prepend('<div id="alert-container"><div id="alert-icon-container"></div><div id="alert-text-container"><a aria-label="Log in" href="' + signInLink + '">Log in</a> to access full text, more search results and more services</div>');
}

ready(loadReusableComponents);


/* MOVE THE ITEM ACTIONS OUT OF THE TABS
 -----------------------------------------------------------------
 The following code moves the Item Actions (Share/Save) menu out
 of Primo's tabs and places it with the result records for easy
 access. The actions are stored in a dropdown menu but other
 buttons can be added directly to the created toolbar.

 Last edited 2016.02.22 by Kate Deibel
 */

/* -------------------------------------- */
/* UNCOMMENT ONE OF THE TWO OPTIONS BELOW */
/* -------------------------------------- */

/* OPTION 1: Uncomment the code below if using the MutationSupport widget */
//AddMutation('tr.EXLResult td.EXLSummary', addItemActionsToResult, false); // Brief Results
//AddMutation('.EXLFullView .EXLResult .EXLTabHeaderButtonSendToList', addItemActionsToResult); // Full Display

/* OPTION 2: Uncomment the code below if NOT using MutationSupport */
jQuery(document).ready(function () {
  jQuery('tr.EXLResult td.EXLSummary').each(function (i, elem) {
    addItemActionsToResult(elem);
  });
  jQuery('.EXLFullView .EXLResult .EXLTabHeaderButtonSendToList').each(function (i, elem) {
    addItemActionsToResult(elem);
  });
});


/* Main generator function for moving the item actions (Share/Save) out
 of the tabs.
 */
function addItemActionsToResult(elem) {
  /* set parameters */
  var $result;
  if (isFullDisplay()) {
    $result = jQuery('.EXLResult');
  }
  else {
    $result = jQuery(elem).parent();
  }
  /* create the tool generator */
  var toolsGen = new PrimoItemTools($result);
  /* generate the toolbar */
  var toolbarObject = generateToolbar($result, toolsGen);
  $result.find('.EXLSummaryFields').prepend(toolbarObject.toolbar);
  toolbarObject.dropdown.FitDropDown();

  /* if on brief display, add a click event to the default e-shelf link to to toggle
   the new e-shelf buttons */
  if (!isFullDisplay()) {
    $result.find('td.EXLMyShelfStar a').on('click', {index: toolsGen.index}, function (event) {
      var $stars = jQuery('.eshelf-button-class-' + event.data.index);
      $stars.each(function (i, elem) {
        var $this = jQuery(elem);
        if ($this.hasClass('off_shelf')) {
          $this.attr('title', 'Remove record from e-Shelf');
        }
        else {
          $this.attr('title', 'Add record to e-Shelf');
        }
        $this.toggleClass('on_shelf off_shelf');
      });
      return false;
    });
  }
}

/* Helper function for moving the toolbar.
 NOTE:
 If you wish to have buttons outside of the dropdown menu, you can insert
 them here as indicated by the comments.
 */
function generateToolbar($result, toolsGen) {
  /********************************************************
   Configure the button text and hovertext for the dropdown menu
   ********************************************************/
  var buttonText = 'Share/Save';
  var buttonTitle = 'Show actions for this item';
  /********** END EDITABLE CODE **********/

  var index = toolsGen.index;
  /* ids */
  var containerID = 'localidItemToolsContainer-' + (index);
  var dropdownID = 'item-tools-dropdown-' + (index);

  /* create the toolbar */
  var toolbarContainer = jQuery('<div class="localItemToolsContainer">');
  toolbarContainer.attr('id', containerID);
  var toolbar = jQuery('<div class="localItemTools">');
  toolbarContainer.append(toolbar);

  /********************************************************
   Add a tool button to the toolbar (not in the dropdown)
   ********************************************************/
  //toolbar.append( generateInlineItemToolButton(toolsGen.eShelf(), index) );
  //toolbar.append( generateInlineItemToolButton(toolsGen.Permalink(), index) );
  //toolbar.append( generateInlineItemToolButton(toolsGen.Citation(), index) )
  /********** END EDITABLE CODE **********/

  /* create the dropdown */
  var dropdownMenu = jQuery('<div class="localItemToolsMenu">');

  /* Handle the z-index so that menus properly overlap each other */
  dropdownMenu.css('z-index', 150 - (index % 50));

  /* Load the tools into the dropdown */
  var dropdownWidget = generateItemToolDropdown(toolsGen, dropdownID, buttonText, buttonTitle);

  dropdownMenu.append(dropdownWidget.GetMenu());
  toolbar.append(dropdownMenu);

  /* ensure that the dropdown has proper width */
  dropdownWidget.FitDropDown();

  return {toolbar: toolbarContainer, dropdown: dropdownWidget};
}

/* Helper function for generating an inline item tool button (one not in the
 dropdown menu)
 */
function generateInlineItemToolButton(tool, index) {
  var toolDiv = jQuery('<div>');
  /* adjust the id and name to reflect that this is a toolbar item */
  tool.attr('id', tool.attr('id') + '-toolbar');
  tool.attr('name', tool.attr('name') + '-toolbar');
  /* z-index maxes at 150 for tool items, so we subtract index % 50 to make
   proper overlapping */
  tool.css('z-index', (150 - (index % 50)));
  toolDiv.append(tool);
  return toolDiv;
}

/* Generate the item action dropdown menu (Share/Save).
 You control what appears and their ordering.
 */
function generateItemToolDropdown(toolsGen, id, text, title) {
  var dropdown = new PrimoDropDown(id);
  dropdown.ButtonTitle(title);
  dropdown.ButtonText('', text, 'Click/Enter to show actions');

  /********************************************************
   Add the tool buttons to the dropdown. You control the
   order and what appears.
   ********************************************************/
  dropdown.AddButtonItem(toolsGen.eShelf());
  dropdown.AddButtonItem(toolsGen.Email());
  dropdown.AddButtonItem(toolsGen.Print());
  dropdown.AddButtonItem(toolsGen.Permalink());
  dropdown.AddButtonItem(toolsGen.Citation());
  dropdown.AddButtonItem(toolsGen.EndNote());
  dropdown.AddButtonItem(toolsGen.RefWorks());
  dropdown.AddButtonItem(toolsGen.EasyBib());
  dropdown.AddButtonItem(toolsGen.ExportRIS());
  /********** END EDITABLE CODE **********/

  return dropdown;
}