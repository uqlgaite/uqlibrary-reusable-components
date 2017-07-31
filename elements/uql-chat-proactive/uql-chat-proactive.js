(function () {
  Polymer({
    is: 'uql-chat-proactive',
    properties: {
      /**
       * Holds menu item objects for the call out
       */
      menuItems: {
        type: Array,
        value: []
      },
      /**
       * Holds the summary for this call out
       */
      summary: {
        type: Object
      },
      /**
       * Width of the main container
       */
      containerWidth: {
        type: Number,
        value: 280
      },

      /**
       * Whether the chat is online
       */
      _chatOnline: {
        type: Boolean,
        value: false,
        observer: '_handleChangedChatStatus'
      },

      /* all three display tabs are hidden until we ascertain the Chat Status */
      _showChatOnlineTab: {
        type: Boolean,
        value: false
      },
      _showChatOfflineTab: {
        type: Boolean,
        value: false
      },
      _showPopupChatBlock: {
        type: Boolean,
        value: false
      },

      /* it shows the offline tab straight away if we dont control it like this */
      _chatstatusupdated: {
        type: Boolean,
        value: false
      },

      numberSecondsBeforeChatTabAppears: {
        type: Number,
        value: 3000
      },

      numberSecondsBeforePopup: {
        type: Number,
        value: 10000 // 60000
      },

      cookieNameNoPopup: {
        type: String,
        value: 'noChatPopup'
      },

      /**
       * get the contacts.json details so we launch the same size popup as the regular ask us button
       */
      chatLinkItems: {
        type: Object,
        value: null
      }

    },
    ready: function () {
      var self = this;

      if (!this._isCookieSetNoPopup()) {
        // set a timer for the tab to expand to a window
        // logic - we only do this on page load (ie ready function), not whenever chat comes online.
        // we could do it when chat comes online, but that is liable to give uneven chat loads
        // particularly in the unusual event that chat is going up and down a lot
        // and it might annoy users, going up and down, if they are on the page for a while
        // the tab is always there - that is sufficient
        this.async(function () {
          if (this._chatOnline) {
            this._showPopupChatBlock = true;
            this._showChatOnlineTab = false;
          }
        }, this.numberSecondsBeforePopup);
      }
    },

    attached: function () {
      var self = this;

      // get chat status
      this.async(function () {
        this.$.chatStatusApi.addEventListener('uqlibrary-api-chat-status-loaded', function(e) {
          if(e.detail && e.detail.hasOwnProperty('online')) {
            self._chatOnline = e.detail.online;
          }
        });
        this.$.chatStatusApi.get();
        this._chatstatusupdated = true;
      }, this.numberSecondsBeforeChatTabAppears);

      // get contact data - it holds popup details for chat

      // DO NOT REMOVE!! gulp vulcanize task will replace 'null' with json data and thus avoid a live api call
      var contactsJsonFileData = null;
      // we are using this data to get the same size popup as the other chat methods
      var contactsJson = contactsJsonFileData;

      if (contactsJson !== null) {
        this._setData(contactsJson);
      } else {
        this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
          self._setData(e.detail);
        });
        this.$.contactsApi.get();
      }
    },

    /**
     * Called when the chat status has changed, eg uqlibrary-api-chat-status-loaded has fired. Updates display status
     */
    _handleChangedChatStatus: function () {
      if (this._chatOnline) {
        this._showChatOnlineTab = true;
        this._showChatOfflineTab = false;
      } else if (this._chatstatusupdated) {
        this._showChatOnlineTab = false;
        this._showPopupChatBlock = false;
        this._showChatOfflineTab = true;
      }
    },

    /*
     * called when the uses clicks the 'x' button or 'maybe later'
     */
    _closeDialog: function() {
      this._setCookieNoPopup();
      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;
    },

    /**
     * Returns the relevant link for this item
     * @param item
     * @returns {*}
     * @private
     */
    _link: function (item) {
      if (item.linkMobile && this._isMobile()) {
        return item.linkMobile;
      } else {
        return item.link;
      }
    },

    /**
     * open a link for any Contact object
     * @param item
     * @private
     */
    _openWindow: function (item) {
      // Check if this item has a custom "target" attribute
      if (item.target) {
        if (this._isMobile()) {
          // On mobile we ignore the targetOptions
          window.open(this._link(item), item.target);
        } else {
          window.open(this._link(item), item.target, item.targetOptions || "");
        }
      } else {
        window.location = this._link(item);
      }
    },

    /**
     * Called when chat now is clicked.
     */
    openChat: function () {
      this._openWindow(this.chatLinkItems);
    },

    /**
     *
     * called when 'leave a question' is clicked
     */
    openContactForm: function() {
      this._openWindow(this.contactLinkItems);
    },

    /**
     * Returns whether the user is on a mobile device
     * @returns {boolean}
     * @private
     */
    _isMobile: function () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * extracts the relevant display items from the contacts array
     * @param data
     * @private
     */
    _setData: function (data) {
      tempitem = data.items.filter(function(item) {
        return (item.label === 'Chat');
      });
      this.chatLinkItems = tempitem[0];

      tempitem = data.items.filter(function(item) {
        return (item.label === 'Contact form');
      });
      this.contactLinkItems = tempitem[0];
    },

    /**
     * Gets a cookie by name
     * @param name the name of the cookie to return
     * @returns {String}
     * @private
     */
    _getCookie: function (name) {
      var parts = document.cookie.split(";");
      for (var i = 0, l = parts.length; i < l; i++) {
        var cookieParts = parts[i].trim().split('=');
        if (cookieParts[0] === name) {
          return cookieParts[1];
        }
      }
    },

    /**
     * set a cookie so the user doesnt see the popup for the rest of the session
     * @private
     */
    _setCookieNoPopup: function() {
      document.cookie=this.cookieNameNoPopup + "=true; expires=0; path=" + this.getDomain(window.location.hostname);
    },

    /**
     * check if the nopop cookie has been set
     * @returns {boolean}
     * @private
     */
    _isCookieSetNoPopup: function() {
      cookie = this._getCookie(this.cookieNameNoPopup);
      return (typeof cookie !== "undefined");
    },

    /**
     * get the domain that should be written to the cookie
     * we cant hit all the possible domains at the same time,
     * but we can at least a generic library one, rather than only the subdomain
     * @param currentHostname
     */
    getDomain: function(currentHostname) {
      var cookiePath;
      var libraryRegExp = /(.*).library.uq.edu.au/i;
      if (libraryRegExp.test(currentHostname))  {
        // If we are on a library subdomain, use library root domain.
        cookiePath = '.library.uq.edu.au';
      } else {
        // Otherwise, eg studenthub.uq.edu.au, use that domain, without any www
        var otherRegExp = /www.(.*)/i;
        if (otherRegExp.test(currentHostname)) {
          cookiePath = currentHostname.substring(4);
        } else {
          cookiePath = '.' + currentHostname;
        }
      }
console.log('writing cookie for domain '+cookiePath);
      return cookiePath;
    }

  });
})();