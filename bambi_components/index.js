/* eslint-env jquery */


import SearchSidebar from "./search";
import HomeSidebar from "./home_sidebar";

function bambiComponent() {
    $('#wd-bambi').append(`
  <div>
    ${SearchSidebar()}
  </div>
  <div>
    ${HomeSidebar()}
  </div>
   `);
}
$(bambiComponent);