/* eslint-env jquery */


import SearchSidebar from "./search";

function bambiComponent() {
    $('#wd-bambi').append(`
  <div>
    ${SearchSidebar()}
  </div>
   `);
}
$(bambiComponent);