(function () {
  Polymer({
    is: 'uql-callout-button',
    properties: {
      /**
       * Sets the width of the callout window
       */
      calloutWidth: {
        type: Number,
        value: 280
      },
      /**
       * The menu for the callout. See http://github.com/uqlibrary/uqlibrary-callout for more details
       */
      calloutItems: {
        type: Object,
        observer: "_calloutItemsChanged"
      },
      /**
       * Icon to be used in the paper-button
       */
      icon: {
        type: String,
        value: "social:people"
      },
      /**
       * Label to place on the paper-button
       */
      buttonLabel: {
        type: String,
        value: "My button"
      },
      /**
       * Class for the paper button
       */
      buttonClass: {
        type: String,
        value: "button-colored-theme"
      }
    },
    ready: function () {

    },
    _calloutItemsChanged: function () {
      this.$.callout.menu = this.calloutItems;
    },
    /**
     * Opens the Ask Us callout. Calculates whether to move the whole callout and/or the arrow
     * @private
     */
    _openCallout: function () {
      this._alignCallout();

      this.$.dropdown.open();
    },
    /**
     * Aligns the callout appropriate to the screen
     * @private
     */
    _alignCallout: function () {
      var screenWidth = window.innerWidth || document.getElementsByTagName('body')[0].clientWidth;
      var buttonBounds = this.$.button.getBoundingClientRect();

      if (this._canFitRight(screenWidth, buttonBounds)) {
        // Right align the callout
        this._alignRight();
      } else if (this._canFitCenter(screenWidth, buttonBounds)) {
        // Center align the callout
        this._alignCenter(buttonBounds);
      } else if (this._canFitLeft(screenWidth, buttonBounds)) {
        this._alignLeft(buttonBounds);
      } else {
        this._alignCenterScreen(buttonBounds, screenWidth);
      }
    },
    /**
     * Aligns the callout to the left of the button
     * @param buttonBounds
     * @private
     */
    _alignLeft: function (buttonBounds) {
      this.$.dropdown.horizontalOffset = 0 - this.calloutWidth + (buttonBounds.width);

      this.$.callout.arrowHorizontalAlign = "left";
      this.$.callout.arrow = true;
    },
    /**
     * Aligns the callout on the right of the button
     * @private
     */
    _alignRight: function () {
      this.$.dropdown.horizontalOffset = 0;

      this.$.callout.arrowHorizontalAlign = "right";
      this.$.callout.arrow = true;
    },
    /**
     * Aligns the callout on the center of the button
     * @param buttonBounds
     * @private
     */
    _alignCenter: function (buttonBounds) {
      this.$.dropdown.horizontalOffset = 0 - (this.calloutWidth - buttonBounds.width) / 2;
      this.$.callout.arrowHorizontalAlign = "center";
      this.$.callout.arrow = true;
    },
    /**
     * Aligns the callout on the center of the screen
     * @param buttonBounds
     * @param screenWidth
     * @private
     */
    _alignCenterScreen: function (buttonBounds, screenWidth) {
      var desiredX = (screenWidth - (screenWidth - this.calloutWidth) / 2);
      if (desiredX < 0) { desiredX = screenWidth; }

      this.$.dropdown.horizontalOffset = (desiredX - buttonBounds.right) * -1;
      this.$.callout.arrow = false;

      console.log("HMM?", this.$.callout.arrow);
    },
    /**
     * Checks if the callout can fit when left aligned on the button
     * @param screenWidth
     * @param buttonBounds
     * @returns {boolean}
     * @private
     */
    _canFitLeft: function (screenWidth, buttonBounds) {
      return (screenWidth - buttonBounds.left >= this.calloutWidth);
    },
    /**
     * Checks if the callout can fit when right aligned on the BUTTON
     * @param screenWidth
     * @param buttonBounds
     * @private
     */
    _canFitRight: function (screenWidth, buttonBounds) {
      return (buttonBounds.right >= this.calloutWidth);
    },
    /**
     * Checks if the callout will fit when center aligned on the BUTTON
     * @param screenWidth
     * @param buttonBounds
     * @returns {boolean}
     * @private
     */
    _canFitCenter: function (screenWidth, buttonBounds) {
      var pokingOut = (this.calloutWidth - buttonBounds.width) / 2;

      if (buttonBounds.left >= pokingOut && (screenWidth - buttonBounds.right) >= pokingOut) {
        return true;
      } else {
        return false;
      }
    }
  });
})();