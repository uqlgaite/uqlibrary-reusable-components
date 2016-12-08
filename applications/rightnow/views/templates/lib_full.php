<!DOCTYPE html>
<html lang="#rn:language_code#">
<rn:meta javascript_module="standard"/>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>UQ Library FAQ Answers</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!--[if lt IE 9]><script src="/euf/core/static/html5.js"></script><![endif]-->
  <rn:widget path="search/BrowserSearchPlugin" pages="home, answers/list, answers/detail" />
  <!--
  <rn:theme path="/euf/assets/themes/uqola" css="
  {YUI}/widget-stack/assets/skins/sam/widget-stack.css,
  {YUI}/widget-modality/assets/skins/sam/widget-modality.css,
  {YUI}/overlay/assets/overlay-core.css,
  {YUI}/panel/assets/skins/sam/panel.css" />
  -->
  <rn:theme path="/euf/assets/themes/uqola" css="
{YUI}/widget-stack/assets/skins/sam/widget-stack.css" />
  <rn:head_content/>
  <link href="/euf/assets/themes/uqola/uq-crm-styles.css" type="text/css" rel="stylesheet">

  <!--
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  -->
  <link rel="icon" href="images/favicon.png" type="image/png"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

  <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/master/reusable-components/resources/favicon.ico">
  <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
  <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
  <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
  <script src="//assets.library.uq.edu.au/rightnow/reusable-components/rightnow/load.js" async></script>
  <link rel="stylesheet" href="//assets.library.uq.edu.au/rightnow/reusable-components/rightnow/custom-styles.css" />

</head>

<body class="yui-skin-sam yui3-skin-sam library">
<div id="rn_Container" >
  <div id="rn_SkipNav"><a href="#rn_MainContent">#rn:msg:SKIP_NAVIGATION_CMD#</a></div>

  <!-- PAGE TITLE -->
  <div class="row">
    <div class="small-12 large-12 columns">

    </div>
  </div>
</div>

<!-- there should be a chunk more right here, but havent yet found a way to set the page title by a variable -->

<rn:page_content/>

<!-- LIBRARY SIDEBAR -->

<div class="rn_AskQuestion">
  <div id="uq_AskQuestionContent">
    <h2>AskUs contacts </h2>

    <ul>

      <?php /* ?>
<li class="conditionalWidget">
<rn:widget path="chat/ConditionalChatLink" chat_login_page="/app/chat/chat_launch_lib"
label_available_immediately_template="Chat - online now"
label_available_with_wait_template="Chat - online now"
    label_unavailable_busy_template="Chat is offline"
    label_unavailable_hours="Chat is offline"
label_default="Chat - online now"
/>
</li>
<?php */ ?>

      <li class="syndicatedWidget">
        <div id="myChatLinkContainer">
          <div id="myChatLink">
            <div id="myChatLinkInfo">
            </div>
          </div>
        </div>
      </li>


      <li class="hasIcon">
        <span><a aria-hidden="true"><iron-icon icon="search"></iron-icon></a></span>
        <rn:widget path="navigation/NavigationTab" label_tab="Search Library FAQs" link="/app/library/faqs" pages="uqola_support, library/answers/list, library/answers/detail, library/answers/intent, ask_confirm, library/lts_contact"/>
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true" href="tel:61733464312"><iron-icon icon="communication:call"></iron-icon></a></span>
        <a href="tel:61733464312">+ 61 7 334 64312</a>
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true" href="/app/library/contact"><iron-icon icon="communication:import-contacts"></iron-icon></a></span>
        <a href="/app/library/contact">Contact form</a>
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true" href="mailto:askus@library.uq.edu.au"><iron-icon icon="communication:email"></iron-icon></a></span>
        <a href="mailto:askus@library.uq.edu.au">askus@library.uq.edu.au</a>
      </li>
      <li>
        <a href="http://www.library.uq.edu.au/contact-us">More ways to contact us</a>
      </li>
      <li>

        <?php /*
<rn:widget path="chat/ChatHours" label_chat_hours="Chat & phone opening hours" />
 */ ?>

        <script src="//api3.libcal.com/js/hours_grid.js?002"></script>
        <div class="libcal-hours-block">
          <h3>Chat & phone hours this week</h3>
          <div id="libcal-hours-block"></div>
        </div>
        <script>
          $(function(){
            const LibCalUQID = 3633;
            const LibCalIdChatServicePoint = 4986;
            var theWeeks = new $.LibCalWeeklyGrid( $("#libcal-hours-block"), { iid: LibCalUQID, lid: LibCalIdChatServicePoint,  weeks: 1 });

          });
        </script>

      </li>
    </ul>

  </div>
  <!-- LIBRARY SIDEBAR -->




</div>
</div>
</div>
<!-- CONTENT -->


</div>


<!-- syndicatedWidget -->
<?php /* */ ?>
<script type="text/javascript" src="https://uqcurrent.widget.custhelp.com/euf/rightnow/RightNow.Client.js"></script>
<script type="text/javascript">
  RightNow.Client.Controller.addComponent(
    {
      chat_login_page: "/app/chat/chat_launch_lib",
      container_element_id: "myChatLinkContainer",
      info_element_id: "myChatLinkInfo",
      label_default: "Chat - online now",
      label_available_immediately_template: "Chat - online now",
      label_unavailable_busy_template: "Chat is offline",
      label_unavailable_hours: "Chat is offline",
      link_element_id: "myChatLink",
      p: "45",
      instance_id: "sccl_2",
      module: "ConditionalChatLink",
      type: 7
    },
    "https://uqcurrent.widget.custhelp.com/ci/ws/get"
  );
</script>
<?php /* */ ?>

</body>
</html>
