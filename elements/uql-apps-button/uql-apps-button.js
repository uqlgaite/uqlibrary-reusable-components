
(function () {
  Polymer({
    is: 'uql-apps-button',
    properties: {
      /** Whether to display title of the button */
      showTitle: {
        type: Boolean,
        value: true
      },
      /** Button title text */
      buttonTitle: {
        type: String,
        value: "My Library"
      },
      /** Value of redirect URL */
      redirectUrl: {
        type: String,
        value: "https://www.library.uq.edu.au/mylibrary"
      }
    },

    /** Redirects to the specified URL */
    _myLibraryClicked: function() {
      window.location.href = this.redirectUrl;
    }
  });
})();